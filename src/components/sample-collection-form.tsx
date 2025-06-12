import { sampleCollectionSchema } from "@/formSchemas/sampleCollectionSchema"
import { hospital_name } from "@/globalData"
import { PathologySampleCollectionDet } from "@/types/pathology/pathology"
import { RadiologySampleCollectionDet } from "@/types/radiology/radiology"
import { staffs } from "@/types/staff/staff"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { HTMLAttributes, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import Dialog from "./Dialog"
import PermissionProtectedAction from "./permission-protected-actions"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { ScrollArea } from "./ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import StaffApi from "@/services/staff-api"


interface SampleCollectionFormProps extends HTMLAttributes<HTMLDivElement> {
    isPending: boolean
    Submit: (data: any) => void
    editDetails: RadiologySampleCollectionDet | PathologySampleCollectionDet
    Role: 'radiologist' | 'pathologist'
}


const SampleCollectionForm = ({ isPending, Submit, editDetails, Role, ...props }: SampleCollectionFormProps) => {

    const [staffs, setStaffs] = useState<staffs>({ data: [], total_pages: 0 })


    const { control, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof sampleCollectionSchema>>({
        resolver: zodResolver(sampleCollectionSchema),
        defaultValues: editDetails
    })


    const fetchStaffs = async () => {
        try {
            const data = await StaffApi.getStaffs({ search: Role }) // getting only staffs
            setStaffs(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchStaffs()
    }, [])



    return (
        <Dialog pageTitle='Sample Collection' {...props} className='sm:w-[400px] mx-auto'>
            <form onSubmit={handleSubmit(Submit)}>
                <ScrollArea className={'relative h-[50vh] w-full'}>
                    <div className="grid gap-5 mt-2 px-3 pb-5">

                        {/* Date */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Label>Date</Label>
                            <Input type='date' {...register('date')} />
                            {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                        </div>


                        {/* staff */}
                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='staffId' render={({ field }) => {
                                return <>
                                    <Label>Sample Collected Person Name</Label>
                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(Number(value)) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {staffs.data.map((staff) => {
                                                return <SelectItem key={staff.id} value={String(staff.id)}>{staff.name}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.staffId && <p className='text-sm text-red-500'>{errors.staffId.message}</p>}

                        </div>


                        {/* Center */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Center</Label>
                            <Input type='text' {...register('center')} defaultValue={hospital_name} />
                            {errors.center && <p className='text-sm text-red-500'>{errors.center.message}</p>}
                        </div>
                    </div>
                </ScrollArea>

                <PermissionProtectedAction action='create' module='Sample Collection'>
                    <div className="flex mt-5 mb-2 p-3">
                        <Button type='submit' className='flex-1'>{editDetails ? 'Update' : 'Save Sample Collection'} {isPending && <Loader className='animate-spin' />}</Button>
                    </div>
                </PermissionProtectedAction>

            </form>
        </Dialog>
    )
}

export default SampleCollectionForm