import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { chargeNameFormSchema } from '@/formSchemas/setupSectionSchemas/ChargeNameFormSchema'
import { currencySymbol } from '@/helpers/currencySymbol'
import { chargeNameDetailsType } from '@/types/setupTypes/chargeName'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import hospitalChargeApi from '../../services/charge'
import { categoryType } from '../chargesCategory/categoryList'
import { Charge_Type_Interface } from '../chargeType/chargeTypes'
import { unitType } from '../chargeUnit/chargeUnitList'
import { TaxType } from '../taxes/taxList'



interface AddChargesFormModelProps extends HTMLAttributes<HTMLDivElement> {
  Submit: (formData: z.infer<typeof chargeNameFormSchema>) => void
  isPending: boolean,
  chargeNameDetails: chargeNameDetailsType
}


const AddChargesFormModel = ({ chargeNameDetails, Submit, isPending, ...props }: AddChargesFormModelProps) => {

  const [chargeTypes, setChargeTypes] = useState<Charge_Type_Interface[]>([])
  const [categories, setCategories] = useState<categoryType[]>([])
  const [units, setUnit] = useState<unitType[]>([])
  const [taxes, setTaxes] = useState<TaxType[]>([])


  const { register, setValue, reset, control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof chargeNameFormSchema>>({
    resolver: zodResolver(chargeNameFormSchema),
    defaultValues: { ...chargeNameDetails, chargeTypeId: chargeNameDetails?.chargeCategory.chargeType.id }
  })



  const fetchChargeCategories = async (chargeTypeId?: number) => {
    try {
      const data = await hospitalChargeApi.getChargeCategories(chargeTypeId)
      console.log(data);
      setCategories(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }

  const fetchChargeTypes = async () => {
    try {
      const data = await hospitalChargeApi.getChargeTypes()
      setChargeTypes(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }

  const fetchChargeUnits = async () => {
    try {
      const data = await hospitalChargeApi.getUnitList()
      setUnit(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const fetchTaxesList = async () => {
    try {
      const data = await hospitalChargeApi.getTaxesList()
      setTaxes(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const fetchTaxDetails = async (taxId: number) => {
    try {
      const data = await hospitalChargeApi.getTaxDetails(taxId)
      setValue('tax_percentage', data.percentage)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    fetchChargeTypes()
    if (chargeNameDetails) fetchChargeCategories(chargeNameDetails.chargeCategory.chargeType.id)  // onChange ogf type will not call this function on editmode but i will have value
    fetchChargeUnits()
    fetchTaxesList()
  }, [])


  return (
    <Dialog pageTitle='Add Charge' {...props}>
      <form onSubmit={handleSubmit(Submit)}>
        <ScrollArea className='h-[70vh] sm:h-[55vh]'>
          <div className="grid sm:grid-cols-3">

            {/* Type */}
            <div className="space-y-2 p-2">
              <Label>Charge Type</Label>
              <Controller control={control} name='chargeTypeId' render={({ field }) => {
                return <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { fetchChargeCategories(Number(value)); field.onChange(value) }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className='z-[200]'>
                    {chargeTypes.map((type) => {
                      return <SelectItem key={type.id} value={String(type.id)}>{type.charge_type}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
              }} />
              {errors?.chargeTypeId && <p className='text-sm text-red-500'>{errors?.chargeTypeId.message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-2 p-2">
              <Label>Charge Category</Label>
              <Controller control={control} name='categoryId' render={({ field }) => {

                return <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className='z-[200]'>
                    {categories.map((category) => {
                      return <SelectItem key={category.id} value={String(category.id)}>{category.category}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
              }} />
              {errors?.categoryId && <p className='text-sm text-red-500'>{errors?.categoryId.message}</p>}
            </div>

            {/* Charge Units */}

            <div className="space-y-2 p-2">
              <Label>Charge Unit</Label>
              <Controller control={control} name='unitId' render={({ field }) => {

                return <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className='z-[200]'>
                    {units.map((unit) => {
                      return <SelectItem key={unit.id} value={String(unit.id)}>{unit.unit_type}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
              }} />
              {errors?.unitId && <p className='text-sm text-red-500'>{errors?.unitId.message}</p>}
            </div>

            {/* Charge Name */}

            <div className="space-y-2 p-2">
              <Label>Charge Name</Label>
              <Input type="text" {...register('name')} />
              {errors?.name && <p className='text-sm text-red-500'>{errors?.name.message}</p>}
            </div>


            {/* Tax Category */}

            <div className="space-y-2 p-2">
              <Label>Tax Category</Label>
              <Controller control={control} name='taxId' render={({ field }) => {

                return <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { fetchTaxDetails(Number(value)); field.onChange(value) }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className='z-[200]'>
                    {taxes.map((tax) => {
                      return <SelectItem key={tax.id} value={String(tax.id)}>{tax.name}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
              }} />
              {errors?.taxId && <p className='text-sm text-red-500'>{errors?.taxId.message}</p>}
            </div>


            {/* Percentage */}

            <div className="space-y-2 p-2">
              <Label>Percentage</Label>
              <Input type="number" {...register('tax_percentage', { valueAsNumber: true })} defaultValue={0} disabled />
              {errors?.tax_percentage && <p className='text-sm text-red-500'>{errors?.tax_percentage.message}</p>}
            </div>

            {/* Standard Charge */}

            <div className="space-y-2 p-2">
              <Label>Standard Charge {currencySymbol()}</Label>
              <Input type="number" {...register('standard_charge', { valueAsNumber: true })} defaultValue={0} />
              {errors?.standard_charge && <p className='text-sm text-red-500'>{errors?.standard_charge.message}</p>}
            </div>

            {/* TPA Charge */}

            <div className="space-y-2 p-2">
              <Label>TPA Charge {currencySymbol()}</Label>
              <Input type="number" {...register('tpa', { valueAsNumber: true })} defaultValue={0} />
              {errors?.tpa && <p className='text-sm text-red-500'>{errors?.tpa.message}</p>}
            </div>


          </div>
        </ScrollArea>
        <div className="flex p-2 gap-x-2 sm:justify-end">
          <Button type='button' variant='ghost' onClick={() => reset()}>Reset</Button>
          <Button type='submit' className='flex-1 sm:flex-none'>{chargeNameDetails ? 'Update' : 'Save Charge'} {isPending && <Loader className='animate-spin' />}</Button>
        </div>
      </form>
    </Dialog >
  )
}

export default AddChargesFormModel