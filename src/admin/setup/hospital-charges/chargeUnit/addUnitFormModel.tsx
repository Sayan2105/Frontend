import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { unitType } from "./chargeUnitList"


interface AddUnitFormProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: z.infer<typeof unitFormSchema>) => void,
    isPending: boolean,
    unitDetails: unitType
}


export const unitFormSchema = z.object({
    unit_type: z.string()
        .min(1, { message: 'Unit type is required' })
})


const AddUnitFormModel = ({ unitDetails, isPending, Submit, ...props }: AddUnitFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof unitFormSchema>>({
        resolver: zodResolver(unitFormSchema),
        defaultValues: unitDetails
    })


    return (
        <Dialog pageTitle="Add Unit" className="sm:w-[400px] mx-auto" {...props}>
            <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>
                <div className="space-y-2">
                    <Label>Unit Type</Label>
                    <Input type="text" {...register('unit_type')} placeholder="Enter unit" />
                    {errors?.unit_type && <p className='text-sm text-red-500'>{errors?.unit_type.message}</p>}
                </div>

                <div className="text-end">
                    <Button>{unitDetails ? 'Update' : "Save Unit"} {isPending && <Loader className="animate-spin" />}</Button>
                </div>

            </form>
        </Dialog>
    )
}

export default AddUnitFormModel