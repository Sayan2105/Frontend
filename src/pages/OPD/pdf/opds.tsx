import Backdrop from "@/components/backdrop"
import CustomTooltip from "@/components/customTooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OPDs } from "@/types/opd_section/opd"
import { Printer } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useReactToPrint } from "react-to-print"

interface DocumentProps {
    opds: OPDs['data']
    afterPrint: (b: boolean) => void
}

const Document = ({ opds, afterPrint }: DocumentProps) => {

    const contentRef = useRef(null)
    const Print = useReactToPrint({
        contentRef,
        documentTitle: 'OPD List',
        onAfterPrint() {
            afterPrint(false)
        },
    })
    const headers = ['OPD No.', 'Patient Name', 'Appointment Date', 'Consultant', 'Reference', 'Symptom Type', 'Previous Isuue']


    useEffect(() => {
        Print()
    }, [])


    return (
        <Backdrop onClick={() => afterPrint(false)}>
            <div className="scale-50 sm:scale-75 lg:scale-100">
                <div className="p-6 flex flex-col gap-5 max-w-4xl bg-white dark:bg-[#1e1e1e]" ref={contentRef}>
                    <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-white">OPD LIST</h1>
                    <Table>
                        <TableHeader className="bg-white">
                            <TableRow>
                                {headers.map((head, i) => (
                                    <TableHead key={i}>{head}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {opds.map((opd) => {
                                return <TableRow key={opd.id}>
                                    <TableCell className="font-semibold">{opd.id}</TableCell>
                                    <TableCell className="py-3">{opd.patient.name}</TableCell>
                                    <TableCell className="py-3">{opd.appointment.appointment_date}</TableCell>
                                    <TableCell className="py-3">{opd.doctor.name}</TableCell>
                                    <TableCell className="py-3">{opd.appointment.reference}</TableCell>
                                    <TableCell className="py-3">{opd.appointment.symptom_type}</TableCell>
                                    <TableCell className="py-3">{opd.appointment.previous_medical_issue}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Backdrop>
    )
}




const OpdsPdf = ({ opds }: { opds: OPDs['data'] }) => {


    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        if (opds.length < 1) return toast.error('Empty list')
        setOpen(true)
    }


    return (
        <>
            <CustomTooltip message='Print Bill'>
                <Printer className='cursor-pointer text-gray-600 dark:text-gray-300 w-5 h-5 active:scale-95' onClick={handleOpen} />
            </CustomTooltip>

            {open && <Document afterPrint={setOpen} opds={opds} />}
        </>
    )
}



export default OpdsPdf