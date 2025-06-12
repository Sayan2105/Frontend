import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


interface DoseDurationFormProps extends HTMLAttributes<HTMLDivElement> {
  Submit: (formData: any) => void,
  isPending: boolean,
}


export const DoseDurationFormSchema = z.object({
  duration: z.string()
    .min(1, "Duration is required")
})

const DoseDurationForm = ({ Submit, isPending, ...props }: DoseDurationFormProps) => {

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof DoseDurationFormSchema>>({
    resolver: zodResolver(DoseDurationFormSchema),
  })

  return (
    <Dialog pageTitle="Dose Duration" className="sm:w-[400px] mx-auto" {...props}>
      <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>
        <div className="space-y-2">
          <Label>Duration</Label>
          <Input type="text" {...register('duration')} placeholder="Enter duration" />
          {errors?.duration && <p className='text-sm text-red-500'>{errors?.duration.message}</p>}
        </div>

        <div className="text-end">
          <Button>{false ? 'Update' : "Save Duration"} {isPending && <Loader className="animate-spin" />}</Button>
        </div>

      </form>
    </Dialog>
  )
}


export default DoseDurationForm