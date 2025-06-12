import Backdrop from "@/components/backdrop"
import CustomTooltip from "@/components/customTooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { Appointment } from "@/types/appointment/appointment"

import { Printer } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useReactToPrint } from "react-to-print"


interface Documents {
    Appointments: Appointment['data']
    afterPrint: (b: boolean) => void
}


const Documents = ({ Appointments, afterPrint }: Documents) => {

    const contentRef = useRef(null)
    const Print = useReactToPrint({
        contentRef,
        onAfterPrint() {
            afterPrint(false)
        },
    })

    const headers = ['Appointment No.', 'Patient', 'Date', 'Doctor', `Fees ${currencySymbol()}`, 'Discount %', `Net Amount ${currencySymbol()}`, 'Status']


    useEffect(() => {
        Print()
    }, [])

    return (
        <Backdrop onClick={() => afterPrint(false)}>
            <div className="scale-50 sm:scale-75 lg:scale-100">
                <div className="p-6 flex flex-col gap-5 max-w-4xl bg-white dark:bg-[#1e1e1e]" ref={contentRef}>
                    <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-white">Appointment</h1>
                    <Table>
                        <TableHeader className="bg-white">
                            <TableRow>
                                {headers.map((head, i) => (
                                    <TableHead key={i}>{head}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Appointments.map((appointment, index) => {
                                return <TableRow key={index}>
                                    <TableCell className="font-semibold">{appointment.id}</TableCell>
                                    <TableCell className="py-3">{appointment.patient.name}</TableCell>
                                    <TableCell className="py-3">{appointment.appointment_date}</TableCell>
                                    <TableCell className="py-3">{appointment.doctor.name}</TableCell>
                                    <TableCell className="py-3">{currencyFormat(appointment.fees)}</TableCell>
                                    <TableCell className="py-3">{appointment.discount}%</TableCell>
                                    <TableCell className="py-3">{currencyFormat(appointment.net_amount)}</TableCell>
                                    <TableCell className="py-3">{appointment.status}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Backdrop>
    )
}




const AppointmentListPDF = ({ appointments }: { appointments: Appointment['data'] }) => {

    const [open, setOpen] = useState(false);

    const handleOpenNewTab = async () => {
        if (appointments.length < 1) return toast.error('Empty list')
        setOpen(true)
    }


    return (
        <>
            <CustomTooltip message='Print Appointments'>
                <Printer className='cursor-pointer text-gray-600 dark:text-neutral-200 active:scale-95' onClick={handleOpenNewTab} />
            </CustomTooltip>

            {open && <Documents afterPrint={setOpen} Appointments={appointments} />}
        </>
    )
}



export default AppointmentListPDF