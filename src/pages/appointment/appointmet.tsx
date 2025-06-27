import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'
import ErrorFallback from '@/components/errorFallback'
import InlineLoader from '@/components/inline-loader'
import LoaderModel from '@/components/loader'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserImage from '@/components/user-image'
import { appointmentFormSchema } from '@/formSchemas/AppointmentFormSchema'
import { page_limit } from '@/globalData'
import { currencySymbol } from '@/helpers/currencySymbol'
import { useConfirmation } from '@/hooks/useConfirmation'
import { cn, currencyFormat } from '@/lib/utils'
import { AppointmentApi } from '@/services/appointment-api'
import { Appointment } from '@/types/appointment/appointment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Ban, ListMinus, Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'
import AppointmentDetailsModel from './appointment-info'
import AddAppointment from './create-appointment'
import AppointmentListPDF from './print/AppointmnetListPDF'




const AdminAppointment = () => {

    const queryClient = useQueryClient()

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()

    // params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    // Model States
    const [form, setForm] = useState(false)
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

    const { mutate: createAppointment, isPending: isPendingCreateAppointment } = useMutation({
        mutationFn: (formData: z.infer<typeof appointmentFormSchema>) => AppointmentApi.createAppointment(formData),
        onSuccess: ({ appointment, message }: { appointment: Appointment['data'][0], message: string }) => {
            queryClient.setQueryData(['appointments', page, search], (oldData: Appointment) => {
                return { ...oldData, data: [appointment, ...oldData.data] }
            })
            toast.success(message)
            setForm(false)
        }, onError: (err: AxiosError<{ message: string }>) => {
            toast.error(err.response?.data.message!)
        }
    })

    const { mutate: updateAppointment } = useMutation({
        mutationFn: (formData: z.infer<typeof appointmentFormSchema>) => AppointmentApi.updateAppointment(AID!, formData),
        onSuccess: ({ appointment, message }: { appointment: Appointment['data'][0], message: string }) => {
            queryClient.setQueryData(['appointments', page, search], (oldData: Appointment) => {
                const oldDataMap = new Map(
                    oldData.data.map(item => [item.id, item])
                )
                oldDataMap.set(AID!, appointment)
                return { ...oldData, data: [...oldDataMap.values()] }
            });
            toast.success(message)
            setForm(false)
            setAID(null)
        }, onError: (err: AxiosError<{ message: string }>) => {
            toast.error(err.response?.data.message!)
        }
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


    const printAppointment = async (id: string) => {
        window.open(`${import.meta.env.VITE_APP_API_URL}/api/appointment/print/${id}`);
    }


    const handleSubmit = async (formData: z.infer<typeof appointmentFormSchema>) => {
        AID ? updateAppointment(formData) : createAppointment(formData)
    }


    if (LoadingAppointmentDetails) return <LoaderModel />

    return (

        <>
            <div className='flex flex-col px-2.5 gap-2 h-full w-full flex-1'>

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
                        <AppointmentListPDF appointments={Appointments?.['data']!} />
                    </div>
                </div>

                {isLoading ?
                    <><InlineLoader /></>
                    :
                    isError ?
                        <ErrorFallback error={error!} />
                        :
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
                                                        onEdit={async () => { setAID(appointment.id), setForm(true) }}
                                                        incluePrint={{
                                                            include: true,
                                                            print: () => printAppointment(appointment.id)
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




            {/* appointment form model */}
            {
                form && <AddAppointment
                    Submit={handleSubmit}
                    isPending={isPendingCreateAppointment}
                    defaultValues={AppointmentDetails!}
                    onClick={() => { setAID(null), setForm(false) }}
                />
            }


            {/* Appointment details model */}

            {(AID && !form) && <AppointmentDetailsModel
                appointmentDetails={AppointmentDetails!}
                onClick={() => setAID(null)}
            />}


            {/* Alert Model */}
            {confirmationProps.isOpen && <AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => confirmationProps.onConfirm()}
            />}

        </>

    )
}

export default AdminAppointment


// NOTE : DATA IS REFRESHED AFTER 5 SECONDS MEANS CACHE IS CLEARED