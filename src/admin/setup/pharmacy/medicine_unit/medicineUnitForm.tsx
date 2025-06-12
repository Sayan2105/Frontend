import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


interface MedicineUnitFormProps extends HTMLAttributes<HTMLDivElement> {
  Submit: (formData: any) => void,
  isPending: boolean,
}


export const MedicineUnitFormSchema = z.object({
  name: z.string()
    .min(1, "Unit name is required")
})

const MedicineUnitForm = ({ Submit, isPending, ...props }: MedicineUnitFormProps) => {

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof MedicineUnitFormSchema>>({
    resolver: zodResolver(MedicineUnitFormSchema),
    // defaultValues: categoryDetails
  })

  return (
    <Dialog pageTitle="Medicine Unit" className="sm:w-[400px] mx-auto" {...props}>
      <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>
        <div className="space-y-2">
          <Label>Medicine Unit</Label>
          <Input type="text" {...register('name')} placeholder="Enter unit name" />
          {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
        </div>

        <div className="text-end">
          <Button>{false ? 'Update' : "Save Unit"} {isPending && <Loader className="animate-spin" />}</Button>
        </div>

      </form>
    </Dialog>
  )
}


export default MedicineUnitForm