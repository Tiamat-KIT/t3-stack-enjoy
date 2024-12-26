import { Session } from "next-auth";
import Link from "next/link";
import { auth } from "~/server/auth";

export default async function AuthButton({session}:{session: Session | null}) {
    return (
        <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="flex justify-center items-center w-32 rounded-full bg-white/10 px-5 py-3 bg-slate-100 hover:bg-cyan-200"
        >
            {session ? "Sign out" : "Sign in"}
      </Link>
    )
}