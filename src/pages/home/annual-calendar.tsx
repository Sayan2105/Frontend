import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Separator } from "@/components/ui/separator"
import pulicApi from "@/services/public-apis"
import { AnnualCalendarType } from "@/types/setupTypes/homepage"
import { Drum, TicketsPlane, Volleyball } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const AnnualCalendar = () => {

    const [calendars, setCalendars] = useState<AnnualCalendarType[]>([])
    const getAllCalendars = async () => {
        try {
            const data = await pulicApi.getAnualCalendars()
            setCalendars(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    useEffect(() => {
        getAllCalendars()
    }, [])


    return (
        <div>
            <MaxWidthWrapper className="flex flex-col gap-2 pt-10 pb-20">
                <h1 className='text-xl font-semibold tracking-tight'>Annual Calendar</h1>
                <Separator />

                {/* holiday */}
                <div className="flex flex-col mt-5 border border-border/50 rounded-xl gap-y-0 bg-white dark:bg-gray-900/80 shadow-xl dark:shadow-2xl dark:shadow-gray-950/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                    {/* Header */}
                    <div className="rounded-t-xl flex flex-col">
                        <div className="flex items-center p-5 gap-3 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 dark:from-pink-500 dark:via-purple-500 dark:to-indigo-500 relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

                            <div className="relative p-3 bg-white/20 dark:bg-white/15 backdrop-blur-sm rounded-xl shadow-lg">
                                <Volleyball className="text-white w-6 h-6" />
                            </div>
                            <div className="relative">
                                <h1 className="text-white text-xl font-bold tracking-tight drop-shadow-sm">
                                    Holiday Calendar
                                </h1>
                                <p className="text-white/80 text-sm font-medium">
                                    Upcoming celebrations
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-2 divide-y divide-border/30">
                        {calendars.filter(c => c.type === 'Holiday').map((item, index) => (
                            <div
                                key={item.id}
                                className="flex gap-x-4 py-4 items-center group hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-purple-50/50 dark:hover:from-pink-950/20 dark:hover:to-purple-950/20 rounded-lg px-2 -mx-2 transition-all duration-300 cursor-pointer"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Date */}
                                <div className="flex flex-col items-center justify-center min-w-[70px] p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200/50 dark:border-gray-600/50 group-hover:shadow-md transition-all duration-300">
                                    <time className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        {new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(new Date(item.date))}
                                    </time>
                                    <time className="text-lg font-bold text-gray-800 dark:text-white">
                                        {new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(new Date(item.date))}
                                    </time>
                                </div>

                                {/* Animated line */}
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                                    <div className="w-0 h-0.5 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full group-hover:w-8 transition-all duration-300"></div>
                                </div>

                                {/* Description */}
                                <div className="flex-1">
                                    <span className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                                        {item.description}
                                    </span>
                                    <div className="w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full group-hover:w-full transition-all duration-500 delay-100 mt-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity */}
                <div className="flex flex-col mt-5 border border-border/50 rounded-xl gap-y-0 bg-white dark:bg-gray-900/80 shadow-xl dark:shadow-2xl dark:shadow-gray-950/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                    {/* Header */}
                    <div className="rounded-t-xl flex flex-col">
                        <div className="flex items-center p-5 gap-3 bg-gradient-to-br from-green-400 via-yellow-400 to-rose-400 dark:from-green-500 dark:via-yellow-500 dark:to-rose-500 relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

                            <div className="relative p-3 bg-white/20 dark:bg-white/15 backdrop-blur-sm rounded-xl shadow-lg">
                                <Drum className="text-white w-6 h-6" />
                            </div>
                            <div className="relative">
                                <h1 className="text-white text-xl font-bold tracking-tight drop-shadow-sm">
                                    Activity
                                </h1>
                                <p className="text-white/80 text-sm font-medium">
                                    Upcoming activities
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-2 divide-y divide-border/30">
                        {calendars.filter(c => c.type === 'Activity').map((item, index) => (
                            <div
                                key={item.id}
                                className="flex gap-x-4 py-4 items-center group hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-purple-50/50 dark:hover:from-pink-950/20 dark:hover:to-purple-950/20 rounded-lg px-2 -mx-2 transition-all duration-300 cursor-pointer"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Date */}
                                <div className="flex flex-col items-center justify-center min-w-[70px] p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200/50 dark:border-gray-600/50 group-hover:shadow-md transition-all duration-300">
                                    <time className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        {new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(new Date(item.date))}
                                    </time>
                                    <time className="text-lg font-bold text-gray-800 dark:text-white">
                                        {new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(new Date(item.date))}
                                    </time>
                                </div>

                                {/* Animated line */}
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                                    <div className="w-0 h-0.5 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full group-hover:w-8 transition-all duration-300"></div>
                                </div>

                                {/* Description */}
                                <div className="flex-1">
                                    <span className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                                        {item.description}
                                    </span>
                                    <div className="w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full group-hover:w-full transition-all duration-500 delay-100 mt-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Vacation */}
                <div className="flex flex-col mt-5 border border-border/50 rounded-xl gap-y-0 bg-white dark:bg-gray-900/80 shadow-xl dark:shadow-2xl dark:shadow-gray-950/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                    {/* Header */}
                    <div className="rounded-t-xl flex flex-col">
                        <div className="flex items-center p-5 gap-3 bg-gradient-to-br from-orange-400 via-rose-400 to-purple-400 dark:from-orange-500 dark:via-rose-500 dark:to-purple-500 relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

                            <div className="relative p-3 bg-white/20 dark:bg-white/15 backdrop-blur-sm rounded-xl shadow-lg">
                                <TicketsPlane className="text-white w-6 h-6" />
                            </div>
                            <div className="relative">
                                <h1 className="text-white text-xl font-bold tracking-tight drop-shadow-sm">
                                    Vaction
                                </h1>
                                <p className="text-white/80 text-sm font-medium">
                                    Upcoming vactions
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-2 divide-y divide-border/30">
                        {calendars.filter(c => c.type === 'Vacation').map((item, index) => (
                            <div
                                key={item.id}
                                className="flex gap-x-4 py-4 items-center group hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-purple-50/50 dark:hover:from-pink-950/20 dark:hover:to-purple-950/20 rounded-lg px-2 -mx-2 transition-all duration-300 cursor-pointer"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Date */}
                                <div className="flex flex-col sm:flex-row gap-1 items-center">
                                    <div className="flex flex-col items-center justify-center min-w-[70px] p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200/50 dark:border-gray-600/50 group-hover:shadow-md transition-all duration-300">
                                        <time className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            {new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(new Date(item.date))}
                                        </time>
                                        <time className="text-lg font-bold text-gray-800 dark:text-white">
                                            {new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(new Date(item.date))}
                                        </time>
                                    </div>
                                    -
                                    <div className="flex flex-col items-center justify-center min-w-[70px] p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200/50 dark:border-gray-600/50 group-hover:shadow-md transition-all duration-300">
                                        <time className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            {new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(new Date(item.to!))}
                                        </time>
                                        <time className="text-lg font-bold text-gray-800 dark:text-white">
                                            {new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(new Date(item.to!))}
                                        </time>
                                    </div>
                                </div>

                                {/* Animated line */}
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                                    <div className="w-0 h-0.5 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full group-hover:w-8 transition-all duration-300"></div>
                                </div>

                                {/* Description */}
                                <div className="flex-1">
                                    <span className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                                        {item.description}
                                    </span>
                                    <div className="w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full group-hover:w-full transition-all duration-500 delay-100 mt-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </MaxWidthWrapper>
        </div>
    )
}

export default AnnualCalendar