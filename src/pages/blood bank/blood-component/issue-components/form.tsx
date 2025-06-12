import { Charge_Type_Interface } from '@/admin/setup/hospital-charges/chargeType/chargeTypes'
import { categoryType } from '@/admin/setup/hospital-charges/chargesCategory/categoryList'
import hospitalChargeApi from '@/admin/setup/services/charge'
import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { issueBloodComponentSchema } from '@/formSchemas/blood-bank'
import { calculateAmount } from '@/helpers/calculateAmount'
import { currencySymbol } from '@/helpers/currencySymbol'
import { bloodGroups, PaymentOptions } from '@/helpers/formSelectOptions'
import usePatient from '@/patient/profile/handlers'
import RegisterPatient from '@/patient/register/patient-signup'
import bloodBankApi from '@/services/blood-bank-api'
import { OtherApi } from '@/services/other-api'
import StaffApi from '@/services/staff-api'
import { BloodComponentBags, IssuedBloodInfo, PaginantedBloodComponents } from '@/types/blood-bank/blood-bank'
import { chargeNamesType } from '@/types/setupTypes/chargeName'
import { staffs } from '@/types/staff/staff'
import { Patients } from '@/types/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, UserRound } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'



interface IssueBloodComponentProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean
    defaultValues?: IssuedBloodInfo
}


function IssueBloodComponent({ Submit, isPending, defaultValues, ...props }: IssueBloodComponentProps) {

    const { handlePatient, isPending: isPatientPending, form, setForm } = usePatient()

    const [patients, setPatients] = useState<Patients[]>([])
    const [charge_types, setChargeTypes] = useState<Charge_Type_Interface[]>([])
    const [charge_categories, setChargeCategories] = useState<categoryType[]>([])
    const [charge_names, setChargeNames] = useState<chargeNamesType['data']>([])
    const [bags, setBegs] = useState<BloodComponentBags>([])
    const [doctors, setDoctors] = useState<staffs['data']>([])
    const [components, setComponents] = useState<PaginantedBloodComponents>({ data: [], total_pages: 0 })


    const { control, register, reset, setValue, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof issueBloodComponentSchema>>({
        resolver: zodResolver(issueBloodComponentSchema),
        defaultValues
    })



    const onSearch = useDebouncedCallback(async (value: string) => {
        try {
            const data = await OtherApi.getPatients(value)
            setPatients(data)
        } catch ({ message }: any) { toast.error(message) }
    }, 400)


    const HandleBloodGroupChange = async (group: string) => {
        try {
            const data = await bloodBankApi.getBloodComponents({ search: group })
            setComponents(data)
        } catch ({ message }: any) { toast.error(message) }
    }

    const HandleBloodComponentChange = async (component: string) => {
        try {
            const data = await bloodBankApi.getBloodComponentBags(component)
            setBegs(data)
        } catch ({ message }: any) { toast.error(message) }
    }

    const fetchChargeTypes = async () => {
        try {
            const data = await hospitalChargeApi.getChargeTypes('blood_bank')
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

    const getDoctors = async () => {
        try {
            const data = await StaffApi.getStaffs({ search: 'doctor' }) // getting only doctors
            setDoctors(data.data)
        } catch ({ message }: any) { toast.error(message) }
    }


    useEffect(() => {
        fetchChargeTypes()
        getDoctors()

        if (defaultValues) {
            handleChargeCategoryChange(defaultValues.chargeCategoryId)
            handleChargeTypeChange(defaultValues.chargeTypeId)
            handleChargeNameChange(defaultValues.chargeNameId)
            onSearch(String(defaultValues.patientId)) // this will update the patient list
        }
    }, [])

    const total = watch('standard_charge')

    useEffect(() => {
        const price = calculateAmount(total, Number(watch('tax')), Number(watch('discount')))
        setValue('net_amount', price.net_amount)
        setValue('taxRate', price.taxAmount)
        setValue('discountRate', price.dicountAmount)
    }, [total, watch('discount')])


    return (
        <>
            <Dialog pageTitle='Issue Component' {...props}>
                <form onSubmit={handleSubmit(Submit)}>
                    <>
                        <div className='flex  gap-2 px-2.5'>
                            {/* Patient Section */}
                            <div>
                                <Controller name='patientId' control={control} render={({ field }) => {
                                    return <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger className='sm:w-[300px] w-40'>
                                            <SelectValue placeholder="Search" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            <Input type='search' className='w-full' placeholder='search patient' onChange={(e) => { onSearch(e.target.value) }} />
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


                        <Separator className='my-3' />
                    </>


                    {/* grid for fields */}


                    <ScrollArea className='h-[60vh] sm:h-[55vh]'>

                        <div className="grid md:grid-cols-3 gap-5 px-2.5 pb-10">


                            {/* Blood Group */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='blood_group' render={({ field }) => {
                                    return <>
                                        <Label>Blood Group</Label>
                                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { HandleBloodGroupChange(value), field.onChange(value) }} disabled={defaultValues as any}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {bloodGroups?.map((group, i) => {
                                                    return <SelectItem key={i} value={group.value}>{group.label}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.blood_group && <p className='text-sm text-red-500'>{errors.blood_group.message}</p>}
                            </div>

                            {/* Blood Component */}
                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='component' render={({ field }) => {
                                    return <>
                                        <Label>Blood Component</Label>
                                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { HandleBloodComponentChange(value), field.onChange(value) }} disabled={defaultValues as any}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {components?.data?.map((item) => {
                                                    return <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.component && <p className='text-sm text-red-500'>{errors.component.message}</p>}
                            </div>


                            {/* Bags */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='bag' render={({ field }) => {
                                    return <>
                                        <Label>Bags</Label>
                                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }} disabled={defaultValues as any}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {!defaultValues ?
                                                    <>
                                                        {bags?.map((bag, i) => {
                                                            return <SelectItem key={i} value={bag.bag}>{bag.bag}</SelectItem>
                                                        })}
                                                    </>
                                                    :
                                                    <>
                                                        <SelectItem value={defaultValues.bag}>{defaultValues.bag}</SelectItem>
                                                    </>
                                                }
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.bag && <p className='text-sm text-red-500'>{errors.bag.message}</p>}
                            </div>

                            {/* Doctors */}
                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Hospital Doctor</Label>
                                <Select onValueChange={(value) => { setValue(`doctor`, value) }}>
                                    <SelectTrigger >
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>

                                    <SelectContent className='z-[200]'>
                                        {doctors?.map((doctor, i) => {
                                            return <SelectItem key={i} value={doctor.name}>{doctor.name}</SelectItem>
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
                                <Label>Std Charge {currencySymbol()}</Label>
                                <Input type='text' {...register('standard_charge')} disabled />
                                {errors.standard_charge && <p className='text-sm text-red-500'>{errors.standard_charge.message}</p>}
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
                            {defaultValues ? 'Update' : 'Issue component'} {isPending && <Loader className='animate-spin' />}
                        </Button>
                    </div>

                </form>
            </Dialog >

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




export default IssueBloodComponent