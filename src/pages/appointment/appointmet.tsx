import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'
import LoaderModel from '@/components/loader'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { appointmentFormSchema } from '@/formSchemas/AppointmentFormSchema'
import { page_limit } from '@/globalData'
import { currencySymbol } from '@/helpers/currencySymbol'
import { useConfirmation } from '@/hooks/useConfirmation'
import { cn, currencyFormat } from '@/lib/utils'
import { AppointmentApi } from '@/services/appointment-api'
import { Appointment, AppointmentData, AppointmentDetails } from '@/types/appointment/appointment'
import { Ban, ListMinus, Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'
import AddAppointment from './create-appointment'
import AppointmentDetailsModel from './appointment-info'
import AppointmentListPDF from './print/AppointmnetListPDF'
import PrintAppointment from './print/print-appointment'
import UserImage from '@/components/user-image'




const AdminAppointment = () => {

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()

    // params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    // Pending states
    const [isPending, setPending] = useState<boolean>(false)

    // Model States
    const [form, setForm] = useState(false)


    // API States
    const [Appointments, setAppointments] = useState<Appointment>({ data: [], total_pages: 0 })
    const [AppointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | undefined>(undefined)
    const [current, setCurrent] = useState<AppointmentData | null>(null)

    //fetching appointments list
    const getAppointments = async () => {
        try {
            const data = await AppointmentApi.getAppointments({
                page,
                limit: page_limit,
                search: search!
            })
            setAppointments(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // fetching appointment details

    const getAppointmentById = async (id: string) => {
        try {
            setPending(true)
            const data = await AppointmentApi.getAppointmentById(id)
            setAppointmentDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }



    const onSearch = useDebouncedCallback(async (value: string) => {
        value ? (setSearch(value)) : (setSearch(null))
        setPage(1) // always should execute
    }, 400)


    const onDelete = async (id: string) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await AppointmentApi.deleteAppointment(id)
            toast.success(data.message)
            getAppointments()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // performing only insert
    const handleSubmit = async (formData: z.infer<typeof appointmentFormSchema>) => {
        try {
            let data; setPending(true)
            AppointmentDetails ? (
                data = await AppointmentApi.updateAppointment(AppointmentDetails.id, formData),
                setAppointmentDetails(undefined)
            )
                : (data = await AppointmentApi.createAppointment(formData))
            toast.success(data.message)
            getAppointments()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    useEffect(() => {
        getAppointments();
    }, [page, search])


    return (

        <>
            <div className='my-2 flex flex-col px-2.5'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
                    <h1 className='font-semibold tracking-tight'>Appointments</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        <PermissionProtectedAction action='create' module='Appointment'>
                            <Button type='button' size={'sm'}
                                onClick={() => { setForm(true) }} >
                                <Plus /> Appointment
                            </Button>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Appointment'>
                            <Link to={'queue'} className={buttonVariants({
                                variant: 'default', size: 'sm', className: 'flex gap-x-1'
                            })}>
                                <ListMinus /> Queue </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Appointment'>
                            <Link to={'cancelled'} className={buttonVariants({
                                variant: 'destructive', size: 'sm', className: 'flex gap-x-1'
                            })}><Ban /> Cancelled </Link>
                        </PermissionProtectedAction>

                    </div>
                </div>


                {/* search bar */}

                <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>

                    <div className='flex gap-x-2'>
                        <Input type='text' height='10px' placeholder='search' defaultValue={search!} onChange={(e) => { onSearch(e.target.value) }} />
                    </div>

                    <div className='flex gap-x-2'>
                        {/* printing appointments list */}
                        <AppointmentListPDF appointments={Appointments['data']} />
                    </div>
                </div>

                <div className="flex flex-col gap-y-5 min-h-[75vh] mb-16 mt-5">
                    <div className="flex-1">
                        <ProtectedTable module='Appointment' renderTable={(show, canUpdate, canDelete) => (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Appointment No</TableHead>
                                        <TableHead>Patient Name</TableHead>
                                        <TableHead>Appointment Date</TableHead>
                                        <TableHead>Shift</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Doctor</TableHead>
                                        <TableHead>Fees {currencySymbol()}</TableHead>
                                        <TableHead>Discount%</TableHead>
                                        <TableHead>Net Amount {currencySymbol()}</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>


                                <TableBody>
                                    {Appointments.data.map((appointment) => {
                                        return <TableRow key={appointment.id}>
                                            <TableCell className="font-semibold cursor-pointer text-blue-500 hover:text-blue-400" onClick={async () => {
                                                await getAppointmentById(appointment.id)
                                            }}>
                                                {appointment.id}
                                            </TableCell>
                                            <TableCell>
                                                <UserImage url={appointment.patient.image} name={appointment.patient.name} gender={appointment.patient.gender} />
                                            </TableCell>
                                            <TableCell>{appointment.appointment_date}</TableCell>
                                            <TableCell>{appointment.shift}</TableCell>
                                            <TableCell>{appointment.patient.phone}</TableCell>
                                            <TableCell>{appointment.patient.gender}</TableCell>
                                            <TableCell>
                                                <UserImage url={appointment.doctor.image} name={appointment.doctor.name} gender={appointment.doctor.gender} />
                                            </TableCell>
                                            <TableCell>{currencyFormat(+appointment.fees)}</TableCell>
                                            <TableCell>{appointment.discount}%</TableCell>
                                            <TableCell>{currencyFormat(appointment.net_amount)}</TableCell>
                                            <TableActions
                                                show={show}
                                                canUpdate={canUpdate}
                                                canDelete={canDelete}
                                                onDelete={() => onDelete(appointment.id)}
                                                onEdit={async () => {
                                                    await getAppointmentById(appointment.id),
                                                        setForm(true)
                                                }}
                                                incluePrint={{
                                                    include: true,
                                                    print: () => setCurrent(appointment)
                                                }}
                                            />
                                            <TableCell>
                                                <span className={cn('text-white py-1 px-3 block rounded-md group-hover:hidden', appointment.status === 'Approved' ? 'bg-green-500' : appointment.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500')}>{appointment.status}</span>
                                            </TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        )} />

                        {/* if no data will be recive */}
                        <EmptyList length={Appointments.data.length} message='No data found' />
                    </div>

                    {/* Pagination */}

                    <CustomPagination
                        total_pages={Appointments?.total_pages}
                        currentPage={+page}
                        previous={(p) => setPage(p)}
                        goTo={(p) => setPage(p)}
                        next={(p) => setPage(p)}
                    />
                </div>


            </div>



            {/* appointment form model */}

            {
                form && <AddAppointment
                    Submit={handleSubmit}
                    isPending={isPending}
                    defaultValues={AppointmentDetails!}
                    onClick={() => { setForm(false), setAppointmentDetails(undefined) }}
                />
            }


            {/* Appointment details model */}

            {(AppointmentDetails && !form) && <AppointmentDetailsModel
                appointmentDetails={AppointmentDetails!}
                onClick={() => setAppointmentDetails(undefined)}
            />}


            {/* Alert Model */}
            {confirmationProps.isOpen && <AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => confirmationProps.onConfirm()}
            />}

            {/* Loader model */}
            {isPending && (<LoaderModel />)}

            {/* Print Appointment */}
            {current && <PrintAppointment Info={current!} afterPrint={() => setCurrent(null)} />}

        </>

    )
}

export default AdminAppointment