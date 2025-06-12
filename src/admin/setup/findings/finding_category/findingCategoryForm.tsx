import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { findingCategory } from "@/types/setupTypes/finding"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface FindingCategoryFormProps extends HTMLAttributes<HTMLDivElement> {
  Submit: (formData: any) => void,
  isPending: boolean,
  categoryDetails: findingCategory
}

export const FindingCategoryFormSchema = z.object({
  name: z.string()
    .min(1, "Category name is required")
})


const FindingCategoryForm = ({ categoryDetails: finding, Submit, isPending, ...props }: FindingCategoryFormProps) => {

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof FindingCategoryFormSchema>>({
    resolver: zodResolver(FindingCategoryFormSchema),
    defaultValues: finding
  })


  return (
    <Dialog pageTitle="Category" className="sm:w-[400px] mx-auto" {...props}>
      <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>
        <div className="space-y-2">
          <Label>Category Name</Label>
          <Input type="text" {...register('name')} placeholder="Enter Category" />
          {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
        </div>

        <div className="text-end">
          <Button>{finding ? 'Update' : "Save Category"} {isPending && <Loader className="animate-spin" />}</Button>
        </div>

      </form>
    </Dialog>
  )
}

export default FindingCategoryForm