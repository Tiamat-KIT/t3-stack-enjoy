import { calendar_v3 } from "googleapis"
import Link from "next/link"

export default async function EventsView({
    calender,
    calendarId
}:{
    calender: calendar_v3.Calendar
    calendarId: string
}) {
    const timeMin = new Date(2024,12,25).toISOString()
    console.log(timeMin)
    const events = await calender.events.list({
        calendarId,
        timeMin,
        timeZone: "Asia/Tokyo"
    })

    return (
        <section className="grid grid-cols-7 gap-2 border rounded-lg p-2">
            {/*events.data.items?.map((item) => {
                return (<article key={item.id}>
                    <h3 className="rounded-xl border border-black p-2">{item.summary}</h3>
                </article>)
            })*/}
            {Array(30).fill(0).map((_,idx) => {
                return <div className="text-center rounded-lg border border-black p-2 hover:bg-slate-200 hover:cursor-pointer">
                    <Link href={`/dashboard/${idx + 1}`}>
                        {idx + 1}
                    </Link>
                </div>
            })}
        </section>
    )
}