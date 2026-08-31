"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAppDispatch } from "@/redux/hooks";
import { registerSuccess } from "@/redux/slices/authSlice";
import {MailBadge} from 'lucide-react';

import type { StoredUser } from "@/types/auth";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const savedUsers = localStorage.getItem("users");

    const users: StoredUser[] = savedUsers
      ? JSON.parse(savedUsers)
      : [];

    const userAlreadyExists = users.some(
      (user) => user.email === email
    );

    if (userAlreadyExists) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };

    localStorage.setItem(
      "users",
      JSON.stringify([...users, newUser])
    );

    dispatch(registerSuccess(newUser));

    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6">
        <h1 className="mb-6 text-2xl font-bold">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              className="w-full rounded border p-2"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white cursor-pointer transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 sm:py-3 sm:text-[15px]"
          >
            <MailBadge size={18} />
            Register
          </button>

          <p className="mt-4 text-sm">
          Already have an  account? 
          <Link
            href="/login"
            className="underline cursor-pointer"
          >
            Login
          </Link>
        </p>
        </form>
      </div>
    </main>
  );
}