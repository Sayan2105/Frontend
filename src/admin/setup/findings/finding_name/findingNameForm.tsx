import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { findingCategory, findingName } from "@/types/setupTypes/finding"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import findingApi from "../../services/finding"



interface FindingNameFormProps extends HTMLAttributes<HTMLDivElement> {
  Submit: (formData: any) => void,
  isPending: boolean,
  nameDetails: findingName
}

export const FindingNameFormSchema = z.object({
  categoryId: z.string()
    .min(1, { message: "Category is required" })
    .default(''),

  name: z.string()
    .min(1, "Name is required"),

  description: z.string()
    .min(1, "Description is required")
})


const FindingNameForm = ({ nameDetails, Submit, isPending, ...props }: FindingNameFormProps) => {

  // API State
  const [findingCategories, setFindingCategories] = useState<findingCategory[]>([])

  const { control, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof FindingNameFormSchema>>({
    resolver: zodResolver(FindingNameFormSchema),
    defaultValues: {
      categoryId: String(nameDetails?.categoryId),
      name: nameDetails?.name,
      description: nameDetails?.description
    }
  })


  const fetchFindingCategories = async () => {
    try {
      const data = await findingApi.getCategories()
      setFindingCategories(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchFindingCategories()
  }, [])

  return (
    <Dialog pageTitle="Category" className="sm:w-[400px] mx-auto" {...props}>
      <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>

        {/* Tax Category */}

        <div className="space-y-2 p-2">
          <Label>Tax Category</Label>
          <Controller control={control} name='categoryId' render={({ field }) => {

            return <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className='z-[200]'>
                {findingCategories.map((category) => {
                  return <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                })}
              </SelectContent>
            </Select>
          }} />
          {errors?.categoryId && <p className='text-sm text-red-500'>{errors?.categoryId.message}</p>}
        </div>

        {/* Finding name */}

        <div className="space-y-2">
          <Label>Finding Name</Label>
          <Input type="text" {...register('name')} placeholder="Enter Name" />
          {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
        </div>

        {/* Description */}

        <div className="space-y-2">
          <Label>Description</Label>
          <Input type="text" {...register('description')} placeholder="Enter Category" />
          {errors?.description && <p className='text-sm text-red-500'>{errors?.description.message}</p>}
        </div>

        <div className="text-end">
          <Button>{nameDetails ? 'Update' : "Save Category"} {isPending && <Loader className="animate-spin" />}</Button>
        </div>

      </form>
    </Dialog>
  )
}

export default FindingNameForm