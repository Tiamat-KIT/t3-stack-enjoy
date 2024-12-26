import { getPageState } from "nrstate"
import { DateState, initialDate, path } from "~/state/date"
import { api } from "~/trpc/server"
export default async function EventView() {
    const pageState = getPageState<DateState>(initialDate,path)
    const {date} = pageState
    const CastDate = new Date(date)
    const events = await api.calender.get_day({
        year: CastDate.getFullYear(),
        month: CastDate.getMonth(),
        day: CastDate.getDay()
    })
    return (
        <article>
            {events && events.map((item) => 
                <div key={item.id}>
                    <h3>{item.summary}</h3>
                </div>
            )}
        </article>
    )
    
}