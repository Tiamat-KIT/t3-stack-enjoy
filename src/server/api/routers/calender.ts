import { calendar_v3, google } from "googleapis"
import {z} from "zod"
import { google_oauth } from "~/client/google"

import {
    createTRPCRouter,
    protectedProcedure,
    // publicProcedure
} from "~/server/api/trpc"

export const calenderRouter = createTRPCRouter({
    get_day: protectedProcedure
        .input(z.object({
            year: z.number({required_error: "Require Year"}).min(0).max(10000),
            month: z.number({required_error: "Required Month"}).min(1).max(12),
            day: z.number({required_error: "Required Day"}).min(1).max(31)
        }))
        .query(async ({input,ctx}) => {
            const myCalenders = await getMyCalender(ctx.session.user.accessToken)
            const today = new Date(input.year,input.month,input.day)
            const todayEventList = myCalenders.calender.events.list({
                calendarId: myCalenders.myCalender.id!,
                timeMin: today.setDate(today.getDate() - 1000 * 60 * 60 * 24).toString(),
                timeZone: "Asia/Tokyo"
            })
            const todayEvents = (await todayEventList).data.items
            if(!todayEvents) {
                return null
            }
            return todayEvents
        })
})

async function getMyCalender(access_token: string): Promise<{
    calender: calendar_v3.Calendar,
    myCalender: calendar_v3.Schema$CalendarListEntry
}> {
    google_oauth.setCredentials({
        access_token
    })
    const calender = google.calendar({
        version: "v3",
        auth: google_oauth
    })
    const myCalenders = (await calender.calendarList.list()).data.items
    if(!myCalenders) {
        throw new Error("Calender Undefined")
    }else if(!myCalenders[0]) {
        throw new Error("Calender Undefined")
    }
    return {
        calender,
        myCalender: myCalenders[0]
    }
}