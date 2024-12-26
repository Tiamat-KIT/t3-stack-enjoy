"use client"

import IconArrowLeft from "~/icones/arraw_left"
import IconArrowRight from "~/icones/arraw_right"
import { DateState, path } from "~/state/date"
import {usePageState} from "nrstate-client"

export default function DateSelector() {
    const [pageState,setPageState] = usePageState<DateState>()
    const {date} = pageState
    return (
        <div className="flex flex-row items-center">
            <button 
                className="border-t border-l rounded-xl shadow-2xl p-2"
                onClick={() => setPageState({...pageState,date: date - 1000 * 60 * 60 * 24 * 30},path)} 
            >
                <IconArrowLeft />
            </button>
            <div className="border-t border-l rounded-lg shadow-2xl p-2">
                {`${new Date(date).getFullYear()}/${new Date(date).getMonth() + 1}`}
            </div>
            <button
                className="border-t border-l rounded-xl shadow-2xl p-2"
                onClick={() => setPageState({...pageState,date: date - 1000 * 60 * 60 * 24 * 30},path)}
            >
                <IconArrowRight />
            </button>
        </div>
    )
}