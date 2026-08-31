"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {KeyRound} from 'lucide-react';

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  loginFailed,
  loginStart,
  loginSuccess,
} from "@/redux/slices/authSlice";

import type { StoredUser } from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(
    (state) => state.auth.loading
  );

  const error = useAppSelector(
    (state) => state.auth.error
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    dispatch(loginStart());

    const savedUsers = localStorage.getItem("users");

    const users: StoredUser[] = savedUsers
      ? JSON.parse(savedUsers)
      : [];

    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!user) {
      dispatch(
        loginFailed("Invalid email or password.")
      );
      return;
    }

    dispatch(loginSuccess(user));

    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6">
        <h1 className="mb-6 text-2xl font-bold">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white cursor-pointer transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 sm:py-3 sm:text-[15px]"
          >
            <KeyRound  size = {18}/>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account? 
          <Link
            href="/register"
            className="underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}