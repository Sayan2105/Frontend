import AlertModel from "@/components/alertModel"
import CustomTooltip from "@/components/customTooltip"
import EmptyList from "@/components/emptyList"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import useTimelineHandlers from "@/pages/OPD/details/timeline/timeline-handlers"
import { Calendar, Clock, Pencil, Plus, Trash } from "lucide-react"
import { useEffect } from "react"
import TimelineFormModel from "../../../../components/form-modals/timeline-form-modal"





const IpdTimelines = () => {

    const { timelines, getTimelines, current, setCurrent, isPending, form, setForm, handleSubmit, onDelete, confirmationProps } = useTimelineHandlers()



    useEffect(() => {
        getTimelines()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-14">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">Timeline</h1>
                <PermissionProtectedAction action='create' module='Timeline'>
                    <Button size='sm' onClick={() => {
                        setForm(true)
                    }}>
                        <Plus /> Add Timeline
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            {timelines.length > 0 ? (<ul className="relative before:absolute space-y-5 before:w-1 w-64 sm:w-[400px] lg:w-[550px] mx-auto gap-3 before:h-full before:bg-yellow-700 before:top-0 before:block">


                {timelines.map((timeline, i) => {
                    return <li className="space-y-4" key={i}>

                        {/* Time section */}
                        <span className="relative  text-sm my-2 -top-1 bg-yellow-500 -left-[10%] sm:-left-[8%] text-yellow-900 py-1 px-3 rounded-md">{timeline.date}</span>

                        <div className="relative flex items-center space-x-3 -ml-3 z-10">

                            {/* Calendor section */}
                            <div className="p-1.5 bg-yellow-500 rounded-full ">
                                <span ><Calendar className="w-4 h-4 text-yellow-900" /></span>
                            </div>

                            <div className="space-y-2 flex-1 border-2 border-dashed border-yellow-500 dark:border-yellow-700 p-2 rounded-lg">

                                {/* Title section */}
                                <div className=" flex justify-between items-center cursor-pointer group transition-all">
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{timeline.title}</p>
                                    <div className="flex gap-x-2 opacity-0 group-hover:opacity-100">

                                        <PermissionProtectedAction action='update' module='Timeline'>
                                            <CustomTooltip message="Edit">
                                                <Pencil className="w-4 h-4 text-gray-500 dark:text-gray-400 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => { setCurrent(timeline); setForm(true) }} />
                                            </CustomTooltip>
                                        </PermissionProtectedAction>

                                        <PermissionProtectedAction action='delete' module='Timeline'>
                                            <CustomTooltip message="Delete">
                                                <Trash className="w-4 h-4 text-gray-500 dark:text-gray-400 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => onDelete(timeline.id)} />
                                            </CustomTooltip>
                                        </PermissionProtectedAction>
                                    </div>
                                </div>

                                <Separator className="bg-yellow-500/50 dark:bg-yellow-500/20" />

                                {/* Description */}
                                <p className="text-sm text-gray-700 dark:text-gray-400">{timeline.description}</p>

                            </div>
                        </div>
                    </li>

                })}


                {/* Static Secttion */}

                <li className="relative flex items-center space-x-2 -ml-3 z-10">
                    <div className="p-1.5 bg-yellow-500 rounded-full">
                        <Clock className="w-4 h-4 text-yellow-900" />
                    </div>
                </li>
            </ul>
            )
                :
                <EmptyList length={timelines.length} message="No timelines found" />
            }



            {/* Models */}

            {/* Form model */}

            {form && <TimelineFormModel
                Submit={handleSubmit}
                timelineDetails={current!}
                isPending={isPending}
                onClick={() => { setForm(false); setCurrent(null) }}
            />}


            {/* Alert Model */}

            {confirmationProps.isOpen && <AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => confirmationProps.onConfirm()}
            />}

        </section>
    )
}




export default IpdTimelines