import AuthButton from "~/components/auth/AuthButton";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  /* const hello = await api.post.hello({ text: "from tRPC" });*/
  const session = await auth();

  /*if (session?.user) {
    void api.post.getLatest.prefetch();
  }*/

  return (
    <HydrateClient>
    <h1>Welcome This Service!</h1>
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user?.name}</span>}
      </p>
      <AuthButton session={session} />      
    </div>
    </HydrateClient>
  );
}
