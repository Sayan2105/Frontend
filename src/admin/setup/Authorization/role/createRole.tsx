import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ROLE } from "./role"


interface CreateRoleProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void,
    isPending: boolean,
    defaultVals: ROLE
}


export const roleFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'Role name is required' }).toLowerCase()
})


const CreateRole = ({defaultVals, isPending, Submit, ...props }: CreateRoleProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof roleFormSchema>>({
        resolver: zodResolver(roleFormSchema),
        defaultValues: defaultVals
    })


    return (
        <Dialog pageTitle="Add Role" className="sm:w-[400px] mx-auto" {...props}>
            <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>
                <div className="space-y-2">
                    <Label>Role</Label>
                    <Input type="text" {...register('name')} placeholder="Enter name" />
                    {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
                </div>

                <div className="text-end">
                    <Button>{defaultVals ? 'Update' : "Save"} {isPending && <Loader className="animate-spin" />}</Button>
                </div>

            </form>
        </Dialog>
    )
}


export default CreateRole