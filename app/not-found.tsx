import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-red-700">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mt-2 text-white">
          You are not allowed to access this page without Login.
        </p>
       
        <p className="mt-2 text-white">
          LOGIN ?  
        </p> 
        <Link
          href="/login"
          className="mt-5 inline-block rounded bg-white px-5 py-2 text-black border-2 border-black"
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}