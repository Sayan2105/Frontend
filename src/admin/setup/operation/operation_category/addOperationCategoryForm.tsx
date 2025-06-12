import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { operationCategoryType } from "@/types/setupTypes/setupOpeartion"

interface AddOperationCategoryFormProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void,
    isPending: boolean,
    categoryDetails: operationCategoryType
}

export const AddOperationCategoryFormSchema = z.object({
    name: z.string()
        .min(1, "Category name is required")
})



const AddOperationCategoryForm = ({ categoryDetails, Submit, isPending, ...props }: AddOperationCategoryFormProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof AddOperationCategoryFormSchema>>({
        resolver: zodResolver(AddOperationCategoryFormSchema),
        defaultValues: categoryDetails
    })


    return (
        <Dialog pageTitle="Add Category" className="sm:w-[400px] mx-auto" {...props}>
            <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>
                <div className="space-y-2">
                    <Label>Category Name</Label>
                    <Input type="text" {...register('name')} placeholder="Enter Category" />
                    {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
                </div>

                <div className="text-end">
                    <Button>{categoryDetails ? 'Update' : "Save Category"} {isPending && <Loader className="animate-spin" />}</Button>
                </div>

            </form>
        </Dialog>
    )
}

export default AddOperationCategoryForm