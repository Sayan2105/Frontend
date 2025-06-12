import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { RadiologyUnitType } from "../units/units"
import { RadioParametersType } from "@/types/setupTypes/radiology"
import { getRadiologytUnits } from "../service"


interface Props extends HTMLAttributes<HTMLDivElement> {
  Submit: (formData: any) => void,
  isPending: boolean,
  editDetails: RadioParametersType
}


export const CreatRadioParameterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  from: z.string().nonempty("From is required"),
  to: z.string().nonempty("To is required"),
  unitId: z.number().min(1, "Unit is required"),
  note: z.string().optional()
})



const CreateRadioParameter = ({ editDetails, Submit, isPending, ...props }: Props) => {

  const { register, control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof CreatRadioParameterSchema>>({
    resolver: zodResolver(CreatRadioParameterSchema),
    defaultValues: editDetails
  })


  const [units, setUnits] = useState<RadiologyUnitType[]>([])

  const fetchUnits = async () => {
    try {
      const data = await getRadiologytUnits()
      setUnits(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchUnits()
  }, [])



  return (
    <Dialog pageTitle="Add Radiology Parameter" className="sm:w-[500px] mx-auto" {...props}>
      <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>

        {/* Parameter Name */}
        <div className="space-y-2">
          <Label>Parameter Name</Label>
          <Input type="text" {...register('name')} placeholder="Enter parameter name" />
          {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
        </div>

        {/* From */}
        <div className="grid grid-cols-2 gap-x-1">
          <div className="space-y-2">
            <Label>From</Label>
            <Input type="text" {...register('from')} placeholder="From" />
            {errors?.from && <p className='text-sm text-red-500'>{errors?.from.message}</p>}
          </div>

          {/* to */}
          <div className="space-y-2">
            <Label>To</Label>
            <Input type="text" {...register('to')} placeholder="To" />
            {errors?.to && <p className='text-sm text-red-500'>{errors?.to.message}</p>}
          </div>
        </div>

        {/* unit */}
        <div className="space-y-2">
          <Label>Unit</Label>
          <Controller control={control} name='unitId' render={({ field }) => (
            <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => field.onChange(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="z-[200]">
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={String(unit.id)}>{unit.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )} />

          {errors?.unitId && <p className='text-sm text-red-500'>{errors?.unitId.message}</p>}
        </div>

        {/* note */}

        <div className="space-y-2">
          <Label>Note</Label>
          <Input type="text" {...register('note')} placeholder="Enter note" />
          {errors?.note && <p className='text-sm text-red-500'>{errors?.note.message}</p>}
        </div>

        <div className="text-end">
          <Button>{editDetails ? 'Update' : "Save Parameter"} {isPending && <Loader className="animate-spin" />}</Button>
        </div>

      </form>
    </Dialog>
  )
}



export default CreateRadioParameter