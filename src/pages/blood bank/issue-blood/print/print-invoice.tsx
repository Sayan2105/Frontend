import Backdrop from '@/components/backdrop';
import { From, PdfFooter, PdfHeader, To, Totals } from '@/components/pdf';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import { IssuedBloodInfo } from '@/types/blood-bank/blood-bank';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';



type Props = {
    afterPrint: () => void,
    info: IssuedBloodInfo
}


const PrintIssueBloodInvoice = ({ afterPrint, info }: Props) => {

    const contentRef = useRef(null);

    const Print = useReactToPrint({
        contentRef,
        documentTitle: 'Invoice',
        onAfterPrint() {
            afterPrint()
        },
    })

    const headers = ['Blood Group', 'Bag', 'Charge Name', `STD Charge ${currencySymbol()}`, `Total ${currencySymbol()}`]


    useEffect(() => {
        Print()
    }, [])


    return (
        <Backdrop onClick={afterPrint}>
            <div className="scale-75 lg:scale-100" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 dark:bg-[#1e1e1e] border-b-2 border-dashed dark:border-gray-500" ref={contentRef}>
                    {/* Header */}
                    <PdfHeader title="Invoice" id={info.id} date={info.date} />

                    {/* Company and Client Info */}
                    <div className="grid grid-cols-2 gap-8">
                        <From />
                        <To id={info.patientId} name={info.patient.name} address={info.patient.address} phone={info.patient.phone} email={info.patient.email} />
                    </div>

                    {/* Items Table */}
                    <Table>
                        <TableHeader className="bg-white">
                            <TableRow>
                                {headers.map((item, i) => (
                                    <TableHead key={i}>{item}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableRow className="dark:border-gray-200">
                                <TableCell className="py-3 text-sm">{info.blood_group}</TableCell>
                                <TableCell className="py-3 text-sm">{info.bag}</TableCell>
                                <TableCell className="py-3 text-sm">{info.chargeName.name}</TableCell>
                                <TableCell className="py-3 text-sm">{currencyFormat(info.standard_charge)}</TableCell>
                                <TableCell className="py-3 text-sm">{currencyFormat(info.net_amount)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

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
                        paymentInfo={`${info.payment_mode} \n ${info.payment_info}`}
                        notes={'Have a nice day'}
                    />

                </div>
            </div>

        </Backdrop>
    )
}




export default PrintIssueBloodInvoice


