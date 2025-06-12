import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


interface DoseIntervalFormProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void,
    isPending: boolean,
}


export const DoseIntervalFormSchema = z.object({
    interval: z.string()
        .min(1, "Interval is required")
})

const DoseIntervalForm = ({ Submit, isPending, ...props }: DoseIntervalFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof DoseIntervalFormSchema>>({
        resolver: zodResolver(DoseIntervalFormSchema),
    })

    return (
        <Dialog pageTitle="Dose Interval" className="sm:w-[400px] mx-auto" {...props}>
            <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>
                <div className="space-y-2">
                    <Label>Interval</Label>
                    <Input type="text" {...register('interval')} placeholder="Enter interval" />
                    {errors?.interval && <p className='text-sm text-red-500'>{errors?.interval.message}</p>}
                </div>

                <div className="text-end">
                    <Button>{false ? 'Update' : "Save Interval"} {isPending && <Loader className="animate-spin" />}</Button>
                </div>

            </form>
        </Dialog>
    )
}




export default DoseIntervalForm