import Dialog from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AssignRosterSchema } from '@/formSchemas/assignRosterFormSchema'
import StaffApi from '@/services/staff-api'
import { RosterDataType } from '@/types/dutyRoster/DutyRoster'
import { staffs } from '@/types/staff/staff'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'



interface AssignRosterFormProps extends HTMLAttributes<HTMLDivElement> {
  Submit: (formData: any) => void
  rosterDetails: RosterDataType
  isPending: boolean
}



const AssignRosterForm = ({ Submit, rosterDetails, isPending, ...props }: AssignRosterFormProps) => {


  // API state
  const [staffs, setStaff] = useState<staffs>({ data: [], total_pages: 0 })


  const { handleSubmit, control, register, formState: { errors }, reset } = useForm<z.infer<typeof AssignRosterSchema>>({
    resolver: zodResolver(AssignRosterSchema),
    defaultValues: rosterDetails
  })


  // fetching staffs list
  const fetchStaffs = async () => {
    try {
      const data = await StaffApi.getStaffs({})
      setStaff(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }



  useEffect(() => {
    fetchStaffs()
  }, [])



  return (
    <Dialog pageTitle='Assign Roster' className='sm:w-[550px] mx-auto' {...props}>
      <form onSubmit={handleSubmit(Submit)}>
        <ScrollArea className='h-[60vh] sm:h-[55vh]'>
          <div className="grid sm:grid-cols-2 gap-5 pb-5 px-2.5">

            {/* Staff */}

            <div className="w-full flex flex-col gap-y-2">
              <Controller control={control} name='staffId' render={({ field }) => {
                return <>
                  <Label>Staff</Label>
                  <Combobox
                    width='w-full'
                    placeholder='Select Staff'
                    options={staffs?.data.map((staff) => ({ label: `${staff.name} (${staff.role})`, value: String(staff.id) })) || []}
                    defaultValue={field.value ? String(field.value) : undefined}
                    onValueChange={(value) => { field.onChange(Number(value)) }}
                  />
                </>
              }} />
              {errors.staffId && <p className='text-sm text-red-500'>{errors.staffId.message}</p>}
            </div>

            {/* Shift Start Time */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Shift Start Time</Label>
              <Input type='time' {...register('shiftStartTime')} />
              {errors.shiftStartTime && <p className='text-sm text-red-500'>{errors.shiftStartTime.message}</p>}
            </div>

            {/* Shift End Time */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Shift End Time</Label>
              <Input type='time' {...register('shiftEndTime')} />
              {errors.shiftEndTime && <p className='text-sm text-red-500'>{errors.shiftEndTime.message}</p>}
            </div>

            {/* Shift Start Date */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Shift Start Date</Label>
              <Input type='date' {...register('shiftStartDate')} />
              {errors.shiftStartDate && <p className='text-sm text-red-500'>{errors.shiftStartDate.message}</p>}
            </div>


            {/* Shift End Date */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Shift End Date</Label>
              <Input type='date' {...register('shiftEndDate')} />
              {errors.shiftEndDate && <p className='text-sm text-red-500'>{errors.shiftEndDate.message}</p>}
            </div>


            {/* Shift */}

            <div className="w-full flex flex-col gap-y-2">
              <Controller control={control} name='shift' render={({ field }) => {
                return <>
                  <Label>Shift</Label>
                  <Select value={field.value || ''} onValueChange={(value) => { field.onChange(value) }}>
                    <SelectTrigger >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent className='z-[200]'>
                      <SelectItem value='Morning'>Morning</SelectItem>
                      <SelectItem value='Evening'>Evening</SelectItem>
                      <SelectItem value='Night'>Night</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              }} />
              {errors.shift && <p className='text-sm text-red-500'>{errors.shift.message}</p>}
            </div>


            {/* note */}

            <div className="w-full flex flex-col gap-y-2">
              <Label>Note</Label>
              <Input type='text' {...register('note')} />
            </div>

          </div>
        </ScrollArea>

        <div className="flex mt-5 mb-2 gap-x-2 px-2.5">
          <Button type='submit' variant='outline' onClick={() => reset()}>Reset</Button>
          <Button type='submit' className='flex-1'>{rosterDetails ? 'Update Roster' : 'Save Roster'} {isPending && <Loader className='h-4 w-4 animate-spin' />}</Button>
        </div>
      </form>
    </Dialog>
  )
}



export default AssignRosterForm