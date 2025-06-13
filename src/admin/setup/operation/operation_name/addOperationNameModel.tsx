import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { operationCategoryType, operationNameType } from '@/types/setupTypes/setupOpeartion'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { getOperationCategories } from '../service'

interface OperationNameModelProps extends HTMLAttributes<HTMLDivElement> {
  Submit: (formData: any) => void,
  isPending: boolean,
  operationNameDetails: operationNameType
}

export const AddOperationNameFormSchema = z.object({
  name: z.string()
    .min(1, "Category is required"),

  categoryId: z.string()
    .min(1, "Operation name is required")
    .default('')
})


const AddOperationNameModel = ({ operationNameDetails: name, isPending, Submit, ...props }: OperationNameModelProps) => {


  // API state
  const [categories, setCategories] = useState<operationCategoryType[]>([])

  const { control, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof AddOperationNameFormSchema>>({
    resolver: zodResolver(AddOperationNameFormSchema),
    defaultValues: {
      name: name?.name,
      categoryId: String(name?.categoryId),
    }
  })


  const fetchOperationCategories = async () => {
    try {
      const data = await getOperationCategories()
      setCategories(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }

  useEffect(() => {
    fetchOperationCategories()
  }, [])


  return (
    <Dialog pageTitle="Add Operation" className="sm:w-[400px] mx-auto" {...props}>
      <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>

        {/* Operation Category */}

        <div className="space-y-2 p-2">
          <Label>Tax Category</Label>
          <Controller control={control} name='categoryId' render={({ field }) => {

            return <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className='z-[200]'>
                {categories.map((category) => {
                  return <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                })}
              </SelectContent>
            </Select>
          }} />
          {errors?.categoryId && <p className='text-sm text-red-500'>{errors?.categoryId.message}</p>}
        </div>

        {/* Operation Name */}

        <div className="space-y-2">
          <Label>Operation Name</Label>
          <Input type="text" {...register('name')} placeholder="Enter Category" />
          {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
        </div>


        <div className="text-end">
          <Button>{name ? 'Update' : "Save"} {isPending && <Loader className="animate-spin" />}</Button>
        </div>

      </form>
    </Dialog>
  )
}

export default AddOperationNameModel