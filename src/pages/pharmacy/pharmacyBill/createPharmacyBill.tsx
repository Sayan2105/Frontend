import { getMedicineCategories } from "@/admin/setup/pharmacy/service"
import CustomTooltip from "@/components/customTooltip"
import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { createPharmacyBillSchema, valuesASdefault } from "@/formSchemas/createPharmBillSchema"
import { calculateAmount } from "@/helpers/calculateAmount"
import { currencySymbol } from "@/helpers/currencySymbol"
import usePatient from "@/patient/profile/handlers"
import RegisterPatient from "@/patient/register/patient-signup"
import { OtherApi } from "@/services/other-api"
import PharmacyApi from "@/services/pharmacy-api"
import StaffApi from "@/services/staff-api"
import { medicineBatch, medicinesBYcategory } from "@/types/pharmacy/pharmacy"
import { medicineCategory } from "@/types/setupTypes/pharmacy"
import { staffs } from "@/types/staff/staff"
import { Patients } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Plus, UserRound, X } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
import toast from "react-hot-toast"
import { useDebouncedCallback } from "use-debounce"
import { z } from "zod"



interface CreatePharmacyBillProps extends HTMLAttributes<HTMLDivElement> {
  Submit: (formData: any) => void
  isPending: boolean
}

const CreatePharmacyBill = ({ Submit, isPending, ...props }: CreatePharmacyBillProps) => {

  const { handlePatient, isPending: isPatientPending, form, setForm } = usePatient()

  // form hook
  const { control, register, reset, setValue, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof createPharmacyBillSchema>>({
    resolver: zodResolver(createPharmacyBillSchema),
    defaultValues: valuesASdefault
  })

  const { fields: medicineField, append: addMedicine, remove: removeMedicine } = useFieldArray({
    name: 'items',
    control
  })

  //will watch all fields
  const items = useWatch({ name: 'items', control })


  // API states
  const [patients, setPatients] = useState<Patients[]>([])
  const [doctors, setDoctors] = useState<staffs['data']>([])
  const [medCategories, setMedCategories] = useState<medicineCategory[]>([])
  const [medNames, setMedNames] = useState<{ [key: number]: medicinesBYcategory[] }>([])
  const [batches, setBatches] = useState<{ [key: number]: medicineBatch[] }>([])
  const [medStocks, setMedStocks] = useState<{ [key: number]: number }>()



  const onPatientSearch = useDebouncedCallback(async (value: string) => {
    try {
      const data = await OtherApi.getPatients(value)
      setPatients(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }, 400)



  const fetchMedicineCAtegories = async () => {
    try {
      const data = await getMedicineCategories()
      setMedCategories(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // fetching and binding medicines
  const handleCategoryChange = async (i: number, categoryId: number) => {
    try {
      const data = await PharmacyApi.getMedicinesBYcategory(categoryId)
      setMedNames(prev => ({ ...prev, [i]: data }))
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  //fetching and binding batches
  const handleMedicineChange = async (i: number, medicineId: number) => {
    try {
      const data = await PharmacyApi.getMedicinesBatches(medicineId)
      setBatches(prev => ({ ...prev, [i]: data }))
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const handleBatchChange = async (i: number, batchId: number) => {
    try {
      const data = await PharmacyApi.getMedicinesBatchDetails(batchId)
      setValue(`items.${i}.salePrice`, Number(data.purchaseMedicine.sale_price))
      setValue(`items.${i}.tax`, Number(data.purchaseMedicine.tax))
      setMedStocks(prev => ({ ...prev, [i]: data.quantity }))
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // for calculating amount
  const onQuantityChange = (i: number, qty: number) => {

    const Total = (qty * watch(`items.${i}.salePrice`))

    const Tax = watch(`items.${i}.tax`)

    //for specific fields
    const amount = calculateAmount(Total, Tax, 0).net_amount
    setValue(`items.${i}.amount`, amount)

  }


  // fetching doctors

  const getDoctors = async () => {
    try {
      const data = await StaffApi.getStaffs({ search: 'doctor' })
      setDoctors(data.data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  // Appends fields
  const appendMedicine = () => {
    addMedicine(valuesASdefault.items)
  }


  // calculating price from all fields
  useEffect(() => {
    const discount = watch('discount')
    const comulativeTotal = items?.reduce((sum, item) => (sum + item?.amount), 0)
    const net_amount = calculateAmount(comulativeTotal, 0, discount).net_amount // tax is zero here coz we have already calculated tax
    setValue(`net_amount`, net_amount)
  }, [items, watch('discount')])


  useEffect(() => {
    fetchMedicineCAtegories()
    getDoctors()
  }, [])



  return (
    <>
      <Dialog pageTitle='Pharmacy Bill' {...props}>
        <form onSubmit={handleSubmit(Submit)}>
          <div className='flex items-center gap-2 px-2.5'>
            {/* Patient Section */}
            <div>
              <Controller name='patientId' control={control} render={({ field }) => {
                return <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(Number(value)) }}>
                  <SelectTrigger className='sm:w-[300px] w-40'>
                    <SelectValue placeholder="Search" />
                  </SelectTrigger>

                  <SelectContent className='z-[200]'>
                    <Input type='search' className='w-full' placeholder='search patient' onChange={(e) => { onPatientSearch(e.target.value) }} />
                    {patients.map((patient, i) => {
                      return <SelectItem key={i} value={String(patient.id)}>{`${patient.name} (${patient.id})`}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
              }} />
              {errors.patientId && <p className='text-sm text-red-500'>{errors.patientId.message}</p>}
            </div>
            <div>
              <Button type='button' size={'sm'} onClick={() => setForm(true)}>New Patient <UserRound /></Button>
            </div>
          </div>

          <Separator className="my-2" />

          {/* grid for fields */}


          <ScrollArea className='h-[50vh] sm:h-[55vh]'>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 mb-8 px-2.5">

              {/* Medicines field array */}

              {medicineField.map((medicine, index) => {

                return <section key={medicine.id} className="sm:col-span-full mt-2 p-2 rounded-md grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 border-2 border-dashed border-gray-200 dark:border-border">

                  {/* Medicine Category */}

                  <div className="w-full flex flex-col gap-y-2">
                    <Controller control={control} name={`items.${index}.categoryId`} render={({ field }) => {
                      return <>
                        <Label>Medicine Category</Label>
                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { handleCategoryChange(index, Number(value)); field.onChange(Number(value)) }}>
                          <SelectTrigger >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>

                          <SelectContent className='z-[200]'>
                            {medCategories.map((category) => {
                              return <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                            })}
                          </SelectContent>
                        </Select>
                      </>
                    }} />
                    {errors.items?.[index]?.categoryId && <p className='text-sm text-red-500'>{errors.items?.[index].categoryId?.message}</p>}
                  </div>



                  {/* Medicine Names */}

                  <div className="w-full flex flex-col gap-y-2">
                    <Controller control={control} name={`items.${index}.medicineId`} render={({ field }) => {
                      const medicines = medNames?.[index] || []; // Get categories specific to the current field index getting from the object key
                      return <>
                        <Label>Medicine Name</Label>
                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { handleMedicineChange(index, Number(value)); field.onChange(Number(value)) }}>
                          <SelectTrigger >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>

                          <SelectContent className='z-[200]'>
                            {medicines.map((medicine) => {
                              return <SelectItem key={medicine.id} value={String(medicine.id)}>{medicine.name}</SelectItem>
                            })}
                          </SelectContent>
                        </Select>
                      </>
                    }} />
                    {errors.items?.[index]?.medicineId && <p className='text-sm text-red-500'>{errors.items?.[index].medicineId?.message}</p>}
                  </div>


                  {/* Batches */}

                  <div className="w-full flex flex-col space-y-2">
                    <Controller control={control} name={`items.${index}.batchId`} render={({ field }) => {
                      const medBatches = batches?.[index] || []
                      return <>
                        <Label>Batch</Label>
                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { handleBatchChange(index, Number(value)); field.onChange(Number(value)) }}>
                          <SelectTrigger >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>

                          <SelectContent className='z-[200]'>
                            {medBatches.map((batch) => {
                              return <SelectItem key={batch.id} value={String(batch.id)}>{batch.purchaseMedicine.batch_no}</SelectItem>
                            })}
                          </SelectContent>
                        </Select>
                      </>
                    }} />
                    {errors.items?.[index]?.batchId && <p className='text-sm text-red-500'>{errors.items?.[index]?.batchId?.message}</p>}
                  </div>


                  {/* Quantity */}

                  <div className="w-full flex flex-col space-y-2">
                    <Label>Quantity</Label>
                    <Input type='number' {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                      // max={medStocks?.[index]}
                      defaultValue={0}
                      onChange={(e) => { onQuantityChange(index, Number(e.target.value)) }}
                    />
                    {medStocks?.[index]! && <p className="text-sm text-gray-500 italic">Available qty : {medStocks[index]}</p>}
                    {errors?.items?.[index]?.quantity && <p className='text-sm text-red-500'>{errors?.items?.[index]?.quantity?.message}</p>}
                  </div>


                  {/* Sale Price */}

                  <div className="w-full flex flex-col gap-y-2">
                    <Label>Sale Price {currencySymbol()}</Label>
                    <Input type='number' {...register(`items.${index}.salePrice`, { valueAsNumber: true })} defaultValue={0} disabled />
                    {errors?.items?.[index]?.salePrice && <p className='text-sm text-red-500'>{errors?.items?.[index]?.salePrice.message}</p>}
                  </div>


                  {/* Tax */}

                  <div className="w-full flex flex-col gap-y-2">
                    <Label>Tax %</Label>
                    <Input type='number' {...register(`items.${index}.tax`, { valueAsNumber: true })} defaultValue={0} disabled />
                    {errors?.items?.[index]?.tax && <p className='text-sm text-red-500'>{errors?.items?.[index]?.tax.message}</p>}
                  </div>


                  {/* Amount */}

                  <div className="w-full flex flex-col gap-y-2">
                    <Label>Amount {currencySymbol()}</Label>
                    <Input type="number" {...register(`items.${index}.amount`, { valueAsNumber: true })} defaultValue={0} disabled />
                    {errors?.items?.[index]?.amount && <p className='text-sm text-red-500'>{errors?.items?.[index]?.amount.message}</p>}
                  </div>



                  {/* Button to remove fields */}

                  {medicineField.length !== 1 &&
                    <div className="h-full flex items-center gap-x-2 justify-center mt-3 sm:mt-1">
                      <CustomTooltip message="Remove">
                        <div className="p-1 bg-red-500 rounded-full text-white mt-2 sm:mt-4">
                          <X className="w-4 h-4 cursor-pointer" onClick={() => { removeMedicine(index) }} />
                        </div>
                      </CustomTooltip>
                    </div>
                  }

                </section>

              })}


              {/* Button for Addding fields */}

              {!false && <div className="col-span-full flex justify-end mr-2">
                <CustomTooltip message="Add more fields">
                  <div className="p-1 bg-slate-500 rounded-full text-white">
                    <Plus className="w-4 h-4 cursor-pointer" onClick={appendMedicine} />
                  </div>
                </CustomTooltip>
              </div>}



              {/* Date */}

              <div className="w-full flex flex-col gap-y-2">
                <Label>Billing Date</Label>
                <Input type="date" {...register('date')} />
                {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
              </div>


              {/* hospital doctor */}

              <div className="w-full flex flex-col gap-y-2">
                <Label>Hospital Doctor</Label>
                <Select onValueChange={(value) => { setValue(`doctor`, value) }}>
                  <SelectTrigger >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>

                  <SelectContent className='z-[200]'>
                    {doctors?.map((doctor) => {
                      return <SelectItem key={doctor.id} value={doctor.name}> {doctor.name} </SelectItem>
                    })}
                  </SelectContent>
                </Select>
              </div>


              {/* Doctor */}

              <div className="w-full flex flex-col gap-y-2">
                <Label>Doctor</Label>
                <Input type='text' {...register('doctor')} />
                {errors.doctor && <p className='text-sm text-red-500'>{errors.doctor.message}</p>}
              </div>


              {/* opdId */}

              <div className="w-full flex flex-col gap-y-2">
                <Label>OPD ID</Label>
                <Input type='text' {...register('opdId')} />
                {errors.opdId && <p className='text-sm text-red-500'>{errors.opdId.message}</p>}
              </div>

              {/* Discount */}

              <div className="w-full flex flex-col gap-y-2">
                <Label>Discount%</Label>
                <Input type='number' {...register('discount', { valueAsNumber: true })} defaultValue={0} />
                {errors.discount && <p className='text-sm text-red-500'>{errors.discount.message}</p>}
              </div>

              {/* Net Amount */}
              <div className="w-full flex flex-col gap-y-2">
                <Label>Net Amount {currencySymbol()}</Label>
                <Input type='number' {...register('net_amount', { valueAsNumber: true })} defaultValue={0} />
                {errors.net_amount && <p className='text-sm text-red-500'>{errors.net_amount.message}</p>}
              </div>


              {/* Note */}
              <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
                <Label>Note</Label>
                <Textarea placeholder='write your messsage here' {...register('note')} />
              </div>

            </div>
          </ScrollArea>

          <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end px-2.5">
            <Button type='button' variant={'ghost'} onClick={() => { reset(), setMedStocks(undefined) }} >Reset</Button>
            <Button type='submit' className='flex-1 sm:flex-none' >Save Bill {isPending && <Loader className='animate-spin' />}</Button>
          </div>

        </form>
      </Dialog>


      {/* form modal */}

      {form && (
        <RegisterPatient
          isPending={isPatientPending}
          Submit={(v) => { handlePatient(v) }}
          onClick={() => { setForm(false) }}
        />
      )}
    </>
  )
}

export default CreatePharmacyBill