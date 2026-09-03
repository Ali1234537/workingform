import { notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

import DashboardClient from "./DashboardClient";



export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  return <DashboardClient user={user} />;
}