import Backdrop from '@/components/backdrop';
import { From, PdfFooter, PdfHeader, Supplier, Totals } from '@/components/pdf';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import { medicinePurchaseDetails } from '@/types/opd_section/purchaseMedicine';
import html2pdf from "html2pdf.js";
import { ReceiptText } from 'lucide-react';
import { useEffect, useRef } from 'react';


interface Props {
    afterGenerate: () => void,
    Info: medicinePurchaseDetails
}


const GeneratePurchaseMedicineInvoice = ({ afterGenerate, Info }: Props) => {

    const contentRef = useRef(null);
    const generate = () => {
        const options = {
            filename: `invoice-${Info.id}.pdf`,
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
                afterGenerate()
            });
    }
    const headers = ['Medicine Name', 'Category', 'Batch No.', `Purchase Price ${currencySymbol()}`, 'Qty', `Total ${currencySymbol()}`]

    const taxedPrice = ((+Info.tax / 100) * Info.amount) + Info.amount
    const discountPrice = (+Info.discount / 100) * taxedPrice // cause discount is applied on taxable price not on net amount


    useEffect(() => {
        generate()
    }, [])


    return (
        <Backdrop onClick={afterGenerate}>
            <div className="scale-50 lg:scale-100" onClick={(e) => e.stopPropagation()}>

                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 border-b-2 border-dashed" ref={contentRef}>

                    <PdfHeader title="Invoice" id={Info.id} date={Info.date} />

                    <div className="grid grid-cols-2 gap-8">
                        <Supplier name={Info.supplier_name} />
                        <From />
                    </div>

                    {/* Table Items */}

                    <div className="flex flex-col border border-gray-200 rounded-lg">
                        <div className="py-3 px-6 flex gap-2 items-center bg-gray-50 border-b border-gray-200">
                            <ReceiptText className="w-5 h-5 text-red-500" />
                            <h3 className="flex text-lg font-semibold text-gray-900 items-center gap-2">
                                Invoice Details
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
                                <tr className=" hover:bg-gray-50">
                                    <td className="p-6 text-gray-700"><span className='text-red-500'>● </span>{Info.medicine.name}</td>
                                    <td className="p-6 text-gray-700">{Info.category.name}</td>
                                    <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                        <span className="px-2 inline-block text-red-500 text-sm font-medium bg-red-100 rounded">
                                            {Info.batch_no}
                                        </span>
                                    </td>
                                    <td className="p-6 text-gray-700 font-mono"> {currencyFormat(+Info.purchase_price)}</td>
                                    <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                        <span className="px-2 inline-block text-violet-500 text-sm font-medium bg-violet-100 rounded">
                                            {Info.quantity}
                                        </span>
                                    </td>
                                    <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                        <span className="px-2 inline-block text-yellow-500 text-sm font-medium bg-yellow-100 rounded">
                                            {currencyFormat(Info.amount)}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}

                    <Totals subtotal={Info.amount} discount={+Info.discount} discount_amount={discountPrice} tax={+Info.tax} total={Info.total_amount} />

                    <PdfFooter paymentInfo={Info.payment_mode} notes={'Have a nice day'} />

                </div>
            </div>

        </Backdrop>
    )
}



export default GeneratePurchaseMedicineInvoice
