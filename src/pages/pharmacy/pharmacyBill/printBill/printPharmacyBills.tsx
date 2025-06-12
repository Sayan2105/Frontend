
import Backdrop from "@/components/backdrop"
import CustomTooltip from "@/components/customTooltip"
import { TableBody, Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencyFormat } from "@/lib/utils"
import { pharmacyBills } from "@/types/pharmacy/pharmacy"
import { Printer, } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useReactToPrint } from "react-to-print"


interface DocumentProps {
    PharmacyBills: pharmacyBills['data']
    afterPrint: (b: boolean) => void
}


const Document = ({ PharmacyBills, afterPrint }: DocumentProps) => {

    const contentRef = useRef(null)

    const Print = useReactToPrint({
        contentRef,
        documentTitle: 'Bills',
        onAfterPrint() {
            afterPrint(false)
        },
    })

    useEffect(() => {
        Print()
    }, [])


    const headers = ['Invoice No.', 'Date', 'OPD ID', 'Patient', 'Doctor', 'Discount %', 'Total']


    return (
        <Backdrop onClick={() => afterPrint(false)}>
            <div className="scale-50 sm:scale-75 lg:scale-100">
                <div className="p-6 flex flex-col gap-5 max-w-4xl bg-white dark:bg-[#1e1e1e]" ref={contentRef}>
                    <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-white">Pharmacy Bills</h1>
                    <Table>
                        <TableHeader className="bg-white">
                            <TableRow>
                                {headers.map((head, i) => (
                                    <TableHead key={i}>{head}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {PharmacyBills.map((bill) => {
                                return <TableRow key={bill.id}>
                                    <TableCell className="font-semibold">{bill.id}</TableCell>
                                    <TableCell className="py-3">{bill.date}</TableCell>
                                    <TableCell className="py-3">{bill.date}</TableCell>
                                    <TableCell className="py-3">{bill.opdId}</TableCell>
                                    <TableCell className="py-3">{bill.patient.name}</TableCell>
                                    <TableCell className="py-3">{bill.discount}%</TableCell>
                                    <TableCell className="py-3">{currencyFormat(bill.net_amount)}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Backdrop>
    )
}


interface Props {
    list: pharmacyBills['data']
}




const PrintPharmacyBills = ({ list }: Props) => {

    const [open, setOpen] = useState(false)

    const handlePrint = () => {
        if (list.length < 1) return toast.error('Empty list')
        setOpen(true)
    }


    return (
        <>
            <CustomTooltip message='Print List'>
                <Printer className='cursor-pointer text-gray-600 dark:text-gray-300 active:scale-95' onClick={handlePrint} />
            </CustomTooltip>

            {open && <Document afterPrint={setOpen} PharmacyBills={list} />}
        </>
    )
}



export default PrintPharmacyBills