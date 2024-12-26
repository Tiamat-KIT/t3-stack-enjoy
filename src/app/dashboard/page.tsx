import { Suspense } from "react";
import AuthButton from "~/components/auth/AuthButton";
import DateSelector from "~/components/DateSelector";
import { auth } from "~/server/auth";
import Link from "next/link"
import { getPageState } from "nrstate";
import PageStateProvider from "nrstate-client/PageStateProvider"
import {currentPageState} from "nrstate"
import {DateState,initialDate,path} from "~/state/date"
import EventView from "~/components/server/EventView";

export default async function DashBoard() {
    const session = await auth();
    const pageState = getPageState<DateState>(initialDate,path)
    const {date} = pageState
    const CastDate = new Date(date)
    return (
        <main className="container mx-auto px-8 py-5">
            <PageStateProvider current={currentPageState<DateState>(initialDate,path)}>
                <DateSelector />
                <section className="grid grid-cols-7 gap-2 border rounded-xl p-2 bg-slate-100">
                    {Array(30).fill(0).map((_,idx) => {
                        return <div key={idx} className="bg-white/60 text-center rounded-lg border-t border-l shadow-xl border-slate-100 p-2 hover:bg-slate-200 hover:cursor-pointer">
                            <Link href={`/dashboard/${CastDate.getFullYear()}/${CastDate.getMonth()}/${idx + 1}`}>
                                {idx + 1}
                            </Link>
                        </div>
                    })}
                </section>
                {session?.user.accessToken && 
                    <Suspense fallback={<p>Loading...</p>}>
                        <EventView />
                    </Suspense>
                }
            </PageStateProvider>
            <AuthButton session={session} />
        </main>
    )
}