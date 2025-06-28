import Backdrop from '@/components/backdrop';
import { PdfFooter, PdfHeader } from '@/components/pdf';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import { paymentData } from '@/types/opd_section/payment';
import html2pdf from "html2pdf.js";
import { Banknote } from 'lucide-react';
import { HTMLAttributes, useEffect, useRef } from 'react';


export interface Props extends HTMLAttributes<HTMLDivElement> {
    payment: paymentData
    afterPrint: () => void
}




const PrintPayment = ({ payment, afterPrint }: Props) => {

    const contentRef = useRef(null)


    const headers = ['Description', `Amount ${currencySymbol()}`]

    const Print = () => {

        const options = {
            filename: "invoice.pdf",

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
            });
    }


    useEffect(() => {
        Print()
    }, [])


    return (
        <Backdrop onClick={afterPrint}>
            <div className="scale-75 lg:scale-100 [color-scheme:light]  dark:text-black" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5  border-b-2 border-dashed" ref={contentRef}>
                    {/* Header */}
                    <PdfHeader title="OPD Payment" id={payment.id} date={new Date().toLocaleDateString()} />

                    {/* Items Table */}
                    <div className="flex flex-col border border-gray-200 rounded-lg">
                        <div className="py-3 px-6 flex gap-2 items-center bg-gray-50 border-b border-gray-200">
                            <Banknote className="w-5 h-5 text-red-500" />
                            <h3 className="flex text-lg font-semibold text-gray-900 items-center gap-2">
                                Payment Details
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
                                {payment.charge.map((charge, i) => (
                                    <tr key={i} className=" hover:bg-gray-50">
                                        <td className="p-6 text-gray-700">${charge.chargeNames.name}</td>
                                        <td className="p-6 font-mono text-gray-900 min-w-[100px] flex flex-col h-10 items-center">
                                            <span className="px-2 inline-block text-green-800 text-sm font-medium bg-green-100 rounded">
                                                ${currencyFormat(payment.amount)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="w-[180px] text-sm ml-auto">
                        <div className='flex justify-between'>
                            <span className="text-gray-600">Total :</span>
                            <span className="text-gray-900 font-mono">{currencyFormat(payment.amount)}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="text-gray-600">Paid :</span>
                            <span className="text-gray-900 font-mono">{currencyFormat(payment.paid_amount)}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="text-gray-600">Balance :</span>
                            <span className="text-gray-900 font-mono">{currencyFormat(payment.balance_amount)}</span>
                        </div>
                    </div>

                    {/* Footer */}

                    <PdfFooter paymentInfo={payment.payment_mode} notes={'Have a nice day'} />

                </div>
            </div>

        </Backdrop>
    )
}



export default PrintPayment