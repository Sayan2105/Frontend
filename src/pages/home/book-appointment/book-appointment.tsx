import ErrorFallback from "@/components/errorFallback"
import FormModal from "@/components/form-modals/form-modal"
import RequiredLabel from "@/components/required-label"
import TimeSlotSelector from "@/components/time-slots"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ProvidedDatePicker from "@/components/ui/provided-date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AuthContext } from "@/contexts/authContext"
import { patientAppointmentSchema } from "@/formSchemas/AppointmentFormSchema"
import { homepagePatientRegisterSchema } from "@/formSchemas/patientRegisterFormSchema"
import { calculateAmount } from "@/helpers/calculateAmount"
import { currencySymbol } from "@/helpers/currencySymbol"
import { generateDatesInRange, generateTimeSlots } from "@/helpers/slotGenrator"
import useOpdRoster from "@/hooks/useRoster"
import PatientApi from "@/services/patient-api"
import pulicApi from "@/services/public-apis"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { AlertCircle, Award, CalendarDays, Clock, CreditCard, Loader, MapPin, Stethoscope, User } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { z } from "zod"
import { registerPatientFormFields } from "../form-fields"
import { AppointmentData } from "@/types/appointment/appointment"

const BookAppointment = () => {

    const { rosterId } = useParams()
    const router = useNavigate()
    const [date, setDate] = useState<string>('')
    const { authUser } = useContext(AuthContext)
    const [userForm, setUserForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const {
        rosterInfo,
        isLoadingRosterInfo,
        isErrorRosterInfo,
        errorRosterInfo,
    } = useOpdRoster({ isEnabled: false, rosterId: +rosterId! })

    const [patientId, setPatientId] = useState<{ resolve: (value: number) => void }>()

    const isPatientRegistering = async () => {
        setUserForm(true)
        return new Promise<number>((resolve) => {
            setPatientId({ resolve })
        })
    }

    const { control, register, setValue, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof patientAppointmentSchema>>({
        resolver: zodResolver(patientAppointmentSchema),
    })


    const { mutate: createAppointment, isPending: isPendingCreateAppointment } = useMutation({
        mutationFn: (formData: any) => pulicApi.createAppointment(formData),
        onSuccess: ({ data, message }: { data: AppointmentData, message: string }) => {
            toast.success(message)
            sessionStorage.setItem('printData', JSON.stringify(data))
            router(`../print-appointment`)
        }, onError: (err: AxiosError<{ message: string }>) => {
            toast.error(err.response?.data.message!)
        }
    })


    const onSubmit = async (data: z.infer<typeof patientAppointmentSchema>) => {
        if (authUser?.role === 'patient') {
            data.patientId = authUser?.id
        } else if (!data.patientId) {
            data.patientId = await isPatientRegistering()
        }
        createAppointment(data)
    }


    const patientSubmit = async (data: z.infer<typeof homepagePatientRegisterSchema>) => {
        try {
            setLoading(true)
            const { confirm_password, ...restData } = data
            const formData = new FormData()
            Object.entries(restData).forEach(([key, value]) => {
                if (!value) return
                formData.append(key, JSON.stringify(value))
            })
            const response = await PatientApi.createPatient(formData)
            patientId?.resolve(response.id)
            setUserForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        const total = +watch('fees')
        const discount = +watch('discount') || 0
        const net_amount = calculateAmount(total, 0, discount).net_amount
        setValue('net_amount', net_amount)
    }, [watch('fees'), watch('discount')])


    useEffect(() => {
        setValue('doctorId', rosterInfo?.staffId!)
        setValue('rosterId', +rosterId!)
    }, [rosterInfo?.staffId, authUser?.role])


    if (isLoadingRosterInfo) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center items-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">Loading doctor information...</p>
                </div>
            </div>
        )
    }

    if (isErrorRosterInfo) {
        const axiosError = errorRosterInfo as AxiosError<{ message?: string }>;
        return (
            <ErrorFallback error={axiosError} />
        )
    }


    const staff = rosterInfo?.staff

    const handleFees = (priority: string) => {
        if (!staff || !priority) return null
        if (priority === 'Emergency') {
            setValue('fees', staff.emergency_fees)
        } else {
            setValue('fees', staff.normal_fees)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20 p-2.5">
            <Card className="w-full max-w-7xl mx-auto shadow-2xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl overflow-hidden">
                {/* Enhanced Doctor Profile Header */}
                <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 py-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl"></div>
                            <img
                                src={`${import.meta.env.VITE_APP_API_URL}/images/${staff?.image}`}
                                alt={`Dr. ${staff?.name}`}
                                className="relative w-48 h-56 object-cover rounded-2xl shadow-2xl border-4 border-white/20"
                            />
                            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                Available
                            </div>
                        </div>

                        <div className="flex-1 space-y-6 text-center lg:text-left">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">{staff?.name}</h1>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                                    {staff?.specialist.map((spec, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/20"
                                        >
                                            <Stethoscope className="h-3 w-3" />
                                            {spec.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <Award className="h-5 w-5 text-blue-200" />
                                    <div>
                                        <p className="text-blue-100 text-xs">Qualification</p>
                                        <p className="font-semibold text-white">{staff?.qualification}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <Clock className="h-5 w-5 text-green-200" />
                                    <div>
                                        <p className="text-blue-100 text-xs">Experience</p>
                                        <p className="font-semibold text-white">{staff?.work_experience} professional experience</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <p className="text-blue-50 leading-relaxed">
                                    Hello! I'm <span className="font-bold text-white">{staff?.name}</span>, specializing in{' '}
                                    {staff?.specialist.map((spec) => spec.name).join(', ')}. With my{' '}
                                    <span className="font-semibold text-white">{staff?.qualification}</span> qualification and{' '}
                                    <span className="font-semibold text-white">{staff?.work_experience}</span> of experience,
                                    I'm committed to providing you with exceptional healthcare.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-5">
                    <form className="space-y-8" onSubmit={handleSubmit((data) => { onSubmit(data) })}>

                        {/* Date Selection Section */}

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-blue-100 dark:border-gray-600">
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                                <div className="p-2 bg-blue-600 text-white rounded-xl">
                                    <CalendarDays className="h-5 w-5" />
                                </div>
                                Select Available Date
                            </h2>
                            <Controller control={control} name='date' render={({ field }) => (
                                <div className="space-y-4">
                                    <ProvidedDatePicker
                                        initialDate={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                        dateSlots={
                                            rosterInfo ? generateDatesInRange(rosterInfo?.shiftStartDate!, rosterInfo?.shiftEndDate!) : []
                                        }
                                        onDateSelect={(date) => { setDate(date), field.onChange(date) }}
                                    />
                                    {errors.date && <p className='text-sm text-red-500 flex items-center gap-1'>
                                        <AlertCircle className="h-4 w-4" />
                                        {errors.date.message}
                                    </p>}
                                </div>
                            )} />
                        </div>


                        {/* Time Slots Section */}

                        <div className="grid xl:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                                <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                                    <Clock className="h-5 w-5 text-indigo-600" />
                                    Available Time Slots
                                </h3>

                                <Controller control={control} name='time' render={({ field }) => (
                                    <div className="space-y-4">
                                        <TimeSlotSelector
                                            selectedTime={field.value}
                                            bookedSlots={rosterInfo?.bookedSlots}
                                            timeSlots={
                                                (rosterInfo && date) ? generateTimeSlots(new Date(date), rosterInfo?.shiftStartTime!, rosterInfo?.shiftEndTime!, rosterInfo?.intervalMinutes!) : []
                                            }
                                            onTimeSelect={(id) => { field.onChange(id) }}
                                        />
                                        {errors.time && <p className='text-sm text-red-500 flex items-center gap-1'>
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.time.message}
                                        </p>}
                                    </div>
                                )} />

                            </div>

                            {/* Appointment Form Section */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                                    <h3 className="flex items-center gap-2 text-xl font-semibold">
                                        <User className="h-5 w-5" />
                                        Appointment Details
                                    </h3>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="grid lg:grid-cols-2 gap-4">
                                        {/* Specialist Selection */}
                                        <div className="space-y-2">
                                            <Controller control={control} name='specialistId' render={({ field }) => (
                                                <>
                                                    <RequiredLabel label='Specialist' />
                                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                                                        <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                                                            <SelectValue placeholder="Select specialist" />
                                                        </SelectTrigger>
                                                        <SelectContent className='z-[200]'>
                                                            {staff?.specialist.map((item, index) => (
                                                                <SelectItem key={index} value={String(item.id)}>{item.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </>
                                            )} />
                                            {errors.specialistId && <p className='text-sm text-red-500 flex items-center gap-1'>
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.specialistId.message}
                                            </p>}
                                        </div>

                                        {/* Appointment Priority */}
                                        <div className="space-y-2">
                                            <Controller control={control} name='appointment_priority' render={({ field }) => (
                                                <>
                                                    <RequiredLabel label='Appointment Priority' />
                                                    <Select value={field.value || ''} onValueChange={(value) => { handleFees(value), field.onChange(value) }}>
                                                        <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                                                            <SelectValue placeholder="Select priority" />
                                                        </SelectTrigger>
                                                        <SelectContent className='z-[200]'>
                                                            <SelectItem value="Normal">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                                    Normal
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="Emergency">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                                    Emergency
                                                                </div>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </>
                                            )} />
                                            {errors.appointment_priority && <p className='text-sm text-red-500 flex items-center gap-1'>
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.appointment_priority.message}
                                            </p>}
                                        </div>

                                        {/* Doctor Fees */}
                                        <div className="space-y-2">
                                            <RequiredLabel label={`Doctor Fees ${currencySymbol()}`} />
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                                <Input
                                                    type='number'
                                                    {...register('fees')}
                                                    defaultValue={0}
                                                    disabled
                                                    className="pl-10 bg-gray-100 dark:bg-gray-700"
                                                />
                                            </div>
                                            {errors.fees && <p className='text-sm text-red-500 flex items-center gap-1'>
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.fees.message}
                                            </p>}
                                        </div>

                                        {/* Alternative Address */}
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                Alternative Address
                                            </Label>
                                            <Input
                                                type='text'
                                                {...register('alternative_address')}
                                                className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                                                placeholder="Enter alternative address"
                                            />
                                            {errors.alternative_address && <p className='text-sm text-red-500 flex items-center gap-1'>
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.alternative_address.message}
                                            </p>}
                                        </div>

                                        {/* Reference */}
                                        <div className="space-y-2">
                                            <Label>Reference</Label>
                                            <Input
                                                type='text'
                                                {...register('reference')}
                                                className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                                                placeholder="Referred by"
                                            />
                                            {errors.reference && <p className='text-sm text-red-500 flex items-center gap-1'>
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.reference.message}
                                            </p>}
                                        </div>

                                        {/* Previous Medical Issue */}
                                        <div className="space-y-2">
                                            <Label>Previous Medical Issue</Label>
                                            <Input
                                                type='text'
                                                {...register('previous_medical_issue')}
                                                className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                                                placeholder="Any previous medical conditions"
                                            />
                                            {errors.previous_medical_issue && <p className='text-sm text-red-500 flex items-center gap-1'>
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.previous_medical_issue.message}
                                            </p>}
                                        </div>


                                        {/* Net Amount */}
                                        <div className="space-y-2">
                                            <RequiredLabel label={`Net Amount ${currencySymbol()}`} />
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                                <Input
                                                    type='number'
                                                    {...register('net_amount')}
                                                    defaultValue={0}
                                                    disabled
                                                    className="pl-10 bg-gray-100 dark:bg-gray-700 font-semibold text-green-600 dark:text-green-400"
                                                />
                                            </div>
                                            {errors.net_amount && <p className='text-sm text-red-500 flex items-center gap-1'>
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.net_amount.message}
                                            </p>}
                                        </div>

                                        {/* Symptom Description */}
                                        <div className="col-span-full space-y-2">
                                            <Label className="flex items-center gap-1">
                                                <Stethoscope className="h-4 w-4" />
                                                Symptom Description
                                            </Label>
                                            <Textarea
                                                placeholder='Describe your symptoms and concerns here...'
                                                {...register('symptom_description')}
                                                className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 min-h-[100px]"
                                            />
                                            {errors.symptom_description && <p className='text-sm text-red-500 flex items-center gap-1'>
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.symptom_description.message}
                                            </p>}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="col-span-full pt-4">
                                            <Button
                                                type='submit'
                                                className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg'
                                                disabled={isPendingCreateAppointment}
                                            >
                                                {(isPendingCreateAppointment) ? (
                                                    <>
                                                        <Loader className='animate-spin mr-2 h-5 w-5' />
                                                        Processing Appointment...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CalendarDays className="mr-2 h-5 w-5" />
                                                        Appointment
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {userForm && <FormModal
                height="h-[50vh]"
                title="Patient Details"
                schema={homepagePatientRegisterSchema}
                fields={registerPatientFormFields}
                Submit={patientSubmit}
                isPending={loading}
                onClick={() => { setUserForm(false) }}
            />}
        </div>
    )
}

export default BookAppointment