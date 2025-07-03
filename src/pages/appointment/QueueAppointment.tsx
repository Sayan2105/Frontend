import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'
import ProtectedTable from '@/components/protected-table'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserImage from '@/components/user-image'
import { page_limit } from '@/globalData'
import { AppointmentApi } from '@/services/appointment-api'
import { Appointment } from '@/types/appointment/appointment'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'





const QueueAppointment = () => {

    // query params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    // api states
    const [appointments, setAppointments] = useState<Appointment>({ data: [], total_pages: 1 })
    const router = useNavigate()

    // onchange it updates the appointment

    const onUpdateStatus = async (id: string, status: string) => {
        try {

            const data = await AppointmentApi.updateStatus(id, status)
            toast.success(data.message)
            return router('..')

        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onSearch = useDebouncedCallback(async (value: string) => {
        value ? (setSearch(value)) : (setSearch(null))
        setPage(1) // always should execute
    }, 400)


    useEffect(() => {
        try {
            (async function () {
                const data = await AppointmentApi.getAppointments({ page, limit: page_limit, status: 'pending', search: search! })
                setAppointments(data)
            })() //IIFE

        } catch ({ message }: any) {
            toast.error(message)
        }
    }, [page, search])

    return (
        <div className="px-2 5">
            <div className='flex flex-col py-3 gap-y-3 '>
                <h1 className='text-xl text-gray-900 dark:text-white font-semibold'>Queue Appointments</h1>
                <Separator />
                <div className='flex gap-x-2 w-[180px]'>
                    <Input type='text' height='10px' placeholder='search' defaultValue={search!} onChange={(e) => { onSearch(e.target.value) }} />
                </div>
            </div>

            <Separator />

            <div className="flex flex-col mb-16 min-h-[75vh] mt-5">
                <div className="flex-1">
                    <ProtectedTable module='Appointment Status' renderTable={(__, canUpdate, _) => (
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
                                    <TableHead>Source</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>

                                {appointments.data.map((appointment, index) => {
                                    return <TableRow key={index}>
                                        <TableCell className="font-medium">{appointment.id}</TableCell>
                                        <TableCell >
                                            <UserImage url={appointment.patient.image} name={appointment.patient.name} gender={appointment.patient.gender} />
                                        </TableCell>
                                        <TableCell>{appointment.appointment_date}</TableCell>
                                        <TableCell>{appointment.shift}</TableCell>
                                        <TableCell>{appointment.patient.phone}</TableCell>
                                        <TableCell>{appointment.patient.gender}</TableCell>
                                        <TableCell>
                                            <UserImage url={appointment.doctor.image} name={appointment.doctor.name} gender={appointment.doctor.gender} />
                                        </TableCell>
                                        <TableCell>Online</TableCell>
                                        <TableCell>
                                            {canUpdate ? (
                                                <Select onValueChange={(value) => { onUpdateStatus(appointment.id, value) }}>
                                                    <SelectTrigger className={buttonVariants({
                                                        variant: 'outline',
                                                        size: 'sm',
                                                        className: 'bg-yellow-500 '
                                                    })}>
                                                        <SelectValue placeholder={appointment.status} />
                                                    </SelectTrigger>

                                                    <SelectContent className='z-[200]'>
                                                        <SelectItem value="Approved">Approved</SelectItem>
                                                        <SelectItem value="Cancelled">Cancel</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <div className='py-1 px-2.5 rounded-lg text-center bg-yellow-500 text-white'>
                                                    <span>{appointment.status}</span>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                })}

                            </TableBody>
                        </Table>
                    )} />
                    <EmptyList length={appointments.data.length} message='No queue appointments found' />
                </div>

                <section>
                    <CustomPagination
                        total_pages={appointments?.total_pages}
                        currentPage={+page}
                        previous={(p) => setPage(p)}
                        goTo={(p) => setPage(p)}
                        next={(p) => setPage(p)}
                    />
                </section>
            </div>
        </div>
    )
}

export default QueueAppointment