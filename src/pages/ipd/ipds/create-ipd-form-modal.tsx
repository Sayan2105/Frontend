import useBedHandlers from '@/admin/setup/bed/bed-name/bed-handlers'
import { BedGroupType } from '@/admin/setup/bed/group/bed-group-handlers'
import bedApi from '@/admin/setup/services/bed'
import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { CreateIpdSchema } from '@/formSchemas/create-ipd-schema'
import { errorHandler } from "@/helpers/error-handler.ts"
import usePatient from '@/patient/profile/handlers'
import RegisterPatient from '@/patient/register/patient-signup'
import { OtherApi } from '@/services/other-api'
import StaffApi from '@/services/staff-api'
import { IpdInfo } from '@/types/IPD/ipd'
import { staffs } from '@/types/staff/staff'
import { Patients } from '@/types/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, UserRound } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'


interface CreateIpdModalProps extends HTMLAttributes<HTMLDivElement> {
    Submit: (formData: any) => void
    isPending: boolean
    editDetails: IpdInfo
}


function CreateIpdModal({ editDetails, Submit, isPending, ...props }: CreateIpdModalProps) {

    const { handlePatient, isPending: isPatientPending, form, setForm } = usePatient()

    const [patients, setPatients] = useState<Patients[]>([])
    const [doctors, setDoctors] = useState<staffs['data']>([])
    const [bedGroups, setBedGroups] = useState<BedGroupType[]>([])
    const { beds, getBeds } = useBedHandlers()


    const { control, register, reset, handleSubmit, formState: { errors } } = useForm<z.infer<typeof CreateIpdSchema>>({
        resolver: zodResolver(CreateIpdSchema),
        defaultValues: editDetails,
    })


    // fetching doctors
    const getDoctors = async () => {
        try {
            const data = await StaffApi.getStaffs({ search: 'doctor' })
            setDoctors(data.data)
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }

    const fetchBedGroups = async () => {
        try {
            const data = await bedApi.getGroups()
            setBedGroups(data)
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }

    const handleBedGroupChange = async (id: number) => {
        try {
            await getBeds({ search: String(id) })
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }


    // searching patients
    const onSearch = useDebouncedCallback(async (value: string) => {
        try {
            const data = await OtherApi.getPatients(value)
            setPatients(data)
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }, 400)


    useEffect(() => {
        getDoctors();
        fetchBedGroups()
        if (editDetails) {
            onSearch(String(editDetails.patientId))
            handleBedGroupChange(editDetails.bedGroupId)
        }
    }, [])


    return (
        <>
            <Dialog pageTitle='Create IPD' {...props}>
                <form onSubmit={handleSubmit(Submit)}>
                    <div className='flex  gap-2 px-2.5'>
                        {/* Patient Section */}
                        <div>
                            <Controller name='patientId' control={control} render={({ field }) => {
                                return <Select value={field.value ? String(field.value) : undefined}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                    }}>
                                    <SelectTrigger className='sm:w-[300px] w-40'>
                                        <SelectValue placeholder="Search" />
                                    </SelectTrigger>

                                    <SelectContent className='z-[200]'>
                                        <Input type='search' className='w-full' placeholder='search patient'
                                            onChange={(e) => {
                                                onSearch(e.target.value)
                                            }} />
                                        {patients.map((patient, i) => {
                                            return <SelectItem key={i}
                                                value={String(patient.id)}>{`${patient.name} (${patient.id})`}</SelectItem>
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

                    <Separator className='my-4' />

                    {/* grid for fields */}


                    <ScrollArea className='h-[60vh] sm:h-[55vh]'>

                        <div className="grid md:grid-cols-3 gap-5 px-2.5 pb-5">

                            {/* Admission Date */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Admission Date</Label>
                                <Input type='date' {...register('date')} defaultValue={new Date().toISOString().split('T')[0]} />
                                {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                            </div>

                            {/* Opd id */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>OPD ID</Label>
                                <Input type='text' {...register('opdId')} />
                                {errors.opdId && <p className='text-sm text-red-500'>{errors.opdId.message}</p>}
                            </div>


                            {/* Casualty  */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='casualty' render={({ field }) => {
                                    return <>
                                        <Label>Casualty</Label>
                                        <Select value={field.value || ''} onValueChange={(value) => {
                                            field.onChange(value)
                                        }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                <SelectItem value="Yes">Yes</SelectItem>
                                                <SelectItem value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.casualty && <p className='text-sm text-red-500'>{errors.casualty.message}</p>}
                            </div>


                            {/* old patient  */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='old_patient' render={({ field }) => {
                                    return <>
                                        <Label>Old Patient</Label>
                                        <Select value={field.value || ''} onValueChange={(value) => {
                                            field.onChange(value)
                                        }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                <SelectItem value="Yes">Yes</SelectItem>
                                                <SelectItem value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.old_patient && <p className='text-sm text-red-500'>{errors.old_patient.message}</p>}
                            </div>


                            {/* Reference */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Reference</Label>
                                <Input {...register('reference')} />
                                {errors.reference && <p className='text-sm text-red-500'>{errors.reference.message}</p>}
                            </div>


                            {/* doctors */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='doctorId' render={({ field }) => {

                                    return <>
                                        <Label>Doctor</Label>
                                        <Select value={field.value ? String(field.value) : undefined}
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                            }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {doctors?.map((doctor, index) => {
                                                    return <SelectItem key={index} value={String(doctor.id)}>
                                                        {doctor.name}
                                                    </SelectItem>
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.doctorId && <p className='text-sm text-red-500'>{errors.doctorId.message}</p>}
                            </div>


                            {/* bed grops */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='bedGroupId' render={({ field }) => {

                                    return <>
                                        <Label>Bed Group</Label>
                                        <Select value={field.value ? String(field.value) : undefined}
                                            onValueChange={(value) => {
                                                handleBedGroupChange(+value);
                                                field.onChange(value)
                                            }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {bedGroups?.map((group, index) => (
                                                    <SelectItem key={index}
                                                        value={String(group.id)}>{group.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.bedGroupId && <p className='text-sm text-red-500'>{errors.bedGroupId.message}</p>}
                            </div>


                            {/* bed name */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Controller control={control} name='bedId' render={({ field }) => {

                                    return <>
                                        <Label>Bed Name</Label>
                                        <Select value={field.value ? String(field.value) : undefined}
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                            }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='z-[200]'>
                                                {beds.data?.map((bed, index) => (
                                                    <SelectItem key={index} value={String(bed.id)}>{bed.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }} />
                                {errors.bedId && <p className='text-sm text-red-500'>{errors.bedId.message}</p>}
                            </div>


                            {/* symptom type */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Symptom Type</Label>
                                <Input type='text' {...register('symptom_type')} />
                                {errors.symptom_type &&
                                    <p className='text-sm text-red-500'>{errors.symptom_type.message}</p>}
                            </div>

                            {/* Description */}

                            <div className="w-full flex flex-col gap-y-2 sm:col-span-2">
                                <Label>Symptom Description</Label>
                                <Textarea placeholder='write your symptoms here' {...register('symptom_description')} />
                                {errors.symptom_description &&
                                    <p className='text-sm text-red-500'>{errors.symptom_description.message}</p>}
                            </div>


                            {/* Previous issue */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Previous Issue</Label>
                                <Input type='text' {...register('previous_medical_issue')} />
                                {errors.previous_medical_issue &&
                                    <p className='text-sm text-red-500'>{errors.previous_medical_issue.message}</p>}
                            </div>

                            {/* Note */}

                            <div className="w-full flex flex-col gap-y-2">
                                <Label>Note</Label>
                                <Input type='text' placeholder='write your messsage here' {...register('note')} />
                                {errors.note && <p className='text-sm text-red-500'>{errors.note.message}</p>}
                            </div>


                        </div>
                    </ScrollArea>

                    <div className="flex mt-5 mb-2 gap-x-2 sm:justify-end px-2.5">
                        <Button type='button' variant={'ghost'} onClick={() => reset()}>Reset</Button>
                        <Button type='submit' className='flex-1 sm:flex-none'>Save {isPending &&
                            <Loader className='animate-spin' />}</Button>
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


export default CreateIpdModal
