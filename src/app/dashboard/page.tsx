import { Suspense } from "react";
import CalenderView from "~/components/Calender";
import { auth } from "~/server/auth";

export default async function DashBoard() {
    const session = await auth();
    return (
        <main>
            {session?.user.accessToken && 
                <Suspense fallback={<p>Loading...</p>}>
                    <CalenderView access_token={session.user.accessToken}/>
                </Suspense>
            }
        </main>
    )
}