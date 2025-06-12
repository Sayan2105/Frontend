import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


interface ChargeTypeformModelProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: z.infer<typeof ChargeTypeformModelSchema>) => void,
    isPending: boolean,
    // chargeTypeDetails: boolean
}


export const ChargeTypeformModelSchema = z.object({
    charge_type: z.string()
        .min(1, { message: 'Type name is required' })
})





const AddChargeTypeformModel = ({ Submit, isPending, ...props }: ChargeTypeformModelProps) => {



    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof ChargeTypeformModelSchema>>({
        resolver: zodResolver(ChargeTypeformModelSchema),
        defaultValues: {}
    })


    return (
        <Dialog pageTitle="Add Type" className="sm:w-[400px] mx-auto" {...props}>
            <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>
                <div className="space-y-2">
                    <Label>Charge Type</Label>
                    <Input type="text" {...register('charge_type')} placeholder="Enter charge type" />
                    {errors?.charge_type && <p className='text-sm text-red-500'>{errors?.charge_type.message}</p>}
                </div>

                <div className="text-end">
                    <Button>{false ? 'Update' : "Save Type"} {isPending && <Loader className="animate-spin" />}</Button>
                </div>
            </form>
        </Dialog>
    )
}


export default AddChargeTypeformModel