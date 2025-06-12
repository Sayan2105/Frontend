import Dialog from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { timelineFormSchema } from "@/formSchemas/timelineFormSchema";
import { timeline } from "@/types/opd_section/timeline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


interface TimelineFormModelProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (FormData: any) => void
    isPending: boolean
    timelineDetails: timeline
}


const TimelineFormModel = ({ Submit, timelineDetails, isPending, ...props }: TimelineFormModelProps) => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm<z.infer<typeof timelineFormSchema>>({
        resolver: zodResolver(timelineFormSchema),
        defaultValues: timelineDetails
    })


    return (
        <Dialog pageTitle="Timeline" className="sm:w-[400px] mx-auto" {...props}>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className='h-[40vh]'>
                    <div className="grid gap-5 mt-2 px-3 pb-5">

                        {/* Title */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Title</Label>
                            <Input type='text' {...register('title')} />
                            {errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
                        </div>


                        {/* Date */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Date</Label>
                            <Input type='datetime-local' {...register('date')} />
                            {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                        </div>


                        {/* Description */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Description</Label>
                            <Textarea  {...register('description')} />
                            {errors.description && <p className='text-sm text-red-500'>{errors.description.message}</p>}
                        </div>

                    </div>

                </ScrollArea>

                <div className="flex mt-5 mb-2 p-3 gap-x-2 sm:justify-end">
                    <Button variant='outline' onClick={() => reset()}>Reset</Button>
                    <Button type='submit' className='flex-1'>{timelineDetails ? 'Update' : 'Save'} {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog>
    )
}

export default TimelineFormModel