import Backdrop from "@/components/backdrop";
import { From, PdfFooter, PdfHeader, To, Totals } from "@/components/pdf";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { currencyFormat } from "@/lib/utils";
import { AppointmentData } from "@/types/appointment/appointment";
import { useEffect, useRef } from "react";
import { useReactToPrint } from 'react-to-print';


interface InvoiceProps {
    afterPrint: () => void,
    Info: AppointmentData
}


const PrintAppointment = ({ afterPrint, Info }: InvoiceProps) => {

    const contentRef = useRef(null);
    const print = useReactToPrint({
        contentRef, documentTitle: 'Appointment',
        onAfterPrint: () => {
            afterPrint()
        },
    })

    useEffect(() => {
        print()
    }, [])

    return (
        <Backdrop onClick={afterPrint}>
            <div className="scale-75 lg:scale-100" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 dark:bg-[#1e1e1e] border-b-2 border-dashed dark:border-gray-500" ref={contentRef}>
                    {/* Header */}
                    <PdfHeader title="Appointment" id={Info.id} date={Info.appointment_date} />

                    {/* Company and Client Info */}
                    <div className="grid grid-cols-2 gap-8">
                        <From />
                        <To id={Info.patientId} name={Info.patient.name} address={Info.patient.address} phone={Info.patient.phone} email={Info.patient.email} />
                    </div>

                    {/* Items Table */}
                        <Table>
                            <TableHeader className="bg-white">
                                <TableRow>
                                    {['Consultant', 'Shift', 'Priority', 'Status', 'Fees'].map((item, i) => (
                                        <TableHead key={i}>{item}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                <TableRow className="dark:border-gray-200">
                                    <TableCell className="py-3 text-sm">{Info.doctor.name}</TableCell>
                                    <TableCell className="py-3 text-sm">{Info.shift}</TableCell>
                                    <TableCell className="py-3 text-sm">{Info.appointment_priority}</TableCell>
                                    <TableCell className="py-3 text-sm">{Info.status}</TableCell>
                                    <TableCell className="py-3 text-sm">{currencyFormat(Info.fees)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    {/* Totals */}

                    <Totals subtotal={Info.fees} discount={Info.discount} tax={0} total={Info.net_amount} />

                    {/* Footer */}

                    <PdfFooter paymentInfo={Info.payment_mode} notes={'Have a nice day'} />

                </div>
            </div>

        </Backdrop>
    );
};


export default PrintAppointment