import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import CustomTooltip from '@/components/customTooltip'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserImage from '@/components/user-image'
import { AssignRosterSchema } from '@/formSchemas/assignRosterFormSchema'
import useOpdRoster from '@/hooks/useRoster'
import { RosterDataType } from '@/types/dutyRoster/DutyRoster'
import { ListFilter, Plus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'
import AssignRosterForm from './form'






const RosterReport = () => {


    // Query params
    const [searchBy, setSearchBy] = useState<'date' | 'period' | 'credentials'>('credentials')
    const [form, setForm] = useState(false)
    const [current, setCurrent] = useState<RosterDataType | null>(null)

    const { createRoster, isPendingCreateRoster, updateRoster, isPendingUpdateRoster, rosters, credential, setCredential, date, setDate, page, setPage, period, setPeriod, onDelete, confirmationProps } = useOpdRoster({ isRostersPage: true, afterSuccess: setForm })


    // search functionality

    const onSearch = useDebouncedCallback(async (search: { credential?: string, startDate?: string, endDate?: string, date?: string }) => {
        try {
            search.credential ? (setCredential(search.credential)) : (setCredential(null));
            search.date ? (setDate(search.date)) : (setDate(null));
            search.startDate && setPeriod({ ...period, startDate: search.startDate })
            search.endDate && setPeriod({ ...period, endDate: search.endDate });
            (!search.startDate && !search.endDate) && setPeriod({ startDate: '', endDate: '' }) // after clearing any field this will reset (coz we are passing only one field from input which means second one will be alwasys false)

            setPage(1) // always
        } catch ({ message }: any) {
            toast.error(message)
        }
    }, 400)


    const onSubmit = (formData: z.infer<typeof AssignRosterSchema>) => {
        if (current) {
            updateRoster({ id: current.id, formData })
        } else {
            createRoster(formData)
        }
    }


    return (
        <div className='my-2 flex flex-col px-2.5'>

            {/* top bar */}
            <div className='flex py-3 flex-row gap-y-2 items-center justify-between'>
                <h1 className='font-semibold tracking-tight'>Duty Roster</h1>

                <div className='flex gap-x-2 overflow-x-auto'>
                    <PermissionProtectedAction action='create' module='Duty Roster'>
                        <Button size='sm' onClick={() => setForm(true)}>
                            <Plus /> Add Roster
                        </Button>
                    </PermissionProtectedAction>
                </div>

            </div>


            <Separator />

            {/* search section */}

            <div className='py-5 flex items-center gap-2 overflow-x-auto'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <CustomTooltip message="Search by">
                            <div className='p-2 bg-rose-100 dark:bg-rose-500/10 rounded-full'>
                                <ListFilter className='w-5 h-5 text-rose-600' />
                            </div>
                        </CustomTooltip>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem onSelect={() => setSearchBy('credentials')}>Credentials</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSearchBy('date')}>Date</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSearchBy('period')}>Period</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className='flex items-center gap-2 w-72 sm:w-64'>
                    {searchBy === 'date' && <Input type='date' onChange={(e) => { onSearch({ date: e.target.value }) }} defaultValue={date!} />}
                    {searchBy === 'period' &&
                        <form className='flex flex-row space-x-2'>
                            <Input type='date' onChange={(e) => {
                                onSearch({ startDate: e.target.value })
                            }} />

                            <Input type='date' onChange={(e) => {
                                onSearch({ endDate: e.target.value })
                            }} />
                        </form>
                    }
                    {searchBy === 'credentials' && <Input type='text' placeholder='staff id , name' onChange={(e) => onSearch({ credential: e.target.value })} defaultValue={credential!} />}
                </div>
            </div>


            <Separator />


            {/* paginated Table */}

            <div className="flex flex-col pb-16 pt-5 gap-y-10 min-h-[70vh]">
                <div className="flex-1">
                    <ProtectedTable
                        module='Duty Roster' renderTable={(show, canUpdate, canDelete) => (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Staff ID</TableHead>
                                        <TableHead>Staff</TableHead>
                                        <TableHead>Duty At</TableHead>
                                        <TableHead>Start Time</TableHead>
                                        <TableHead>End Time</TableHead>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>End Date</TableHead>
                                        <TableHead>Note</TableHead>
                                        {show && <TableHead>Action</TableHead>}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {rosters?.data.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Link className='text-blue-500 hover:underline font-semibold' to={`/staff/${item.staffId}`}>{item.staffId}</Link>
                                            </TableCell>
                                            <TableCell>
                                                <UserImage url={item.staff.image} name={item.staff.name} gender={item.staff.gender} />
                                            </TableCell>
                                            <TableCell>{item.dutyAt}</TableCell>
                                            <TableCell>{item.shiftStartTime}</TableCell>
                                            <TableCell>{item.shiftEndTime}</TableCell>
                                            <TableCell>
                                                <div className="dark:bg-yellow-900/20 bg-violet-100 dark:text-violet-600 text-violet-600 py-1 px-2 rounded">
                                                    {new Date(item.shiftStartDate).toLocaleDateString('en-US', { weekday: 'short' })}{", "}
                                                    {new Date(item.shiftStartDate).toLocaleDateString('en-US', { day: 'numeric' })}{", "}
                                                    {new Date(item.shiftStartDate).toLocaleDateString('en-US', { month: 'short' })}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="dark:bg-violet-900/20 bg-violet-100 dark:text-violet-600 text-violet-600 py-1 px-2 rounded">
                                                    {new Date(item.shiftEndDate).toLocaleDateString('en-US', { weekday: 'short' })}{", "}
                                                    {new Date(item.shiftEndDate).toLocaleDateString('en-US', { day: 'numeric' })}{", "}
                                                    {new Date(item.shiftEndDate).toLocaleDateString('en-US', { month: 'short' })}
                                                </div>
                                            </TableCell>
                                            <TableCell>{item.note}</TableCell>
                                            <TableActions
                                                show={show}
                                                canUpdate={canUpdate}
                                                canDelete={canDelete}
                                                onEdit={() => { setCurrent(item); setForm(true) }}
                                                onDelete={() => onDelete(item.id)}
                                            />
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    />

                    {/* error on emply list */}
                    <EmptyList length={rosters?.data?.length!} message="No Roster Found" />
                </div>

                {/* pagination */}
                <section>
                    <CustomPagination
                        total_pages={rosters?.total_pages!}
                        currentPage={page}
                        previous={setPage}
                        goTo={setPage}
                        next={setPage}
                    />
                </section>
            </div>


            {/* roster form model */}

            {
                (form) && <AssignRosterForm
                    Submit={onSubmit}
                    rosterDetails={current!}
                    isPending={isPendingCreateRoster || isPendingUpdateRoster}
                    onClick={() => {
                        setForm(false)
                        setCurrent(null)
                    }}
                />
            }


            {/* alert model */}

            {
                confirmationProps.isOpen && <AlertModel
                    cancel={() => confirmationProps.onCancel()}
                    continue={() => confirmationProps.onConfirm()}
                />
            }


        </div >
    )
}

export default RosterReport