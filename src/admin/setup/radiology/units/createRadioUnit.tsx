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
    Submit: (formData: any) => void,
    isPending: boolean,
}


export const RadioUnitSchema = z.object({
    name: z.string()
        .min(1, { message: 'Unit name is required' })
})


const CreateRadiologyUnit = ({ isPending, Submit, ...props }: AddUnitFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof RadioUnitSchema>>({
        resolver: zodResolver(RadioUnitSchema),
    })


    return (
        <Dialog pageTitle="Add Unit" className="sm:w-[400px] mx-auto" {...props}>
            <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>
                <div className="space-y-2">
                    <Label>Name</Label>
                    <Input type="text" {...register('name')} placeholder="Enter unit" />
                    {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
                </div>

                <div className="text-end">
                    <Button>{false ? 'Update' : "Save Unit"} {isPending && <Loader className="animate-spin" />}</Button>
                </div>

            </form>
        </Dialog>
    )
}

export default CreateRadiologyUnit