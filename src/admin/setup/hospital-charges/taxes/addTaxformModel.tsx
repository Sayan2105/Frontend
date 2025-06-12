import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { TaxType } from './taxList'


interface AddTaxformModelProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: z.infer<typeof taxFormSchema>) => void,
    isPending: boolean
    taxDetails: TaxType
}

export const taxFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'Name is required' }),
    percentage: z.number()
        .min(1, { message: 'Percentage is required' })
})


const AddTaxformModel = ({ taxDetails, Submit, isPending, ...props }: AddTaxformModelProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof taxFormSchema>>({
        resolver: zodResolver(taxFormSchema),
        defaultValues: taxDetails
    })


    return (
        <Dialog pageTitle="Add Tax" className="sm:w-[400px] mx-auto" {...props}>
            <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>

                <div className="space-y-2">
                    <Label>Name</Label>
                    <Input type="text" {...register('name')} placeholder="Enter name" />
                    {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Percentage %</Label>
                    <Input type="number" {...register('percentage', { valueAsNumber: true })} defaultValue={0} placeholder="Enter percentage" />
                    {errors?.percentage && <p className='text-sm text-red-500'>{errors?.percentage.message}</p>}
                </div>

                <div className="text-end">
                    <Button>{taxDetails ? 'Update' : "Save Tax"} {isPending && <Loader className="animate-spin" />}</Button>
                </div>

            </form>
        </Dialog>
    )
}

export default AddTaxformModel