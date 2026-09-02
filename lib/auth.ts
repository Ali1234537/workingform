import crypto from "crypto";
import { cookies } from "next/headers";

import { connectDB } from "./mongodb";
import User from "@/models/User";
import Session from "@/models/Session";

export async function createSession(
  userId: string
) {
  await connectDB();

  const sessionId = crypto.randomUUID();

  const expiresAt = new Date();

  expiresAt.setDate(
    expiresAt.getDate() + 7
  );

  await Session.create({
    sessionId,
    userId,
    expiresAt,
  });

  const cookieStore = await cookies();

  cookieStore.set("sessionId", sessionId, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getCurrentUser() {
  await connectDB();

  const cookieStore = await cookies();

  const sessionId =
    cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return null;
  }

  const session = await Session.findOne({
    sessionId,
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    return null;
  }

  const user = await User.findById(
    session.userId
  );

  if (!user) {
    return null;
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
  };
}

export async function logoutUser() {
  await connectDB();

  const cookieStore = await cookies();

  const sessionId =
    cookieStore.get("sessionId")?.value;

  if (sessionId) {
    await Session.deleteOne({
      sessionId,
    });
  }

  cookieStore.delete("sessionId");
}