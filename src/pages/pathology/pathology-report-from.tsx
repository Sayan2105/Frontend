import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import Dialog from '@/components/Dialog'
import { LabReportFormSchema } from '@/formSchemas/approvedBYschema'
import { staffs } from '@/types/staff/staff'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Textarea } from '../../components/ui/textarea'
import { getPathTestNameParameters } from '../../admin/setup/pathology/service'
import { PathTestReport } from '@/types/pathology/pathology'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import StaffApi from '@/services/staff-api'



interface PathologyReportFormProps extends HTMLAttributes<HTMLDivElement> {
    editDetails: PathTestReport
    isPending: boolean
    Submit: (formData: any) => void
    testNameId: number
}



const PathologyReportForm = ({ Submit, isPending, editDetails, testNameId, ...props }: PathologyReportFormProps) => {


    // API states
    const [staffs, setStaffs] = useState<staffs>({ data: [], total_pages: 0 })
    const [parameterData, setParameterData] = useState<{ [key: number]: { name: string, range: string, unit: string } }>() // only for view


    const { control, register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof LabReportFormSchema>>({
        resolver: zodResolver(LabReportFormSchema),
        defaultValues: { ...editDetails, report: editDetails?.reportValues }
    })

    const { fields: ReportFields } = useFieldArray({ control: control, name: 'report', })


    const fetchStaffs = async () => {
        try {
            const data = await StaffApi.getStaffs({ search: 'pathologist' }) // getting only staffs
            setStaffs(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchPathTestNameParameters = async (testNameId: number) => {
        try {

            const data = await getPathTestNameParameters(testNameId)

            reset({
                report: [...data.map(item => ({
                    parameterId: item.parameterId,
                    reportValue: '',
                }))]
            })

            // only for displaying purpose

            data.map((item, i) => (
                setParameterData(prev => ({ ...prev, [i]: { name: item.parameter.name, range: `${item.parameter.from} - ${item.parameter.to}`, unit: item.parameter.unit.name } }))
            ))


        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        editDetails ? (
            editDetails.reportValues.map((item, i) => (
                setParameterData(prev => ({ ...prev, [i]: { name: item.parameter.name, range: `${item.parameter.from} - ${item.parameter.to}`, unit: item.parameter.unit.name } }))
            ))
        )
            :
            (fetchPathTestNameParameters(testNameId))
        fetchStaffs()
    }, [testNameId])



    return (
        <Dialog pageTitle={'Add Report'} {...props} className='mx-auto'>
            <form onSubmit={handleSubmit(Submit)}>

                {/* mainGrid */}

                <ScrollArea className='h-[50vh]'>

                    <div className="grid sm:grid-cols-2 gap-5 mt-5 px-3 pb-5">


                        {/* Staff Id */}

                        <div className="w-full flex flex-col gap-y-2">
                            <Controller control={control} name='staffId' render={({ field }) => {
                                return <>
                                    <Label>Approved By</Label>
                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={(value) => { field.onChange(Number(value)) }}>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>

                                        <SelectContent className='z-[200]'>
                                            {staffs.data.map((staff) => (
                                                <SelectItem key={staff.id} value={String(staff.id)}>{staff.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </>
                            }} />
                            {errors.staffId && <p className='text-sm text-red-500'>{errors.staffId.message}</p>}

                        </div>


                        {/* Date */}

                        <div className="w-full flex flex-col gap-y-2 ">
                            <Label>Approved Date</Label>
                            <Input type='date' {...register('date')} />
                            {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
                        </div>


                        {/* Result */}

                        <div className="w-full flex flex-col gap-y-2 sm:col-span-full ">
                            <Label>Result</Label>
                            <Textarea {...register('result')} placeholder='Write result here' />
                            {errors.result && <p className='text-sm text-red-500'>{errors.result.message}</p>}
                        </div>

                        {/* Report Value */}

                        <div className="col-span-full grid">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Parameter Name</TableHead>
                                        <TableHead>Report Value</TableHead>
                                        <TableHead>Reference Range</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {ReportFields.map((field, i) => (
                                        <TableRow key={field.id}>
                                            <TableCell>
                                                {parameterData?.[i]?.name}
                                                <input type='text' {...register(`report.${i}.parameterId`)} hidden />
                                                {errors.report?.[i]?.parameterId && <p className='text-sm text-red-500'>{errors.report?.[i].parameterId.message}</p>}
                                            </TableCell>

                                            <TableCell className='flex items-center space-x-2'>
                                                <Input type='text' {...register(`report.${i}.reportValue`)} />
                                                <span className='bg-primary p-1 rounded text-white '>{parameterData?.[i]?.unit}</span>
                                                {errors.report?.[i]?.reportValue && <p className='text-sm text-red-500'>{errors.report?.[i].reportValue.message}</p>}
                                            </TableCell>

                                            <TableCell className='text-center'>
                                                <span>{parameterData?.[i]?.range}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                    </div>

                </ScrollArea>

                <PermissionProtectedAction action='create' module='Pathology Report'>
                    <div className="flex mt-5 mb-2 p-3">
                        <Button type='submit' className='flex-1 sm:flex-none'>{editDetails ? 'Update' : 'Save Report'} {isPending && <Loader className='animate-spin' />}</Button>
                    </div>
                </PermissionProtectedAction>
            </form>
        </Dialog>
    )
}




export default PathologyReportForm



// NOTE : Parameter and Range are only for displaying purpose and will not be saved