import Link from "next/link";
import {KeyRound , MailBadge} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-6 text-3xl font-bold">
          Access to Dashboard?
        </h1>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
         <Link href="/login"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] sm:w-auto"
          >
          <KeyRound size={20} className="shrink-0" />
          Login
          </Link>

          <Link href="/register"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-50 hover:border-zinc-300 active:scale-[0.98] sm:w-auto"
          >
         <MailBadge size={20} className="shrink-0" />
          Register
         </Link>
       </div>
      </div>
    </main>
  );
}