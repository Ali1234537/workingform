"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {ArrowLeft} from "lucide-react";


import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  loginSuccess,
  logout,
} from "@/redux/slices/authSlice";

import type { User } from "@/types/auth";

export default function DashboardClient({
  user,
}: {
  user: User;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const User = useAppSelector(
    (state) => state.auth.user
  );

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [message, setMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  async function updateProfile() {
    const response = await fetch(
      "/api/auth/profile",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message);
      return;
    }

    dispatch(loginSuccess(data.user));

    const msg = "Profile Updated successfully!";
    setMessage(msg);
    alert(msg);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    dispatch(logout());

    router.push("/login");
  }

  return (
    <main className="min-h-screen">

      
      <nav className="flex items-center justify-between border-b px-8 py-4">

        <h1 className="text-xl font-bold">
          Dashboard
        </h1>

         
        <div className="relative">

          <button
            onClick={() =>
              setShowMenu(!showMenu)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white cursor-pointer"
          >
            {(User?.name || user.name)
              .charAt(0)
              .toUpperCase()}
          </button>

           
          {showMenu && (
            <div className="absolute right-0 mt-2 w-44 rounded border bg-white shadow-md">

              <button
                onClick={() => {
                  setShowProfile(true);
                  setShowMenu(false);
                }}
                className="block w-full px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
              >
                Update Profile
              </button>

              <button
                onClick={handleLogout}
                className="block w-full px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </nav>

       
      <div className="flex items-center justify-center p-8">

        <div className="w-full max-w-lg rounded border p-8">

          <h2 className="mb-4 text-2xl font-bold">
            Welcome,{" "}
            {User?.name || user.name}!
          </h2>

           
          {showProfile && (
            <div className="space-y-4">

              <h3 className="text-lg font-semibold">
                Update Profile
              </h3>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded border p-2"
                placeholder="Name"
              />

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded border p-2"
                placeholder="Email"
              />

              {message && (
                <p>{message}</p>
              )}

              <button
                onClick={updateProfile}
                className="rounded bg-black px-5 py-2 text-white cursor-pointer"
              >
                Update Profile
              </button>
              

              <button
                onClick={() => setShowProfile(false)}
                className="flex items-center gap-2 rounded border px-4 py-2 cursor-pointer"
                >
               <ArrowLeft className="h-4 w-4" />
                 Back
               </button>
              
            
            </div>
          )}

        </div>

      </div>

    </main>
  );
}