import useSpecialization from '@/admin/setup/staff/specialization/handlers'
import Dialog from '@/components/Dialog'
import RequiredLabel from '@/components/required-label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { authSelector } from '@/features/auth/authSlice'
import { appointmentFormSchema, patientAppointmentSchema } from '@/formSchemas/AppointmentFormSchema'
import { calculateAmount } from '@/helpers/calculateAmount'
import { currencySymbol } from '@/helpers/currencySymbol'
import { PaymentOptions } from '@/helpers/formSelectOptions'
import { searchPatients } from '@/helpers/searchPatients'
import { useAppSelector } from '@/hooks'
import { cn } from '@/lib/utils'
import usePatient from '@/patient/profile/handlers'
import RegisterPatient from '@/patient/register/patient-signup'
import DutyRosterApi from '@/services/dutyroster-api'
import { OtherApi } from '@/services/other-api'
import { AppointmentDetails } from '@/types/appointment/appointment'
import { Doctors, Patients } from '@/types/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Loader, UserRound } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'



interface AddAppointmentProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean
    onNewPatient?: () => void
    defaultValues: AppointmentDetails
}


function AddAppointment({ Submit, isPending, onNewPatient, defaultValues, ...props }: AddAppointmentProps) {

    const [search, setSearch] = useState('')

    // const [patients, setPatients] = useState<>([])
    const [doctors, setDoctors] = useState<Doctors[]>([])
    const { user } = useAppSelector(authSelector)
    const { handlePatient, isPending: isPatientPending, form, setForm } = usePatient()

    const SCHEMA = user?.role === 'patient' ? patientAppointmentSchema : appointmentFormSchema

    const { control, register, reset, setValue, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof SCHEMA>>({
        resolver: zodResolver(SCHEMA),
        defaultValues
    })

    const { specializations, getSpecializations } = useSpecialization()

    const onSearch = useDebouncedCallback((value: string) => {
        setSearch(value)
    }, 400)


    const handleFeesANDShift = () => {
        const id = +watch('doctorId')
        const priority = watch('appointment_priority')
        const data = doctors.find((doctor) => (doctor.staff.id === id))
        if (!data || !priority) return null
        setValue('shift', data.shift)
        if (priority === 'Emergency') {
            setValue('fees', data.staff.emergency_fees)
        } else {
            setValue('fees', data.staff.normal_fees)
        }
    }

    const { data: patients } = useQuery<Patients[]>({
        queryKey: ['patients'],
        queryFn: () => OtherApi.getPatients(search),
    })


    const handleAppnDate_Specialist = async () => {
        const appointmentDate = watch('appointment_date')
        const specialistId = +watch('specialistId')
        if ((!appointmentDate || !specialistId)) return null
        const data = await DutyRosterApi.getDoctors({ appointmentDate, specialistId })
        setDoctors(data)
    }


    useEffect(() => {
        handleFeesANDShift()
    }, [watch('doctorId'), watch('appointment_priority')])


    // for calculating price
    useEffect(() => {
        const total = +watch('fees')
        const discount = +watch('discount') || 0
        const net_amount = calculateAmount(total, 0, discount).net_amount
        setValue('net_amount', net_amount)
    }, [watch('fees'), watch('discount')])


    useEffect(() => {
        handleAppnDate_Specialist()
    }, [watch('appointment_date'), watch('specialistId')])


    useEffect(() => {
        getSpecializations()
        if (user?.role === 'patient') {
            setValue('patientId', user?.id)
        }
    }, [])



    return (
        <>
            <Dialog pageTitle='Add Appointment' {...props}>
                <form onSubmit={handleSubmit(Submit)}>
                    {user?.role !== 'patient' && (
                        <>
                            <div className='flex  gap-2 px-2.5'>
                                {/* Patient Section */}
                                <div className='w-full lg:w-[300px]'>
                                    <Controller name='patientId' control={control} render={({ field }) => {
                                        return <Select
                                            value={field.value ? String(field.value) : undefined}
                                            onValueChange={(value) => { field.onChange(value) }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Search" />
                                            </SelectTrigger>

                                            <SelectContent className='relative z-[9999]'>
                                                <div className="p-2">
                                                    <Input
                                                        type='search'
                                                        className='w-full text-base'
                                                        placeholder='Search patient'
                                                        autoComplete="off"
                                                        onChange={(e) => { onSearch(e.target.value) }}
                                                    />
                                                </div>
                                                {searchPatients(search, patients!)?.map((patient) => (
                                                    <SelectItem
                                                        key={patient.id}
                                                        value={String(patient.id)}
                                                        className="flex items-center"
                                                    >
                                                        {`${patient.name} (${patient.id})`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    }} />
                                    {errors.patientId && <p className='text-sm text-red-500'>{errors.patientId.message}</p>}
                                </div>
                                <div>
                                    <Button type='button' size='sm' onClick={() => setForm(true)}>New Patient <UserRound /></Button>
                                </div>
                            </div>


                            <Separator className='my-3' />
                        </>
                    )}


                    {/* grid for fields */}


                    <ScrollArea className='h-[50vh] lg:h-[55vh]'>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 px-2.5 mb-10">

                            {/* Appointment date */}

                            <div className="w-full flex flex-col gap-y-2">
                                <RequiredLabel label='Appointment Date' />
                                <Input type='date' {...register('appointment_date')} disabled={defaultValues?.status === 'Approved'} />
                                {errors.appointment_date && <p className='text-sm text-red-500'>{errors.appointment_date.message}</p>}
                            </div>


                            {/* Specialist */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='specialistId' render={({ field }) => {
                                    return <>
                                        <RequiredLabel label='Specialist' />
                                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {specializations?.map((item, index) => {
                                                    return <SelectItem key={index} value={String(item.id)}>{item.name}</SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.specialistId && <p className='text-sm text-red-500'>{errors.specialistId.message}</p>}
                            </div>


                            {/* doctors */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='doctorId' render={({ field }) => {
                                    return <>
                                        <RequiredLabel label='Doctor' />
                                        <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {doctors?.map((doctor, index) => {
                                                    return <SelectItem key={index} value={String(doctor.staff.id)}>
                                                        {doctor.staff.name}
                                                    </SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.doctorId && <p className='text-sm text-red-500'>{errors.doctorId.message}</p>}
                            </div>


                            {/* Appointment priority */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='appointment_priority' render={({ field }) => {
                                    return <>
                                        <RequiredLabel label='Appointment priority' />
                                        <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                <SelectItem value="Normal">Normal</SelectItem>
                                                <SelectItem value="Emergency">Emergency</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.appointment_priority && <p className='text-sm text-red-500'>{errors.appointment_priority.message}</p>}
                            </div>


                            {/* fees */}

                            <div className="w-full flex flex-col gap-y-2">
                                <RequiredLabel label={`Doctor Fees ${currencySymbol()}`} />
                                <Input type='number' {...register('fees')} defaultValue={0} disabled />
                                {errors.fees && <p className='text-sm text-red-500'>{errors.fees.message}</p>}
                            </div>


                            {/* shift */}

                            <div className="w-full flex flex-col gap-y-2">
                                <RequiredLabel label='Shift' />
                                <Input {...register('shift')} disabled />
                                {errors.shift && <p className='text-sm text-red-500'>{errors.shift.message}</p>}
                            </div>


                            {/* Description */}

                            <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
                                <Label>Symptom Description</Label>
                                <Textarea placeholder='write your symptoms here' {...register('symptom_description')} />
                                {errors.symptom_description && <p className='text-sm text-red-500'>{errors.symptom_description.message}</p>}
                            </div>

                            {/* Alternative Address */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Alternative Address</Label>
                                <Input type='text' {...register('alternative_address')} />
                                {errors.alternative_address && <p className='text-sm text-red-500'>{errors.alternative_address.message}</p>}
                            </div>

                            {/* Reference */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Reference</Label>
                                <Input type='text' {...register('reference')} />
                                {errors.reference && <p className='text-sm text-red-500'>{errors.reference.message}</p>}
                            </div>

                            {/* Previous issue */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Previous Issue</Label>
                                <Input type='text' {...register('previous_medical_issue')} />
                                {errors.previous_medical_issue && <p className='text-sm text-red-500'>{errors.previous_medical_issue.message}</p>}
                            </div>

                            {user?.role !== 'patient' && (
                                <>
                                    {/* Status */}

                                    <div className={cn('w-full flex flex-col gap-y-2')}>
                                        <Controller control={control} name='status' render={({ field }) => {
                                            return <>
                                                <RequiredLabel label='Status' />
                                                <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }} >
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>

                                                    <SelectContent className='z-[200]'>
                                                        <SelectItem value="Approved">Approved</SelectItem>
                                                        <SelectItem value="Pending">Pending</SelectItem>
                                                        <SelectItem value="Cancelled">Cancel</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </>
                                        }} />
                                        {errors.status && <p className='text-sm text-red-500'>{errors.status.message}</p>}
                                    </div >

                                    {/* Discount */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Discount %</Label>
                                        <Input type='number' {...register('discount')} />
                                        {errors.discount && <p className='text-sm text-red-500'>{errors.discount.message}</p>}
                                    </div>

                                    {/* Payment mode */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Controller control={control} name='payment_mode' render={({ field }) => {
                                            return <>
                                                <RequiredLabel label='Payment mode' />
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
                                </>
                            )}

                            {/* net amount */}

                            <div className="w-full flex flex-col gap-y-2">
                                <RequiredLabel label={`Net Amount ${currencySymbol()}`} />
                                <Input type='number' {...register('net_amount')} defaultValue={0} disabled />
                                {errors.net_amount && <p className='text-sm text-red-500'>{errors.net_amount.message}</p>}
                            </div>

                        </div>
                    </ScrollArea>

                    <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end px-2.5">
                        <Button type='button' variant={'ghost'} onClick={() => reset()} >Reset</Button>
                        <Button type='submit' className='flex-1 sm:flex-none' >Book Appointment {isPending && <Loader className='animate-spin' />}</Button>
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

export default AddAppointment