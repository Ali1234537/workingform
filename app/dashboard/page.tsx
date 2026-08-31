"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  function handleLogout() {
    dispatch(logout());
    router.push("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="border rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Hello! Lets Learn react!</h1>

        {user && (
          <div>
            <h2 className="font-bold text-xl">Welcome, {user.name}!</h2>
           {/* <p>Email: {user.email}</p> */}
           <br/>
           <hr/>
           <br/>
            <p>
              Redux is the way of keeping shared data in one central store so that 
              instead of passing props again and again we can just simply use reducers 
              and selectors. It makes code easier to manage and to also helps us to be 
              confused with the messy or extra-large code lines.
              <strong> Basically, <a className="cursor-pointer text-blue-600" href="https://redux.js.org/" target="_blank"><u> Redux </u> </a>
               keeps the application state organized 
              </strong>.
            </p> 
            <button
              onClick={handleLogout}
              className="bg-black text-white px-5 py-2 rounded mt-4 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}

        {!user && <p>No user is logged in.</p>}
      </div>
    </main>
  );
}