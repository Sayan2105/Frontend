import Backdrop from "@/components/backdrop";
import { From, PdfFooter, PdfHeader, To, Totals } from "@/components/pdf";
import { currencyFormat } from "@/lib/utils";
import { AppointmentData } from "@/types/appointment/appointment";
import html2pdf from "html2pdf.js";
import { Calendar } from "lucide-react";
import { useEffect, useRef } from "react";

interface InvoiceProps {
    afterGenerate: () => void,
    Info: AppointmentData
}


const GenerateAppointmentPdf = ({ afterGenerate, Info }: InvoiceProps) => {

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

    useEffect(() => {
        generate()
    }, [])


    return (
        <Backdrop onClick={afterGenerate}>
            <div className="scale-50 lg:scale-100" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 border-b-2 border-dashed" ref={contentRef}>
                    {/* Header */}
                    <PdfHeader title="Appointment" id={Info.id} date={Info.appointment_date} />

                    {/* Company and Client Info */}
                    <div className="grid grid-cols-2 gap-8">
                        <From />
                        <To id={Info.patientId} name={Info.patient.name} address={Info.patient.address} phone={Info.patient.phone} email={Info.patient.email} />
                    </div>

                    {/* Items Table */}

                    <div className="flex flex-col border border-gray-200 rounded-lg">
                        <div className="py-3 px-6 flex gap-2 items-center bg-gray-50 border-b border-gray-200">
                            <Calendar className="w-5 h-5 text-red-500" />
                            <h3 className="flex text-lg font-semibold text-gray-900 items-center gap-2">
                                Appointment Details
                            </h3>
                        </div>
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['Consultant', 'Shift', 'Priority', 'Status', 'Fees'].map((item, i) => (
                                        <th key={i} className="py-4 px-6 text-left font-semibold text-gray-700 uppercase">{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className=" hover:bg-gray-50">
                                    <td className="p-6 text-gray-700"><span className='text-red-500'>● </span>{Info.doctor.name}</td>
                                    <td className="p-6 text-gray-700">{Info.shift}</td>
                                    <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                        <span className="px-2 inline-block text-red-500 text-sm font-medium bg-red-100 rounded">
                                            {Info.appointment_priority}
                                        </span>
                                    </td>
                                    <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                        <span className="px-2 inline-block text-yellow-500 text-sm font-medium bg-yellow-100 rounded">
                                            {Info.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-gray-700">{currencyFormat(Info.fees)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}

                    <Totals subtotal={Info.fees} discount={Info.discount} tax={0} total={Info.net_amount} />

                    {/* Footer */}

                    <PdfFooter paymentInfo={Info.payment_mode} notes={'Have a nice day'} />

                </div>
            </div>

        </Backdrop>
    );
};


export default GenerateAppointmentPdf;