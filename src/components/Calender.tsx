import { google } from "googleapis"
import { google_oauth } from "~/client/google"
import EventsView from "./EventsView"
import { Suspense } from "react"

export default async function CalenderView({access_token}:{access_token: string}) {
    google_oauth.setCredentials({
        access_token
    })
    const calender = google.calendar({
        version: "v3",
        auth: google_oauth
    })
    const list = await calender.calendarList.list()
    
    return (
        <div className="flex justify-between">
            <div className="flex flex-col">
                {list.data.items?.map((item) => {
                    return (
                        <h3 style={{
                            color: `${item.foregroundColor}`,
                            backgroundColor: `${item.backgroundColor}`
                        }} className="p-2 rounded-xl m-2" key={item.id}>
                            {item.summary}
                        </h3>
                    )
                })}
            </div>
            <div>
                {list.data.items?.map((item) => {
                    const id = item.id
                    if(!id) {
                        return <p>This Calender Not Found</p>
                    }
                    return (
                        <Suspense key={item.id} fallback={<p>Loading...</p>}>
                            <EventsView calender={calender} calendarId={id} />
                        </Suspense>
                    )
                })}
                
            </div>
        </div>
    )
}