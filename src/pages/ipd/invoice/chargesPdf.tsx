import Backdrop from '@/components/backdrop';
import { From, PdfFooter, PdfHeader, To, Totals } from '@/components/pdf';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import { IpdInvoice } from '@/types/IPD/ipd';
import html2pdf from "html2pdf.js";
import { ReceiptIndianRupee } from 'lucide-react';
import { HTMLAttributes, useEffect, useRef } from 'react';


export interface BillPDFProps extends HTMLAttributes<HTMLDivElement> {
    afterGenerate: () => void
    info: IpdInvoice
}




const GenerateIpdChargesInvoice = ({ afterGenerate, info }: BillPDFProps) => {

    const contentRef = useRef(null)

    const generate = () => {
        const options = {
            filename: `OPD-${info.id}.pdf`,
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


    const subtotal = info?.Charge.reduce((sum, charge) => sum + charge.total, 0)
    const total = info?.Charge.reduce((sum, charge) => sum + charge.net_amount, 0)

    const taxPrice = info?.Charge.reduce((acc, charge) => {
        return acc + ((charge.tax / 100) * charge.total);
    }, 0);

    const discountPrice = info?.Charge.reduce((acc, charge) => {
        const taxAbblePrice = ((charge.tax / 100) * charge.total) + charge.total
        return acc + (charge.discount / 100) * taxAbblePrice;  // discount is applied on taxable price not on net amount
    }, 0);

    const tax = (taxPrice! / subtotal!) * 100

    const discount = (discountPrice! / ((tax / subtotal!) * 100 + subtotal!)) * 100 // division is here to get net taxable amount because discount is applied on taxable price not on net amount

    useEffect(() => {
        generate()
    }, [])

    return (
        <Backdrop onClick={afterGenerate}>
            <div className="scale-75 lg:scale-100" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 border-b-2 border-dashed" ref={contentRef}>
                    {/* Header */}
                    <PdfHeader title="Invoice" id={info?.id!} date={new Date().toLocaleDateString()} />

                    {/* Company and Client Info */}
                    <div className="grid grid-cols-2 gap-8">
                        <From />
                        <To id={info?.patientId!} name={info?.patient.name!} address={info?.patient.address!} phone={info?.patient.phone!} email={info?.patient.email!} />
                    </div>

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
                                {info.Charge.map((charge, _i) => (
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

                    <Totals subtotal={subtotal!} discount={discount} tax={tax} total={total!} />

                    {/* Footer */}

                    <PdfFooter paymentInfo={'offline'} notes={'Have a nice day'} />

                </div>
            </div>

        </Backdrop>
    )
}




export default GenerateIpdChargesInvoice;