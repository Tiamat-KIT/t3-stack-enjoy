export default async function DayView({params}:{params: Promise<{day: string}>}) {
    const day = (await params).day
    return <div>{day}</div>    
}