import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'
import LoaderModel from '@/components/loader'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import Radio from '@/components/radio'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { page_limit } from '@/globalData'
import useDutyRoster from './handlers'
import { Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import AssignRosterForm from './formModel/form'
import UserImage from '@/components/user-image'






const RosterReport = () => {


    // Query params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [credential, setCredential] = useQueryState('credential')
    const [date, setDate] = useQueryState('date')
    const [period, setPeriod] = useState({ startDate: '', endDate: '' })
    const [searchBy, setSearchBy] = useState<'date' | 'period' | 'credentials'>('credentials')


    const { rosters, getRosters, current, setCurrent, form, setForm, handleSubmit, onDelete, confirmationProps, isPending } = useDutyRoster({ page, limit: page_limit, date: date!, period, credentials: credential! })



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






    useEffect(() => {
        getRosters()
    }, [page, period, date, credential])


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

            <div className='pt-2 pb-5 space-y-2'>

                <Label>Search by keyword</Label>

                <div className='flex items-center gap-2 w-72 sm:w-96'>
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


                {/* search by options */}

                <div className='flex gap-x-6 pt-2'>

                    <Radio text='Credentials' id='id' name='search' className={searchBy === 'credentials' ? 'bg-gray-600' : ''}
                        onClick={() => { setSearchBy('credentials') }}
                    />

                    <Radio text='Date' id='Date' name='search' className={searchBy === 'date' ? 'bg-gray-600' : ''}
                        onClick={() => { setSearchBy('date') }}
                    />

                    <Radio text='Period' id='period' name='search' className={searchBy === 'period' ? 'bg-gray-600' : ''}
                        onClick={() => { setSearchBy('period') }}
                    />

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
                                        <TableHead>Shift</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Start Time</TableHead>
                                        <TableHead>End Time</TableHead>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>End Date</TableHead>
                                        <TableHead>Note</TableHead>
                                        {show && <TableHead>Action</TableHead>}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {rosters.data.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Link className='text-blue-500 hover:underline font-semibold' to={`/staff/${item.staffId}`}>{item.staffId}</Link>
                                            </TableCell>
                                            <TableCell>
                                                <UserImage url={item.staff.image} name={item.staff.name} gender={item.staff.gender} />
                                            </TableCell>
                                            <TableCell>{item.shift}</TableCell>
                                            <TableCell>{item.staff.department}</TableCell>
                                            <TableCell>{item.shiftStartTime}</TableCell>
                                            <TableCell>{item.shiftEndTime}</TableCell>
                                            <TableCell>{item.shiftStartDate}</TableCell>
                                            <TableCell>{item.shiftEndDate}</TableCell>
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
                    <EmptyList length={rosters.data.length} message="No Roster Found" />
                </div>

                {/* pagination */}
                <section>
                    <CustomPagination
                        total_pages={rosters?.total_pages}
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
                    Submit={handleSubmit}
                    rosterDetails={current!}
                    isPending={isPending}
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

            {isPending && <LoaderModel />}


        </div >
    )
}

export default RosterReport