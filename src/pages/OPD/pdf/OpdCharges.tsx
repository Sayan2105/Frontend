import Backdrop from '@/components/backdrop';
import CustomTooltip from '@/components/customTooltip';
import { From, PdfFooter, PdfHeader, To, Totals } from '@/components/pdf';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import OpdApi from '@/services/opd-api';
import { PrintBillDetails } from '@/types/opd_section/opd';
import html2pdf from "html2pdf.js";
import { Printer, ReceiptIndianRupee } from 'lucide-react';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';


export interface BillPDFProps extends HTMLAttributes<HTMLDivElement> {
    bill: PrintBillDetails
    afterGenerate: () => void
}



const Template = ({ bill, afterGenerate }: BillPDFProps) => {

    const contentRef = useRef(null)

    const generate = () => {
        const options = {
            filename: `OPD-${bill.id}.pdf`,
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

    const headers = ['Charge Name', 'Category', `Total ${currencySymbol()}`]


    const subtotal = bill.charges.reduce((sum, charge) => sum + charge.total, 0)
    const total = bill.charges.reduce((sum, charge) => sum + charge.net_amount, 0)

    const taxPrice = bill.charges.reduce((acc, charge) => {
        return acc + ((charge.tax / 100) * charge.total);
    }, 0);

    const discountPrice = bill.charges.reduce((acc, charge) => {
        const taxAbblePrice = ((charge.tax / 100) * charge.total) + charge.total
        return acc + (charge.discount / 100) * taxAbblePrice;  // discount is applied on taxable price not on net amount
    }, 0);

    const tax = (taxPrice / subtotal) * 100

    const discount = (discountPrice / ((tax / subtotal) * 100 + subtotal)) * 100 // division is here to get net taxable amount because discount is applied on taxable price not on net amount


    useEffect(() => {
        generate()
    }, [])


    return (
        <Backdrop onClick={afterGenerate}>
            <div className="scale-75 lg:scale-100" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 border-b-2 border-dashed" ref={contentRef}>
                    {/* Header */}
                    <PdfHeader title="Invoice" id={bill.id} date={new Date().toLocaleDateString()} />

                    {/* Company and Client Info */}
                    <div className="grid grid-cols-2 gap-8">
                        <From />
                        <To id={bill.patientId} name={bill.patient.name} address={bill.patient.address} phone={bill.patient.phone} email={bill.patient.email} />
                    </div>

                    {/* Items Table */}

                    <div className="flex flex-col border border-gray-200 rounded-lg">
                        <div className="py-3 px-6 flex gap-2 items-center bg-gray-50 border-b border-gray-200">
                            <ReceiptIndianRupee className="w-5 h-5 text-red-500" />
                            <h3 className="flex text-lg font-semibold text-gray-900 items-center gap-2">
                               Charges
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
                                {bill.charges.map((charge, _i) => (
                                    <tr key={_i} className=" hover:bg-gray-50">
                                        <td className="p-6 text-gray-700"><span className='text-red-500'>● </span>{charge.chargeNames.name}</td>
                                        <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                            <span className="px-2 inline-block text-red-500 text-sm font-medium bg-red-100 rounded">
                                                {charge.chargeCategory.category}
                                            </span>
                                        </td>
                                        <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                            <span className="px-2 inline-block text-green-500 text-sm font-medium bg-green-100 rounded">
                                                {currencyFormat(charge.total)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}

                    <Totals subtotal={subtotal} discount={discount} tax={tax} total={total} />

                    {/* Footer */}

                    <PdfFooter paymentInfo={'offline'} notes={'Have a nice day'} />

                </div>
            </div>

        </Backdrop>
    )
}



interface Props {
    opdId: string,
    onPending: (e: boolean) => void
}


const PrintOpdBill = ({ opdId, onPending }: Props) => {

    const [current, setCurrent] = useState<PrintBillDetails | null>(null)

    const handleBill = async () => {
        try {
            onPending(true)
            const data = await OpdApi.getOpdBillInfo(opdId)
            if (!data) return toast.error('No data found')
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { onPending(false) }
    };

    return (
        <>
            <CustomTooltip message='Print Bill'>
                <Printer className='cursor-pointer text-gray-600 dark:text-neutral-300 w-5 h-5 active:scale-95' onClick={handleBill} />
            </CustomTooltip>

            {current && <Template bill={current!} afterGenerate={() => setCurrent(null)} />}
        </>
    );
};




export default PrintOpdBill;