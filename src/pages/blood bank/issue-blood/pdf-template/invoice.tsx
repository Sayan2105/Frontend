import Backdrop from '@/components/backdrop';
import { From, PdfFooter, PdfHeader, To, Totals } from '@/components/pdf';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import { IssuedBloodInfo } from '@/types/blood-bank/blood-bank';
import html2pdf from "html2pdf.js";
import { Droplets } from 'lucide-react';
import { useEffect, useRef } from 'react';

type Props = {
    afterGenerate: () => void,
    info: IssuedBloodInfo
}

const GenerateBloodIssueInvoice = ({ afterGenerate, info }: Props) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const generate = () => {
        const options = {
            filename: `invoice-${info.id}.pdf`,
            image: { type: "png", quality: 1 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: "in", format: "A4", orientation: "portrait" }
        };
        html2pdf()
            .from(contentRef.current!)
            .set(options)
            .outputPdf('blob')
            .then((pdfBlob: Blob) => {
                const url = URL.createObjectURL(pdfBlob);
                window.open(url);
                afterGenerate();
            });
    };

    useEffect(() => {
        generate();
    }, []);

    const headers = [
        'Blood Group',
        'Bag',
        'Charge Name',
        `STD Charge ${currencySymbol()}`,
        `Total ${currencySymbol()}`
    ];

    return (
        <Backdrop onClick={afterGenerate}>
            <div className="scale-50 lg:scale-100" onClick={(e) => e.stopPropagation()}>
                <div
                    ref={contentRef}
                    className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 border-b-2 border-dashed"
                >
                    {/* Header */}
                    <PdfHeader title="Invoice" id={info.id} date={info.date} />

                    {/* Company and Client Info */}
                    <div className="grid grid-cols-2 gap-8">
                        <From />
                        <To
                            id={info.patientId}
                            name={info.patient.name}
                            address={info.patient.address}
                            phone={info.patient.phone}
                            email={info.patient.email}
                        />
                    </div>

                    {/* Items Table */}
                    <div className="flex flex-col border border-gray-200 rounded-lg">
                        <div className="py-3 px-6 flex gap-2 items-center bg-gray-50 border-b border-gray-200">
                            <Droplets className="w-5 h-5 text-red-500" />
                            <h3 className="flex text-lg font-semibold text-gray-900 items-center gap-2">
                                Invoice Details
                            </h3>
                        </div>
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    {headers.map((item, i) => (
                                        <th
                                            key={i}
                                            className="py-4 px-6 text-left font-semibold text-gray-700 uppercase"
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="p-6 text-gray-700">
                                        <span className='text-red-500'>● </span>{info.blood_group}
                                    </td>
                                    <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                        <span className="px-2 inline-block text-red-500 text-sm font-medium bg-red-100 rounded">
                                            {info.bag}
                                        </span>
                                    </td>
                                    <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                        <span className="px-2 inline-block text-blue-500 text-sm font-medium bg-blue-100 rounded">
                                            {info.chargeName.name}
                                        </span>
                                    </td>
                                    <td className="p-6 text-gray-700">
                                        {currencyFormat(info.standard_charge)}
                                    </td>
                                    <td className="p-6 text-gray-700 font-mono text-lg font-semibold">
                                        {currencyFormat(info.net_amount)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <Totals
                        subtotal={info.net_amount}
                        discount={info.discount}
                        discount_amount={info.discountRate}
                        tax={info.tax}
                        tax_amount={info.taxRate}
                        total={info.net_amount}
                    />

                    {/* Footer */}
                    <PdfFooter
                        paymentInfo={`${info.payment_mode}\n${info.payment_info}`}
                        notes={'Have a nice day'}
                    />
                </div>
            </div>
        </Backdrop>
    );
};

export default GenerateBloodIssueInvoice;
