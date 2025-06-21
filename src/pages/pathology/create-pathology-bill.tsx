import CustomTooltip from "@/components/customTooltip"
import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { createPathologyBillSchema, PathologyBillDefaultValues } from "@/formSchemas/createPathologyBill"
import { calculateAmount } from "@/helpers/calculateAmount"
import { currencySymbol } from "@/helpers/currencySymbol"
import { PaymentOptions } from "@/helpers/formSelectOptions"
import usePatient from "@/patient/profile/handlers"
import RegisterPatient from "@/patient/register/patient-signup"
import { OtherApi } from "@/services/other-api"
import StaffApi from "@/services/staff-api"
import { PathologyBillDeatils } from "@/types/pathology/pathology"
import { PathologyTestNameType } from "@/types/setupTypes/pathology"
import { staffs } from "@/types/staff/staff"
import { Patients } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Plus, UserRound, X } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
import toast from "react-hot-toast"
import { useDebouncedCallback } from "use-debounce"
import { z } from "zod"
import { getPathologyTestDetails, getPathologyTests } from "../../admin/setup/pathology/service"



interface CreatePathologyBillProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean,
    editDetails: PathologyBillDeatils
}




const CreatePathologyBill = ({ Submit, isPending, editDetails, ...props }: CreatePathologyBillProps) => {

    const { handlePatient, isPending: isPatientPending, form, setForm } = usePatient()

    // form hook
    const { control, register, reset, setValue, watch, handleSubmit, formState: { errors } } = useForm<z.infer<typeof createPathologyBillSchema>>({
        resolver: zodResolver(createPathologyBillSchema),
        defaultValues: editDetails ? { ...editDetails, tests: editDetails.PathologyBillItems } : PathologyBillDefaultValues
    })


    const { fields: TestFields, append: AddTest, remove: RemoveTest } = useFieldArray({
        name: 'tests',
        control
    })

    const watchTest = useWatch({ name: 'tests', control })


    // API states
    const [patients, setPatients] = useState<Patients[]>([])
    const [doctors, setDoctors] = useState<staffs['data']>([])
    const [tests, setTests] = useState<PathologyTestNameType>({ data: [], total_pages: 0 })



    const onPatientSearch = useDebouncedCallback(async (value: string) => {
        try {
            const data = await OtherApi.getPatients(value)
            setPatients(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }, 400)



    // fetching and binding tests
    const fetchPathologyTests = async () => {
        try {
            const data = await getPathologyTests({ page: 1, limit: 0 })
            setTests(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // fetching and binding test details
    const handleTestNameChange = async (testNameId: number, i: number) => {
        try {
            const data = await getPathologyTestDetails(testNameId)
            setValue(`tests.${i}.reportDays`, data.reportDays)
            const currentDate = new Date()
            currentDate.setDate(currentDate.getDate() + data.reportDays)
            const date = currentDate.toISOString().split('T')[0]
            setValue(`tests.${i}.reportDate`, date)
            setValue(`tests.${i}.tax`, data.tax)
            setValue(`tests.${i}.amount`, data.amount)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // fetching doctors

    const getDoctors = async () => {
        try {
            const data = await StaffApi.getStaffs({ search: 'doctor' }) // getting only doctors
            setDoctors(data.data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // Appends fields
    const appendMedicine = () => {
        AddTest(PathologyBillDefaultValues.tests[0])
    }


    // calculating price from all fields
    useEffect(() => {
        const discount = watch('discount')
        const additionalTax = watch('additionalTax')
        const comulativeTotal = watchTest?.reduce((sum, item) => (sum + item?.amount), 0)
        const net_amount = calculateAmount(comulativeTotal, additionalTax, discount).net_amount
        setValue(`net_amount`, net_amount)
    }, [watchTest, watch('discount'), watch('additionalTax')])



    useEffect(() => {
        if (editDetails) onPatientSearch(String(editDetails.patientId))
        fetchPathologyTests()
        getDoctors()
    }, [])



    return (
        <>
            <Dialog pageTitle='Pathology Bill' {...props}>
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

                            {/* Tests field array */}

                            {TestFields.map((test, index) => {

                                return <section key={test.id} className="sm:col-span-full mt-2 p-2 rounded-md grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 border-2 border-dashed border-gray-200 dark:border-border">

                                    {/* Test Name */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Controller control={control} name={`tests.${index}.testNameId`} render={({ field }) => {
                                            return <>
                                                <Label>Test Name</Label>
                                                <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { handleTestNameChange(Number(value), index); field.onChange(Number(value)) }}>
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>

                                                    <SelectContent className='z-[200]'>
                                                        {tests.data.map((test) => {
                                                            return <SelectItem key={test.id} value={String(test.id)}>{test.name}</SelectItem>
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            </>
                                        }} />
                                        {errors.tests?.[index]?.testNameId && <p className='text-sm text-red-500'>{errors.tests?.[index].testNameId?.message}</p>}
                                    </div>


                                    {/* Report Days */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Report Days</Label>
                                        <Input type='number' {...register(`tests.${index}.reportDays`)} disabled />
                                        {errors.tests?.[index]?.reportDays && <p className='text-sm text-red-500'>{errors.tests?.[index].reportDays?.message}</p>}
                                    </div>

                                    {/* Report Date */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Report Date</Label>
                                        <Input type='date' {...register(`tests.${index}.reportDate`)} />
                                        {errors.tests?.[index]?.reportDate && <p className='text-sm text-red-500'>{errors.tests?.[index].reportDate?.message}</p>}
                                    </div>


                                    {/* Tax */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Tax %</Label>
                                        <Input type='number' {...register(`tests.${index}.tax`, { valueAsNumber: true })} defaultValue={0} disabled />
                                        {errors.tests?.[index]?.tax && <p className='text-sm text-red-500'>{errors.tests?.[index].tax?.message}</p>}
                                    </div>

                                    {/* Amount */}

                                    <div className="w-full flex flex-col gap-y-2">
                                        <Label>Amount {currencySymbol()}</Label>
                                        <Input type="number" {...register(`tests.${index}.amount`, { valueAsNumber: true })} defaultValue={0} disabled />
                                        {errors.tests?.[index]?.amount && <p className='text-sm text-red-500'>{errors.tests?.[index].amount?.message}</p>}
                                    </div>


                                    {/* Button to remove fields */}

                                    {TestFields.length !== 1 &&
                                        <div className="h-full flex items-center gap-x-2 justify-center mt-3 sm:mt-1">
                                            <CustomTooltip message="Remove">
                                                <div className="p-1 bg-red-500 rounded-full text-white mt-2 sm:mt-4">
                                                    <X className="w-4 h-4 cursor-pointer" onClick={() => { RemoveTest(index) }} />
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

                            {/* previous report */}
                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Previous Report Value</Label>
                                <Input type="text" {...register('previousReportValue')} />
                                {errors.previousReportValue && <p className='text-sm text-red-500'>{errors.previousReportValue.message}</p>}
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
                                <Label>IPD/OPD</Label>
                                <Input type='text' {...register('moduleId')} />
                                {errors.moduleId && <p className='text-sm text-red-500'>{errors.moduleId.message}</p>}
                            </div>

                            {/* Discount */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Discount%</Label>
                                <Input type='number' {...register('discount')} defaultValue={0} />
                                {errors.discount && <p className='text-sm text-red-500'>{errors.discount.message}</p>}
                            </div>

                            {/* Tax */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Tax%</Label>
                                <Input type='number' {...register('additionalTax')} defaultValue={0} />
                                {errors.additionalTax && <p className='text-sm text-red-500'>{errors.additionalTax.message}</p>}
                            </div>

                            {/* Net Amount */}
                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Net Amount {currencySymbol()}</Label>
                                <Input type='number' {...register('net_amount')} defaultValue={0} disabled />
                                {errors.net_amount && <p className='text-sm text-red-500'>{errors.net_amount.message}</p>}
                            </div>


                            {/* Payment Mode */}

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


                            {/* Note */}
                            <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
                                <Label>Note</Label>
                                <Textarea placeholder='write your messsage here' {...register('note')} />
                            </div>

                        </div>
                    </ScrollArea>

                    <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end px-2.5">
                        <Button type='button' variant={'ghost'} onClick={() => { reset() }} >Reset</Button>
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




export default CreatePathologyBill