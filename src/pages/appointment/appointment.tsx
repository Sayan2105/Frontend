import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'
import ErrorFallback from '@/components/errorFallback'
import InlineLoader from '@/components/inline-loader'
import LoaderModel from '@/components/loader'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserImage from '@/components/user-image'
import { page_limit } from '@/globalData'
import { currencySymbol } from '@/helpers/currencySymbol'
import { formatTime } from '@/helpers/formatTime'
import { useConfirmation } from '@/hooks/useConfirmation'
import { cn, currencyFormat } from '@/lib/utils'
import { AppointmentApi } from '@/services/appointment-api'
import { Appointment, AppointmentData } from '@/types/appointment/appointment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Ban, ListMinus, Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import AppointmentDetailsModel from './appointment-info'
import GenerateAppointmentPdf from './pdf-template/template'




const AdminAppointment = () => {

    const queryClient = useQueryClient()
    const router = useNavigate()

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()
    const [padfData, setPdfData] = useState<AppointmentData | null>(null)

    // params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    const [AID, setAID] = useState<string | null>(null)


    const { data: Appointments, isError, isLoading, error } = useQuery<Appointment>({
        queryKey: ['appointments', page, search],
        queryFn: () => AppointmentApi.getAppointments({ page, limit: page_limit, search: search! }),
    })

    const { mutate: deleteAppointment } = useMutation({
        mutationFn: (id: string) => AppointmentApi.deleteAppointment(id),
        onSuccess: ({ id, message }: { id: string, message: string }) => {
            queryClient.setQueryData(['appointments', page, search], (oldData: Appointment) => {
                return { ...oldData, data: oldData.data.filter((appointment) => appointment.id !== id) }
            })
            toast.success(message)
        }, onError: ({ message }: { message: string }) => {
            toast.error(message)
        }
    })

    const { data: AppointmentDetails, isLoading: LoadingAppointmentDetails } = useQuery({
        queryKey: ['appointment', AID],
        queryFn: () => AppointmentApi.getAppointmentById(AID!),
        enabled: !!AID,
    })



    const onSearch = useDebouncedCallback(async (value: string) => {
        value ? (setSearch(value)) : (setSearch(null))
        setPage(1)
    }, 400)


    const onDelete = async (id: string) => {
        const isConfirm = await confirm()
        if (!isConfirm) return null
        deleteAppointment(id)
    }



    if (LoadingAppointmentDetails) return <LoaderModel />

    return (

        <>
            <div className='flex flex-col px-2.5 gap-2 flex-1'>

                {/* top bar */}
                <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
                    <h1 className='font-semibold tracking-tight'>Appointments</h1>
                    <div className='flex gap-x-2 overflow-x-auto'>

                        <PermissionProtectedAction action='create' module='Appointment'>
                            <Link to={'available-doctors'} className={buttonVariants({
                                variant: 'default', size: 'sm', className: 'flex gap-x-1'
                            })}>
                                <Plus /> Appointment
                            </Link>
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
                </div>

                {isLoading ?
                    <><InlineLoader /></>
                    :
                    isError ?
                        <ErrorFallback error={error!} />
                        :
                        <div className="flex flex-col gap-y-5 h-full pb-20 mt-5 ">
                            <div className="flex-1">
                                <ProtectedTable module='Appointment' renderTable={(show, canUpdate, canDelete) => (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Appointment No</TableHead>
                                                <TableHead>Patient</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Time</TableHead>
                                                <TableHead>Consultant</TableHead>
                                                <TableHead>Fees {currencySymbol()}</TableHead>
                                                <TableHead>Discount%</TableHead>
                                                <TableHead>Net Amount {currencySymbol()}</TableHead>
                                                <TableHead>Action</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>


                                        <TableBody>
                                            {Appointments?.data?.map((appointment) => {
                                                return <TableRow key={appointment.id}>
                                                    <TableCell className="font-semibold cursor-pointer text-blue-500 hover:text-blue-400" onClick={async () => {
                                                        setAID(appointment.id)
                                                    }}>
                                                        {appointment.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        <UserImage url={appointment.patient.image} name={appointment.patient.name} gender={appointment.patient.gender} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="dark:bg-yellow-900/20 bg-yellow-100 dark:text-yellow-600 text-yellow-600 py-1 px-2 rounded">
                                                            {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short' })}{", "}
                                                            {new Date(appointment.date).toLocaleDateString('en-US', { day: 'numeric' })}{", "}
                                                            {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                                                        </div>
                                                    </TableCell>


                                                    <TableCell>
                                                        <div className="bg-green-100 dark:bg-green-900/20 dark:text-green-600 text-green-600 py-1 px-2 rounded">
                                                            {formatTime(appointment.time)}
                                                        </div>
                                                    </TableCell>
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
                                                        onEdit={async () => { router(`available-doctors/book-appointment/${appointment.rosterId}?appointmentId=${appointment.id}`) }}
                                                        incluePrint={{
                                                            include: true,
                                                            print: () => { setPdfData(appointment) }
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
                                <EmptyList length={Appointments?.data?.length!} message='No data found' />
                            </div>

                            {/* Pagination */}

                            <CustomPagination
                                total_pages={Appointments?.total_pages!}
                                currentPage={+page}
                                previous={(p) => setPage(p)}
                                goTo={(p) => setPage(p)}
                                next={(p) => setPage(p)}
                            />
                        </div>

                }
            </div>


            {/* Appointment details model */}

            {AID && <AppointmentDetailsModel
                appointmentDetails={AppointmentDetails!}
                onClick={() => setAID(null)}
            />}


            {/* Alert Model */}
            {confirmationProps.isOpen && <AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => confirmationProps.onConfirm()}
            />}


            {padfData && <GenerateAppointmentPdf afterGenerate={() => { setPdfData(null) }} Info={padfData!} />}

        </>

    )
}

export default AdminAppointment


// NOTE : DATA IS REFRESHED AFTER 5 SECONDS MEANS CACHE IS CLEARED