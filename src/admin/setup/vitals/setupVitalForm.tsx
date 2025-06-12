import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SetupVital } from "@/types/setupTypes/vital"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


interface SetupVitalFormProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void,
    isPending: boolean,
    setupVitalDetails: SetupVital
}


export const SetupVitalFormSchema = z.object({
    name: z.string().min(1, "Name is required"), from: z.string().optional(),
    to: z.string().optional(), unit: z.string().optional(),
})


const SetupVitalForm = ({ setupVitalDetails: details, Submit, isPending, ...props }: SetupVitalFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof SetupVitalFormSchema>>({
        resolver: zodResolver(SetupVitalFormSchema),
        defaultValues: details
    })


    return (
        <Dialog pageTitle="Vital" className="sm:w-[500px] mx-auto" {...props}>
            <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>
                <div className="space-y-2">
                    <Label>Vital Name</Label>
                    <Input type="text" {...register('name')} placeholder="Enter vital name" />
                    {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-x-1">
                    <div className="space-y-2">
                        <Label>From</Label>
                        <Input type="text" {...register('from')} placeholder="From" />
                        {errors?.from && <p className='text-sm text-red-500'>{errors?.from.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>To</Label>
                        <Input type="text" {...register('to')} placeholder="To" />
                        {errors?.to && <p className='text-sm text-red-500'>{errors?.to.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Unit</Label>
                    <Input type="text" {...register('unit')} placeholder="Unit" />
                    {errors?.unit && <p className='text-sm text-red-500'>{errors?.unit.message}</p>}
                </div>

                <div className="text-end">
                    <Button>{details ? 'Update' : "Save Vital"} {isPending && <Loader className="animate-spin" />}</Button>
                </div>

            </form>
        </Dialog>
    )
}

export default SetupVitalForm