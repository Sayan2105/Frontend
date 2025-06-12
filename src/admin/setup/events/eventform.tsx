import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"




interface AddUnitFormProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: z.infer<typeof EventFormSchema>) => void,
    isPending: boolean,
}


export const EventFormSchema = z.object({
    title: z.string()
        .min(1, { message: 'Title is required' })
})


const EventForm = ({ isPending, Submit, ...props }: AddUnitFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof EventFormSchema>>({
        resolver: zodResolver(EventFormSchema),
    })


    return (
        <Dialog pageTitle="Add Event" className="sm:w-[400px] mx-auto" {...props}>
            <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input type="text" {...register('title')} placeholder="Enter unit" />
                    {errors?.title && <p className='text-sm text-red-500'>{errors?.title.message}</p>}
                </div>

                <div className="text-end">
                    <Button> Add Event {isPending && <Loader className="animate-spin" />}</Button>
                </div>

            </form>
        </Dialog>
    )
}



export default EventForm