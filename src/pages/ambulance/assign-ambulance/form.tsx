import { Charge_Type_Interface } from '@/admin/setup/hospital-charges/chargeType/chargeTypes'
import { categoryType } from '@/admin/setup/hospital-charges/chargesCategory/categoryList'
import hospitalChargeApi from '@/admin/setup/services/charge'
import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { assignAmbulanceSchema } from '@/formSchemas/ambulance'
import { calculateAmount } from '@/helpers/calculateAmount'
import { currencySymbol } from '@/helpers/currencySymbol'
import { PaymentOptions } from '@/helpers/formSelectOptions'
import usePatient from '@/patient/profile/handlers'
import RegisterPatient from '@/patient/register/patient-signup'
import { OtherApi } from '@/services/other-api'
import { AssignedAmbulanceInfo } from '@/types/ambulance/ambulance'
import { chargeNamesType } from '@/types/setupTypes/chargeName'
import { Patients } from '@/types/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader, UserRound } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import useAmbulances from '../ambulances/handlers'



interface AssignAmbulanceProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean
    editDetails: AssignedAmbulanceInfo
}


function AssignAmbulanceForm({ Submit, isPending, editDetails, ...props }: AssignAmbulanceProps) {
    const queryClient = useQueryClient()
    const [charge_types, setChargeTypes] = useState<Charge_Type_Interface[]>([])
    const [charge_categories, setChargeCategories] = useState<categoryType[]>([])
    const [charge_names, setChargeNames] = useState<chargeNamesType['data']>([])
    const { ambulances, getAmbulances } = useAmbulances({})

    const { control, register, reset, setValue, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof assignAmbulanceSchema>>({
        resolver: zodResolver(assignAmbulanceSchema),
        defaultValues: editDetails
    })

    const { form, setForm, handlePatient, isPending: PatientPending } = usePatient()


    const { data: patients } = useQuery<Patients[]>({
        queryKey: ['patients'],
        queryFn: () => OtherApi.getPatients(''),
    })


    const fetchChargeTypes = async () => {
        try {
            const data = await hospitalChargeApi.getChargeTypes('ambulance')
            setChargeTypes(data)
        } catch ({ message }: any) { toast.error(message) }
    }

    const handleChargeTypeChange = async (id: number) => {
        try {
            const data = await hospitalChargeApi.getChargeCategories(id)
            setChargeCategories(data)
        } catch ({ message }: any) { toast.error(message) }
    }

    const handleChargeCategoryChange = async (id: number) => {
        try {
            const data = await hospitalChargeApi.getChargeNames({ search: String(id) })
            setChargeNames(data.data)
        } catch ({ message }: any) { toast.error(message) }
    }

    const handleChargeNameChange = async (id: number) => {
        try {
            const data = await hospitalChargeApi.getChargeNameDetails(id)
            setValue('standard_charge', data.standard_charge)
            setValue('tax', data.tax_percentage)
        } catch ({ message }: any) { toast.error(message) }
    }


    useEffect(() => {
        fetchChargeTypes()
        getAmbulances()

        if (editDetails) {
            handleChargeCategoryChange(editDetails.chargeCategoryId)
            handleChargeTypeChange(editDetails.chargeTypeId)
            handleChargeNameChange(editDetails.chargeNameId)
        }
    }, [])

    // Calculating total
    const total = watch('standard_charge') * watch('kilometers')

    useEffect(() => {
        const amount = calculateAmount(total, Number(watch('tax')), Number(watch('discount')))
        setValue('total', amount.total)
        setValue('net_amount', amount.net_amount)
        setValue('tax_amount', amount.taxAmount)
        setValue('discount_amount', amount.dicountAmount)
    }, [total, watch('discount')])


    return (
        <>
            <Dialog pageTitle='Assign Ambulance' {...props}>
                <form onSubmit={handleSubmit(Submit)}>
                    <>
                        {/* Patient Section */}
                        <div className='flex gap-2 px-2.5'>
                            <div>
                                <Controller control={control} name='patientId' render={({ field }) => (
                                    <Combobox
                                        width='w-[200px] lg:w-[300px]'
                                        onValueChange={(value) => { field.onChange(value) }}
                                        placeholder='Search patient'
                                        options={patients?.map((p) => ({ label: p.name, value: String(p.id) })) || []}
                                        defaultValue={field.value ? String(field.value) : undefined}
                                    />
                                )} />
                                {errors.patientId && <p className='text-sm text-red-500'>{errors.patientId.message}</p>}
                            </div>
                            <div>
                                <Button type='button' size='sm' onClick={() => setForm(true)}>New Patient <UserRound /></Button>
                            </div>
                        </div>
                        <Separator className='my-3' />
                    </>


                    {/* grid for fields */}


                    <ScrollArea className='h-[50vh] sm:h-[55vh]'>

                        <div className="grid md:grid-cols-3 gap-5 px-2.5">


                            {/* Ambulance */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='ambulanceId' render={({ field }) => {
                                    return <>
                                        <Label>Ambulance</Label>
                                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {ambulances?.data?.map((amb) => {
                                                    return <SelectItem key={amb.id} value={String(amb.id)}>
                                                        {amb.vehicleNumber} <span className='text-sm text-gray-600'>{`(${amb.model})`}</span>
                                                    </SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.ambulanceId && <p className='text-sm text-red-500'>{errors.ambulanceId.message}</p>}
                            </div>


                            {/* date */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Date</Label>
                                <Input type='date' {...register('date')} />
                                {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                            </div>


                            {/* Charge Type */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='chargeTypeId' render={({ field }) => {
                                    return <>
                                        <Label>Charge Type</Label>
                                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { handleChargeTypeChange(Number(value)), field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {charge_types.map((type) => (
                                                    <SelectItem key={type.id} value={String(type.id)}>{type.charge_type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.chargeTypeId && <p className='text-sm text-red-500'>{errors.chargeTypeId.message}</p>}
                            </div>


                            {/* Charge Category */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='chargeCategoryId' render={({ field }) => {
                                    return <>
                                        <Label>Charge Category</Label>
                                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { handleChargeCategoryChange(Number(value)), field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {charge_categories.map((category) => (
                                                    <SelectItem key={category.id} value={String(category.id)}>{category.category}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.chargeCategoryId && <p className='text-sm text-red-500'>{errors.chargeCategoryId.message}</p>}
                            </div>


                            {/* charge names */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='chargeNameId' render={({ field }) => {
                                    return <>
                                        <Label>Charge Name</Label>
                                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { handleChargeNameChange(Number(value)), field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {charge_names.map((name) => (
                                                    <SelectItem key={name.id} value={String(name.id)}>{name.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.chargeCategoryId && <p className='text-sm text-red-500'>{errors.chargeCategoryId.message}</p>}
                            </div>

                            {/* Standard Charge */}
                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Standard Charge/PKM</Label>
                                <Input type='text' {...register('standard_charge')} disabled />
                                {errors.standard_charge && <p className='text-sm text-red-500'>{errors.standard_charge.message}</p>}
                            </div>

                            {/* Kilometers */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Kilometers</Label>
                                <Input type='number' {...register('kilometers')} />
                                {errors.kilometers && <p className='text-sm text-red-500'>{errors.kilometers.message}</p>}
                            </div>

                            {/* Total */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Total</Label>
                                <Input type='number' {...register('total')} disabled />
                                {errors.total && <p className='text-sm text-red-500'>{errors.total.message}</p>}
                            </div>

                            {/* Tax% */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Tax%</Label>
                                <Input type='number' {...register('tax')} disabled />
                                {errors.tax && <p className='text-sm text-red-500'>{errors.tax.message}</p>}
                            </div>

                            {/* Discount% */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Discount%</Label>
                                <Input type='number' {...register('discount')} defaultValue={0} />
                                {errors.discount && <p className='text-sm text-red-500'>{errors.discount.message}</p>}
                            </div>


                            {/* Payment mode */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='payment_mode' render={({ field }) => {
                                    return <>
                                        <Label>Payment mode</Label>
                                        <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {PaymentOptions.map((payment, i) => {
                                                    return <SelectItem key={i} value={payment.value}>{payment.label}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.payment_mode && <p className='text-sm text-red-500'>{errors.payment_mode.message}</p>}
                            </div >

                            {/* Payment Info */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Payment Info</Label>
                                <Input type='text' {...register('payment_info')} placeholder='example@upi' />
                                {errors.payment_info && <p className='text-sm text-red-500'>{errors.payment_info.message}</p>}
                            </div>


                            {/* Note */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Note</Label>
                                <Input type='text' placeholder='write your messsage here' {...register('note')} />
                                {errors.note && <p className='text-sm text-red-500'>{errors.note.message}</p>}
                            </div>

                            {/* net amount */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Net Amount {currencySymbol()}</Label>
                                <Input type='number' {...register('net_amount')} defaultValue={0} disabled />
                                {errors.net_amount && <p className='text-sm text-red-500'>{errors.net_amount.message}</p>}
                            </div>

                        </div>
                    </ScrollArea>

                    <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end px-2.5">
                        <Button type='button' variant={'ghost'} onClick={() => reset()} >Reset</Button>
                        <Button type='submit' className='flex-1 sm:flex-none' disabled={isPending}>
                            {editDetails ? 'Update' : 'Assign Ambulance'} {isPending && <Loader className='animate-spin' />}
                        </Button>
                    </div>

                </form>
            </Dialog >

            {form && <RegisterPatient
                Submit={(v) => { handlePatient(v, () => { queryClient.invalidateQueries({ queryKey: ['patients'] }) }) }}
                isPending={PatientPending}
                onClick={() => setForm(false)}
            />}
        </>
    )
}




export default AssignAmbulanceForm