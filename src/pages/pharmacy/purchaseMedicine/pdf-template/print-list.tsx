
import Backdrop from "@/components/backdrop"
import CustomTooltip from "@/components/customTooltip"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { medicinePurchases } from "@/types/opd_section/purchaseMedicine"
import html2pdf from "html2pdf.js"
import { Printer, ReceiptText } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

interface DocumentsProps {
    purchases: medicinePurchases['data']
    afterGenerate: (b: boolean) => void
}


const Documents = ({ purchases, afterGenerate }: DocumentsProps) => {

    const contentRef = useRef(null)

    const generate = () => {
        const options = {
            filename: `invoice.pdf`,
            image: { type: "png", quality: 1 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: "in", format: "A4", orientation: "portrait" }
        };
        html2pdf()
            .from(contentRef.current!)
            .set(options)
            .outputPdf('blob')
            .then((pdfBlob: any) => {
                const url = URL.createObjectURL(pdfBlob);
                window.open(url);
                afterGenerate(false)
            });
    }

    const headers = ['Purchase No.', 'Date', 'Medicine Name', 'Supplier Name', `Purchase Price ${currencySymbol()}`, 'Qty']

    useEffect(() => {
        generate()
    }, [])

    return (
        <Backdrop onClick={() => afterGenerate(false)}>
            <div className="scale-50 sm:scale-75 lg:scale-100">
                <div className="p-6 flex flex-col gap-5 max-w-4xl bg-white" ref={contentRef}>
                    <div className="flex flex-col border border-gray-200 rounded-lg">
                        <div className="py-3 px-6 flex gap-2 items-center bg-gray-50 border-b border-gray-200">
                            <ReceiptText className="w-5 h-5 text-red-500" />
                            <h3 className="flex text-lg font-semibold text-gray-900 items-center gap-2">
                                Purchase List
                            </h3>
                        </div>
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    {headers.map((item, i) => (
                                        <th key={i} className="py-4 px-6 text-left font-semibold text-gray-700 uppercase">{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.map((p) => (
                                    <tr className=" hover:bg-gray-50">
                                        <td className="p-6 text-gray-700"><span className='text-red-500'>● </span>{p.id}</td>
                                        <td className="p-6 text-gray-700">{p.date}</td>
                                        <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                            <span className="px-2 inline-block text-red-500 text-sm font-medium bg-red-100 rounded">
                                                {p.medicine.name}
                                            </span>
                                        </td>
                                        <td className="p-6 text-gray-700">{p.supplier_name}</td>
                                        <td className="p-6 text-gray-700 font-mono">{currencyFormat(p.purchase_price)}</td>
                                        <td className="p-6 text-gray-700 font-mono">{p.quantity}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
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

            {open && <Documents afterGenerate={setOpen} purchases={purchases} />}
        </>
    )
}



export default PrintMedicinePurchases