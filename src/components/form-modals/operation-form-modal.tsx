import { getOperationCategories, getOperationNames } from "@/admin/setup/operation/service"
import Dialog from "@/components/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { operationFormSchema } from "@/formSchemas/addOperationFormSchema"
import StaffApi from "@/services/staff-api"
import { operationDetailsType } from "@/types/opd_section/operationType"
import { operationCategoryType, operationNameType } from "@/types/setupTypes/setupOpeartion"
import { staffs } from "@/types/staff/staff"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"


interface OperationFormProps extends HTMLAttributes<HTMLDivElement> {
    operationDetails: operationDetailsType | undefined,
    Submit: (formData: any) => void
    isPending: boolean
}

const OperationForm = ({ Submit, isPending, operationDetails: details, ...props }: OperationFormProps) => {

    // API State
    const [doctors, setDoctors] = useState<staffs['data']>([]);
    const [categories, setCategories] = useState<operationCategoryType[]>([]);
    const [operationNames, setOperationNames] = useState<operationNameType[]>([]);



    const { register, reset, handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof operationFormSchema>>({
        resolver: zodResolver(operationFormSchema),
        defaultValues: details
    })


    // fetching categories list

    const fethctOperationCategories = async () => {
        try {
            const data = await getOperationCategories()
            setCategories(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const handleCategoryChange = async (categoryId: number) => {
        try {
            const data = await getOperationNames(categoryId)
            setOperationNames(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    const fetchDoctorsList = async () => {
        try {
            const data = await StaffApi.getStaffs({ search: 'doctor' })
            setDoctors(data.data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchDoctorsList()
        fethctOperationCategories()
        if (details) handleCategoryChange(details.categoryId) // fetching data on edit mode
    }, [])


    return (
        <Dialog pageTitle="Operation" {...props}>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className='h-[50vh]'>

                    <div className="grid gap-5 sm:grid-cols-3 mt-5 px-4 pb-5">

                        {/* Category */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='categoryId' render={({ field }) => {
                                return <>
                                    <Label>Category</Label>
                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { handleCategoryChange(Number(value)); field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {categories.map((category, i) => {
                                                return <SelectItem key={i} value={String(category.id)}>{category.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.categoryId && <p className='text-sm text-red-500'>{errors.categoryId.message}</p>}

                        </div>


                        {/*Operation name */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='oprNameId' render={({ field }) => {
                                return <>
                                    <Label>Operation Name</Label>
                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {operationNames.map((name, i) => {
                                                return <SelectItem key={i} value={String(name.id)}>{name.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.oprNameId && <p className='text-sm text-red-500'>{errors.oprNameId.message}</p>}

                        </div>


                        {/* Date */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Date</Label>
                            <Input type='datetime-local' {...register('date')} />
                            {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                        </div>


                        {/* Doctor */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='doctorId' render={({ field }) => {
                                return <>
                                    <Label>Consultant Doctor</Label>
                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(value) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {doctors.map((doctor, i) => {
                                                return <SelectItem key={i} value={String(doctor.id)}>{doctor.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.doctorId && <p className='text-sm text-red-500'>{errors.doctorId.message}</p>}

                        </div>


                        {/* Assistant Consultant 1 */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Assistant Consultant 1</Label>
                            <Input type='text' {...register('assistant_1')} />
                            {errors.assistant_1 && <p className='text-sm text-red-500'>{errors.assistant_1.message}</p>}
                        </div>


                        {/* Assistant Consultant 2 */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Assistant Consultant 2</Label>
                            <Input type='text' {...register('assistant_2')} />
                            {errors.assistant_2 && <p className='text-sm text-red-500'>{errors.assistant_2.message}</p>}
                        </div>


                        {/* Anesthetist */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Anesthetist</Label>
                            <Input type='text' {...register('anesthetist')} />
                            {errors.anesthetist && <p className='text-sm text-red-500'>{errors.anesthetist.message}</p>}
                        </div>


                        {/* Anesthetist type */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Anesthesia Type</Label>
                            <Input type='text' {...register('anesthesia_type')} />
                            {errors.anesthesia_type && <p className='text-sm text-red-500'>{errors.anesthesia_type.message}</p>}
                        </div>


                        {/* OT Technician */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>OT Technician</Label>
                            <Input type='text' {...register('ot_technician')} />
                            {errors.ot_technician && <p className='text-sm text-red-500'>{errors.ot_technician.message}</p>}
                        </div>

                        {/* OT Assistant */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>OT Assistant</Label>
                            <Input type='text' {...register('ot_assistant')} />
                            {errors.ot_assistant && <p className='text-sm text-red-500'>{errors.ot_assistant.message}</p>}
                        </div>


                        {/* Note */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Note</Label>
                            <Input type='text' {...register('note')} />
                            {errors.note && <p className='text-sm text-red-500'>{errors.note.message}</p>}
                        </div>


                        {/* Result */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Result</Label>
                            <Input type='text' {...register('result')} />
                            {errors.result && <p className='text-sm text-red-500'>{errors.result.message}</p>}
                        </div>


                    </div>

                </ScrollArea>

                <div className="flex mt-5 mb-2 p-3 gap-x-2 sm:justify-end">
                    <Button variant='outline' onClick={() => reset()}>Reset</Button>
                    <Button type='submit' className='flex-1 sm:flex-none'>{details ? 'Update' : 'Save'} {isPending && <Loader className='animate-spin' />}</Button>
                </div>
            </form>
        </Dialog>
    )
}

export default OperationForm