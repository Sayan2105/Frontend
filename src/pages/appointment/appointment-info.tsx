import CardBox from '@/components/card-box'
import Dialog from '@/components/Dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatTime } from '@/helpers/formatTime'
import { cn, currencyFormat } from '@/lib/utils'
import { AppointmentDetails } from '@/types/appointment/appointment'
import { CalendarDays, Cross, PersonStanding } from 'lucide-react'
import { HTMLAttributes } from 'react'


interface AppointmentDetailsModelProps extends HTMLAttributes<HTMLDivElement> {
    appointmentDetails: AppointmentDetails
}


const AppointmentDetailsModel = ({ appointmentDetails, ...props }: AppointmentDetailsModelProps) => {


    return (
        <Dialog pageTitle='Appointment Details' {...props}>
            <ScrollArea className='relative pt-3 h-[60vh] w-full'>

                <div className="grid lg:grid-cols-2 gap-x-4 gap-y-8 px-2.5 pb-14">


                    {/* grid col-1 */}

                    <div className='gap-2 grid sm:grid-cols-2 lg:grid-cols-4 sm:col-span-full'>

                        {/* Appointment details */}

                        <div className="flex items-center gap-2 sm:col-span-2 mb-4">
                            <div className='p-3 bg-yellow-500 rounded-full'>
                                <CalendarDays className='w-10 h-10 text-white' />
                            </div>
                            <div className=''>
                                <p className='font-semibold text-lg text-gray-900 dark:text-white'>{new Date(appointmentDetails?.date).toISOString().split('T')[0]}</p>
                                <p className='text-sm text-gray-500'>Appointment Date</p>
                            </div>
                        </div>

                        <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                            <CardBox borderType='dashed' title="Appointment No." value={appointmentDetails?.id} />
                            <CardBox borderType='dashed' title="Status" value={
                                <span className={cn('text-green-600 rounded-md bg-green-600/15 w-fit px-2 py-0.5 font-semibold',
                                    { 'bg-red-500/15 text-red-500': appointmentDetails?.status === 'Cancelled', 'bg-yellow-500/15 text-yellow-500': appointmentDetails?.status === 'Pending' })}>
                                    {appointmentDetails?.status}
                                </span> as any
                            } />
                        </div>


                        <div className="col-span-full grid sm:grid-cols-3 gap-2">
                            <CardBox borderType='solid' title="Timing" value={formatTime(appointmentDetails?.time)} />
                            <CardBox borderType='solid' title="Priority" value={appointmentDetails?.appointment_priority} />
                            <CardBox borderType='solid' title="Description" value={appointmentDetails?.symptom_description} />
                            <CardBox borderType='solid' title="Reference" value={appointmentDetails?.reference} />
                            <CardBox borderType='solid' title="Previous Issue" value={appointmentDetails?.previous_medical_issue} />
                            <CardBox borderType='solid' title="Payment Mode" value={appointmentDetails?.payment_mode} />
                            <CardBox borderType='solid' title="Alternative Address" value={appointmentDetails?.alternative_address} />
                            <CardBox borderType='solid' title="Fees" value={currencyFormat(Number(appointmentDetails?.fees))} />
                            <CardBox borderType='solid' title="Discount" value={appointmentDetails?.discount} />
                            <CardBox borderType='solid' title="Net Amount" value={currencyFormat(appointmentDetails?.net_amount)} />
                        </div>

                    </div>




                    {/* grid col-2 */}

                    <div className='gap-2 grid sm:grid-cols-2'>

                        {/* patient details */}

                        <div className="flex items-center gap-2 col-span-full mb-4">
                            <div className='p-3 bg-green-500 rounded-full'>
                                <PersonStanding className='w-10 h-10 text-white' />
                            </div>
                            <div className=''>
                                <p className='font-semibold text-lg text-gray-900 dark:text-white'>{appointmentDetails?.patient.name}</p>
                                <p className='text-sm text-gray-500'>Patient</p>
                            </div>
                        </div>

                        <CardBox borderType='solid' title="Patient ID" value={appointmentDetails?.patientId} />
                        <CardBox borderType='solid' title="Age" value={appointmentDetails?.patient.age} />
                        <CardBox borderType='solid' title="Email" value={appointmentDetails?.patient.email} />
                        <CardBox borderType='solid' title="Phone" value={appointmentDetails?.patient.phone} />
                        <CardBox borderType='solid' title="Gender" value={appointmentDetails?.patient.gender} />
                        <CardBox borderType='solid' title="Blood Group" value={appointmentDetails?.patient.blood_group} />
                        <CardBox borderType='solid' title="Address" value={appointmentDetails?.patient.address} />

                    </div>



                    {/* grid col-3 */}

                    <div>
                        <div className='gap-2 grid sm:grid-cols-2'>

                            {/* Doctor details */}

                            <div className="flex items-center gap-2 col-span-full mb-4">
                                <div className='p-3 bg-red-500 rounded-full'>
                                    <Cross className='w-10 h-10 text-white' />
                                </div>
                                <div className=''>
                                    <p className='font-semibold text-lg text-gray-900 dark:text-white'>{appointmentDetails?.doctor.name}</p>
                                    <p className='text-sm text-gray-500 '>Doctor</p>
                                </div>
                            </div>

                            <CardBox borderType='solid' title="Doctor ID" value={appointmentDetails?.doctorId} />
                            <CardBox borderType='solid' title="Department" value={appointmentDetails?.doctor.department} />
                            <CardBox borderType='solid' title="specialist" value={appointmentDetails?.specialist.name} />
                            <CardBox borderType='solid' title="Gender" value={appointmentDetails?.doctor.gender} />
                            <CardBox borderType='solid' title="Phone" value={appointmentDetails?.doctor.phone} />
                        </div>
                    </div>
                </div>

                {/* <div className="h-14 bg-gradient-to-t from-white z-30 w-full absolute bottom-0" /> */}
            </ScrollArea>
        </Dialog>
    )
}

export default AppointmentDetailsModel