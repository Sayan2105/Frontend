/** @format */

import CustomPagination from "@/components/customPagination";
import EmptyList from "@/components/emptyList";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { page_limit } from "@/globalData";
import pulicApi from "@/services/public-apis";
import { HomeEventType } from "@/types/setupTypes/homepage";
import { Calendar1Icon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



const HomePageEvents = () => {

    const [events, setEvents] = useState<HomeEventType>({ data: [], total_pages: 0 })
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

    const getAllEvents = async () => {
        try {
            const data = await pulicApi.getEvents({ page, limit: page_limit })
            setEvents(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    useEffect(() => {
        getAllEvents()
    }, [page])


    return (
        <div>
            <MaxWidthWrapper className='flex flex-col gap-2 pt-10 pb-20'>
                <h1 className='text-xl font-semibold tracking-tight'>Events</h1>
                <Separator />

                <div className='mt-5 flex flex-col min-h-[70vh] space-y-10'>
                    <div className="flex-1">
                        <div className='dark:bg-gray-900 rounded-xl transition-all duration-300 shadow-xl hover:shadow-xl border dark:border-gray-700'>
                            {/* Headers */}
                            <div className="flex items-center space-x-2  bg-gradient-to-br from-pink-400 to-violet-400 dark:from-pink-500 dark:to-violet-500 p-5 rounded-t-xl">
                                <div className="relative p-3 bg-white/20 dark:bg-white/15 backdrop-blur-sm rounded-xl shadow-lg">
                                    <Calendar1Icon className="text-white" />
                                </div>
                                <p className="text-white text-xl font-bold tracking-tight drop-shadow-sm">Event</p>
                            </div>

                            <div className="divide-y dark:divide-gray-700 ">
                                {/* Content */}
                                {events.data.map((item, index) => (
                                    <div className="space-x-3 p-5 flex px-5 group" key={index}>
                                        <div
                                            className='p-3 min-w-[70px] h-[70px] rounded-md border bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600 flex flex-col justify-center items-center group-hover:shadow-lg transition-all duration-300'>
                                            <time className='text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider'>
                                                {Intl.DateTimeFormat("en-GB", { month: "short" }).format(
                                                    new Date(item.date)
                                                )}
                                            </time>
                                            <time className='text-lg font-bold text-gray-800 dark:text-white'>
                                                {Intl.DateTimeFormat("en-GB", { day: "numeric" }).format(
                                                    new Date(item.date)
                                                )}
                                            </time>
                                        </div>

                                        <Accordion type="single" collapsible className="flex-1">
                                            <AccordionItem value="item-1" className="border-none">
                                                <AccordionTrigger>
                                                    <span className="text-gray-700 dark:text-neutral-300">{item.title}</span>
                                                </AccordionTrigger>
                                                <AccordionContent >
                                                    <span className="text-xs">{item.description}</span>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                ))}

                                <EmptyList length={events.data.length} message="No Events Found" />
                            </div>
                        </div>
                    </div>

                    <CustomPagination
                        currentPage={page}
                        total_pages={events.total_pages}
                        next={setPage}
                        previous={setPage}
                        goTo={setPage}
                    />
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default HomePageEvents;
