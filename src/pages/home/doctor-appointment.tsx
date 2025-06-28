import FormModal from "@/components/form-modals/form-modal"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import RequiredLabel from "@/components/required-label"
import { Button } from "@/components/ui/button"
import HorizontalDatePicker from "@/components/ui/horizontal-date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthContext } from "@/contexts/authContext"
import { patientAppointmentSchema } from "@/formSchemas/AppointmentFormSchema"
import { homepagePatientRegisterSchema } from "@/formSchemas/patientRegisterFormSchema"
import { currencySymbol } from "@/helpers/currencySymbol"
import PatientApi from "@/services/patient-api"
import pulicApi from "@/services/public-apis"
import { AppointmentData } from "@/types/appointment/appointment"
import { Doctors } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { BadgeCheck, Calendar1, FileText, Loader2 } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useLocation } from "react-router-dom"
import { z } from "zod"
import PrintAppointment from "../appointment/print/print-appointment"
import { UnborderedDoctorCard } from "./book-appointment"
import { registerPatientFormFields } from "./form-fields"

const DoctorAppointment = () => {
    const { authUser } = useContext(AuthContext)
    const location = useLocation().search
    const doctorId = new URLSearchParams(location).get('doctorId')
    const [rosterInfo, setRosterInfo] = useState<Doctors | null>(null)
    const [step, setStep] = useState<'availability' | 'appointment-form' | 'success'>('availability')
    const [loading, setLoading] = useState({ user: false, appointment: false })
    const [userForm, setUserForm] = useState(false)
    const [patientId, setPatientId] = useState<{ resolve: (value: number) => void }>()
    const [print, setPrint] = useState(false)
    const [appointment, setAppointment] = useState<AppointmentData>()


    const { setValue, handleSubmit, register, watch, control, formState: { errors } } = useForm<z.infer<typeof patientAppointmentSchema>>({
        resolver: zodResolver(patientAppointmentSchema)
    })

    const priority = watch('appointment_priority')
    const date = watch('appointment_date')


    const isPatientRegistering = async () => {
        setUserForm(true)
        return new Promise<number>((resolve) => {
            setPatientId({ resolve })
        })
    }

    const checkAvailability = async () => {
        try {
            if (!doctorId || !date) return null
            const data = await pulicApi.checkDoctorAvailability({ doctorId: Number(doctorId), appointmentDate: date })
            setRosterInfo(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onAppointmentSubmit = async (data: z.infer<typeof patientAppointmentSchema>) => {
        try {
            setLoading({ ...loading, appointment: true })
            if (authUser?.role === 'patient') {
                data.patientId = authUser?.id
            } else if (!data.patientId) {
                data.patientId = await isPatientRegistering()
            }
            const res = await pulicApi.createAppointment(data)
            setAppointment(res.appointment)
            toast.success(res.message)
            setStep('success')
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setLoading({ ...loading, appointment: false }) }
    }


    const patientSubmit = async (data: z.infer<typeof homepagePatientRegisterSchema>) => {
        try {
            setLoading({ ...loading, user: true })
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if (!value) return
                formData.append(key, JSON.stringify(value))
            })
            const response = await PatientApi.createPatient(formData)
            patientId?.resolve(response.id)
            setUserForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading({ ...loading, user: false })
        }
    }


    const handlePriorityChange = () => {
        if (!rosterInfo || !priority) return null
        setValue('shift', rosterInfo.shift)
        if (priority === 'Emergency') {
            setValue('fees', rosterInfo.staff.emergency_fees)
        } else {
            setValue('fees', rosterInfo.staff.normal_fees)
        }
        setValue('net_amount', watch('fees'))
    }

    useEffect(() => { handlePriorityChange() }, [priority, doctorId])


    useEffect(() => {
        checkAvailability()
    }, [doctorId, date])


    return (
        <div className="bg-gradient-to-br from-blue-50 dark:from-blue-500/10 dark:to-green-500/10 dark:bg-neutral-900 text-gray-800 dark:text-gray-100">
            <form onSubmit={handleSubmit(onAppointmentSubmit)}>
                <MaxWidthWrapper className="flex flex-col gap-12 pt-12 pb-24 lg:px-10">
                    {/* Header */}
                    <div className="flex gap-2 items-center justify-center">
                        <div className="p-2 rounded-full bg-white/20 dark:bg-white/10 shadow-xl">
                            <Calendar1 className="text-blue-500 w-8 h-8" />
                        </div>
                        <h1 className="text-gray-800 dark:text-neutral-100 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                            Book Appointment
                        </h1>
                    </div>

                    {/* Date Picker */}
                    <Controller control={control} name="appointment_date" render={({ field }) => (
                        <HorizontalDatePicker onDateSelect={(date) => { field.onChange(date), setStep('availability') }} />
                    )} />


                    {/* Availability */}
                    {step === 'availability' && (
                        rosterInfo ? (<div className="grid lg:grid-cols-3 gap-10 items-center">

                            {/* Doctor Card */}
                            <UnborderedDoctorCard
                                image={rosterInfo?.staff.image!}
                                name={rosterInfo?.staff.name!}
                                qualification={rosterInfo?.staff.qualification!}
                                specialization={rosterInfo?.staff.specialist.map((staff) => (staff.name)).join(', ')!}
                                experience={rosterInfo?.staff.work_experience!}
                            />

                            {/* Badge Card */}
                            <div className="lg:col-span-2">
                                <div className="flex gap-5 items-center border border-dashed dark:border-white/10 p-5 lg:p-10 rounded-xl bg-gradient-to-br from-white dark:from-green-900/20 dark:to-blue-900/20 shadow-md">

                                    <div className="relative p-4 rounded-full bg-green-500 dark:bg-green-800 shadow-xl cursor-pointer w-fit h-fit">
                                        <BadgeCheck className="w-12 h-12 text-white" />
                                        <div className="bg-green-500/60 dark:bg-green-500/30 absolute inset-0 rounded-full animate-ping" />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-lg sm:text-xl font-medium text-gray-800 dark:text-white">
                                            Doctor is currently available for appointments.
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Book an appointment now to consult with the doctor.
                                        </p>

                                        <Button type="button" onClick={() => { setStep('appointment-form'), setValue('doctorId', Number(doctorId)) }} >Book Appointment</Button>
                                    </div>

                                </div>
                            </div>

                        </div>) : date ?
                            (<div className="w-full h-full text-center text-gray-700 dark:text-neutral-300">
                                <p>
                                    We’re sorry, but doctor is not available on your selected date — <strong>{watch('appointment_date')}</strong>.
                                    <br />
                                    Please try selecting a different date.
                                </p>
                            </div>)
                            :
                            (<p className="text-center text-gray-700  dark:text-neutral-300 text-sm">Please select a date</p>)
                    )}



                    {/* Appointment Form */}
                    {step === 'appointment-form' && (
                        <div className="grid sm:grid-cols-3 gap-5 items-center border dark:border-white/10 p-5 lg:p-10 rounded-xl bg-gradient-to-br from-white dark:from-green-900/20 dark:to-blue-900/20 shadow-xl">

                            {/* doctor Card */}
                            <UnborderedDoctorCard
                                image={rosterInfo?.staff.image!}
                                name={rosterInfo?.staff.name!}
                                qualification={rosterInfo?.staff.qualification!}
                                specialization={rosterInfo?.staff.specialist.map((staff) => (staff.name)).join(', ')!}
                                experience={rosterInfo?.staff.work_experience!}
                            />

                            {/* Form */}
                            <div className="sm:col-span-2 border dark:border-white/10 p-5 lg:p-10 rounded-xl bg-gradient-to-br from-white dark:from-green-900/20 dark:to-blue-900/20 shadow-md">

                                <h1 className="text-center mb-8 text-2xl font-bold text-gray-900 dark:text-white">Appointment Details</h1>

                                <div className="grid sm:grid-cols-2 gap-5 items-center ">
                                    {/* Specialization */}
                                    <div className="w-full flex flex-col gap-y-2">
                                        <Controller control={control} name='specialistId' render={({ field }) => {
                                            return <>
                                                <RequiredLabel label='Specialization' />
                                                <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                                                    <SelectTrigger className="dark:border-white/10">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>

                                                    <SelectContent className='z-[200]'>
                                                        {rosterInfo?.staff.specialist.map((item, index) => (
                                                            <SelectItem value={String(item.id)} key={index}>{item.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </>
                                        }} />
                                        {errors.specialistId && <p className='text-sm text-red-500'>{errors.specialistId.message}</p>}
                                    </div>


                                    {/* Appointment priority */}
                                    <div className="w-full flex flex-col gap-y-2">
                                        <Controller control={control} name='appointment_priority' render={({ field }) => {
                                            return <>
                                                <RequiredLabel label='Appointment priority' />
                                                <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                                                    <SelectTrigger className="dark:border-white/10">
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
                                        <Input type='number' {...register('fees')} defaultValue={0} disabled className="dark:border-white/10" />
                                        {errors.fees && <p className='text-sm text-red-500'>{errors.fees.message}</p>}
                                    </div>


                                    {/* shift */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <RequiredLabel label='Shift' />
                                        <Input {...register('shift')} disabled className="dark:border-white/10" />
                                        {errors.shift && <p className='text-sm text-red-500'>{errors.shift.message}</p>}
                                    </div>

                                    {/* Description */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Symptom Description</Label>
                                        <Input type="text" placeholder='write your symptoms here' {...register('symptom_description')} className="dark:border-white/10" />
                                        {errors.symptom_description && <p className='text-sm text-red-500'>{errors.symptom_description.message}</p>}
                                    </div>

                                    {/* Reference */}
                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Reference</Label>
                                        <Input type='text' {...register('reference')} className="dark:border-white/10" />
                                        {errors.reference && <p className='text-sm text-red-500'>{errors.reference.message}</p>}
                                    </div>

                                    {/* Previous issue */}
                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Previous Issue</Label>
                                        <Input type='text' {...register('previous_medical_issue')} className="dark:border-white/10" />
                                        {errors.previous_medical_issue && <p className='text-sm text-red-500'>{errors.previous_medical_issue.message}</p>}
                                    </div>

                                    {/* net amount */}
                                    <div className="w-full flex flex-col gap-y-2">
                                        <RequiredLabel label={`Net Amount ${currencySymbol()}`} />
                                        <Input type='number' {...register('net_amount')} defaultValue={0} disabled className="dark:border-white/10" />
                                        {errors.net_amount && <p className='text-sm text-red-500'>{errors.net_amount.message}</p>}
                                    </div>
                                </div>

                                <div className="mt-5 flex justify-end">
                                    <Button className="flex-1 sm:flex-none" type='submit'>
                                        Book Appointment {loading.appointment && <Loader2 className="w-5 h-5 animate-spin" />}
                                    </Button>
                                </div>

                            </div>
                        </div>
                    )}


                    {step === 'success' && (
                        <div className="flex flex-col justify-center items-center gap-8 text-center border-2 border-dashed border-green-900/20  lg:w-[800px] mx-auto p-5 rounded-xl shadow-xl bg-gradient-to-br form-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                            {/* Text */}
                            <div className="space-y-3">
                                <h1 className="text-green-500 text-2xl sm:text-4xl font-bold">Congratulations 🎉</h1>
                                <p className="text-sm text-gray-600 dark:text-neutral-300">Your appointment has been booked successfully. You will receive a confirmation email shortly.</p>
                            </div>
                            {/* icon */}
                            <div
                                // onClick={ }
                                className="relative p-4 rounded-full bg-green-500 dark:bg-green-800 shadow-xl cursor-pointer">
                                <FileText className="w-12 h-12 text-white" />
                                <div className="bg-green-500/60 dark:bg-green-500/30 absolute inset-0 rounded-full animate-ping" />
                            </div>

                            <div className="flex flex-col gap-y-5 text-center">
                                <p className="">Now you can Print & Download your appointment</p>

                                <button
                                    onClick={() => { setPrint(true) }}
                                    type="button"
                                    className="bg-gradient-to-r rounded-lg hover:scale-105 transition-all duration-300 from-green-500  to-blue-500 text-white px-4 py-2 text-sm font-semibold">
                                    Print & Download
                                </button>
                            </div>
                        </div>
                    )}

                </MaxWidthWrapper>
            </form>


            {userForm && <FormModal
                height="h-[50vh]"
                title="Register Patient"
                schema={homepagePatientRegisterSchema}
                fields={registerPatientFormFields}
                Submit={patientSubmit}
                isPending={loading.user}
                onClick={() => { setUserForm(false) }}
            />}


            {print && <PrintAppointment Info={appointment!} afterPrint={() => { setPrint(false) }} />}
        </div>
    )
}

export default DoctorAppointment