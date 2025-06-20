import Dialog from "@/components/Dialog"
import RequiredLabel from "@/components/required-label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AnnualCalendarType } from "@/types/setupTypes/homepage"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"


interface Props extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void,
    isPending: boolean,
    editDetails: AnnualCalendarType
}


export const AnnualCalendarSchema = z.object({
    description: z.string().min(1, "Description is required").max(175, "Description is too long"),
    date: z.string().nonempty("Date is required"),
    to: z.string().optional(),
    type: z.string().nonempty("Type is required").default(''),
})



const AnnualCalendarForm = ({ editDetails, Submit, isPending, ...props }: Props) => {

    const { register, control, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof AnnualCalendarSchema>>({
        resolver: zodResolver(AnnualCalendarSchema),
        defaultValues: editDetails
    })


    return (
        <Dialog pageTitle={editDetails ? "Update Calendar" : "Add Calendar"} className="sm:w-[500px] mx-auto" {...props}>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className="h-[45vh]">
                    <div className="flex flex-col p-2.5 gap-4 mb-10">
                        {/* Type */}
                        <div className="space-y-2">
                            <RequiredLabel label="Type" />
                            <Controller control={control} name='type' render={({ field }) => (
                                <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => field.onChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="z-[200]">
                                        <SelectItem value='Holiday'>Holiday</SelectItem>
                                        <SelectItem value='Activity'>Activity</SelectItem>
                                        <SelectItem value='Vacation'>Vacation</SelectItem>
                                    </SelectContent>
                                </Select>
                            )} />
                            {errors?.type && <p className='text-sm text-red-500'>{errors?.type.message}</p>}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <RequiredLabel label="Description" />
                            <Textarea  {...register('description')} placeholder="Enter Description" />
                            {errors?.description && <p className='text-sm text-red-500'>{errors?.description.message}</p>}
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <RequiredLabel label="Date" />
                            <Input type="date" {...register('date')} />
                            {errors?.date && <p className='text-sm text-red-500'>{errors?.date.message}</p>}
                        </div>

                        {/* to */}
                        {(watch('type') === 'Vacation') && (
                            <div className="space-y-2">
                                <Label>To</Label>
                                <Input type="date" {...register('to')} />
                                {errors?.to && <p className='text-sm text-red-500'>{errors?.to.message}</p>}
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="text-end p-2.5">
                    <Button>{editDetails ? 'Update' : "Save Calendar"} {isPending && <Loader className="animate-spin" />}</Button>
                </div>

            </form>
        </Dialog >
    )
}




export default AnnualCalendarForm