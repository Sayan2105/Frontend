
import Backdrop from "@/components/backdrop"
import CustomTooltip from "@/components/customTooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { medicinePurchases } from "@/types/opd_section/purchaseMedicine"
import { Printer } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useReactToPrint } from "react-to-print"


interface DocumentsProps {
    purchases: medicinePurchases['data']
    afterPrint: (b: boolean) => void
}


const Documents = ({ purchases, afterPrint }: DocumentsProps) => {

    const contentRef = useRef(null)
    const Print = useReactToPrint({
        contentRef,
        documentTitle: 'Purchase List',
        onAfterPrint() {
            afterPrint(false)
        },
    })

    const headers = ['Purchase No.', 'Date', 'Medicine Name', 'Expiry Date', 'Supplier Name', `Purchase Price ${currencySymbol()}`, 'Qty', `Total ${currencySymbol()}`]

    useEffect(() => {
        Print()
    }, [])

    return (
        <Backdrop onClick={() => afterPrint(false)}>
            <div className="scale-50 sm:scale-75 lg:scale-100">
                <div className="p-6 flex flex-col gap-5 max-w-4xl bg-white dark:bg-[#1e1e1e]" ref={contentRef}>
                    <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-white">Medicine Purchases</h1>
                    <Table>
                        <TableHeader className="bg-white">
                            <TableRow>
                                {headers.map((head, i) => (
                                    <TableHead key={i}>{head}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {purchases.map((p) => {
                                return <TableRow key={p.id}>
                                    <TableCell className="font-semibold">{p.id}</TableCell>
                                    <TableCell className="py-3">{p.purchase_date}</TableCell>
                                    <TableCell className="py-3">{p.medicine.name}</TableCell>
                                    <TableCell className="py-3">{p.expiry_date}</TableCell>
                                    <TableCell className="py-3">{p.supplier_name}</TableCell>
                                    <TableCell className="py-3">{currencyFormat(p.purchase_price)}</TableCell>
                                    <TableCell className="py-3">{p.quantity}</TableCell>
                                    <TableCell className="py-3">{currencyFormat(p.amount)}</TableCell>
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
    purchases: medicinePurchases['data']
}


const PrintMedicinePurchases = ({ purchases }: Props) => {

    const [open, setOpen] = useState(false);

    const handleOpen = async () => {
        if (purchases.length < 1) return toast.error('Empty list')
        setOpen(true)
    }



    return (
        <>
            <CustomTooltip message='Print List'>
                <Printer className='cursor-pointer text-gray-600 dark:text-gray-400 active:scale-95' onClick={handleOpen} />
            </CustomTooltip>

            {open && <Documents afterPrint={setOpen} purchases={purchases} />}
        </>
    )
}



export default PrintMedicinePurchases