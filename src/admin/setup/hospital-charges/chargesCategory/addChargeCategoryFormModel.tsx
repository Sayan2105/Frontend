import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import hospitalChargeApi from "../../services/charge"
import { Charge_Type_Interface } from "../chargeType/chargeTypes"
import { categoryType } from "./categoryList"


interface ChargeCategoryFormModelProps extends HTMLAttributes<HTMLDivElement> {
  Submit: (formData: z.infer<typeof ChargeCategoryFormSchema>) => void,
  isPending: boolean,
  categoryDetails: categoryType
}


export const ChargeCategoryFormSchema = z.object({

  chargeTypeId: z.string()
    .min(1, { message: 'Charge type is required' })
    .default(''),

  category: z.string()
    .min(1, { message: 'Category name is required' }),

  description: z.string()
    .optional()
})



const AddChargeCategoryFormModel = ({ Submit, categoryDetails, isPending, ...props }: ChargeCategoryFormModelProps) => {

  const [chargeTypes, setChargeTypes] = useState<Charge_Type_Interface[]>([])

  const { register, control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof ChargeCategoryFormSchema>>({
    resolver: zodResolver(ChargeCategoryFormSchema),
    defaultValues: {
      category: categoryDetails?.category,
      chargeTypeId: String(categoryDetails?.chargeTypeId),
      description: categoryDetails?.description
    }
  })


  const fetchChargeTypes = async () => {
    try {
      const data = await hospitalChargeApi.getChargeTypes()
      setChargeTypes(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchChargeTypes()
  }, [categoryDetails])


  return (

    <Dialog pageTitle="Add Category" className="sm:w-[400px] mx-auto" {...props}>
      <form className="flex flex-col p-2.5 gap-4" onSubmit={handleSubmit(Submit)}>

        {/* Charge Type */}
        <div className="space-y-2">
          <Controller control={control} name="chargeTypeId" render={({ field }) => {
            return <>
              <Label>Charge Type</Label>
              <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                <SelectTrigger >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className='z-[200]'>
                  {chargeTypes.map((type) => {
                    return <SelectItem key={type.id} value={String(type.id)}>{type.charge_type}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </>
          }} />
          {errors?.chargeTypeId && <p className='text-sm text-red-500'>{errors?.chargeTypeId.message}</p>}
        </div>


        {/* Charge Category */}
        <div className="space-y-2">
          <Label>Charge Category</Label>
          <Input type="text" {...register('category')} placeholder="Enter Category name" />
          {errors?.category && <p className='text-sm text-red-500'>{errors?.category.message}</p>}
        </div>


        {/* Charge Category */}
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea {...register('description')} placeholder="Enter description" />
          {errors?.description && <p className='text-sm text-red-500'>{errors?.description.message}</p>}
        </div>


        <div className="text-end">
          <Button>{categoryDetails ? 'Update' : "Save Type"} {isPending && <Loader className="animate-spin" />}</Button>
        </div>

      </form>
    </Dialog>
  )
}

export default AddChargeCategoryFormModel