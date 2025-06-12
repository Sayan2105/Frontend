import Backdrop from '@/components/backdrop';
import { PdfFooter, PdfHeader } from '@/components/pdf';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import { paymentData } from '@/types/opd_section/payment';
import { HTMLAttributes, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';



export interface Props extends HTMLAttributes<HTMLDivElement> {
    payment: paymentData
    afterPrint: () => void
}




const PrintPayment = ({ payment, afterPrint }: Props) => {

    const contentRef = useRef(null)

    const Print = useReactToPrint({
        contentRef,
        documentTitle: 'Payment',
        onAfterPrint() { afterPrint() },
    })

    const headers = ['Description', `Amount ${currencySymbol()}`]


    useEffect(() => {
        Print()
    }, [])


    return (
        <Backdrop onClick={afterPrint}>
            <div className="scale-75 lg:scale-100" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 dark:bg-[#1e1e1e] border-b-2 border-dashed dark:border-gray-500" ref={contentRef}>
                    {/* Header */}
                    <PdfHeader title="OPD Payment" id={payment.id} date={new Date().toLocaleDateString()} />

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
                            <TableRow >
                                <TableCell className="py-3 text-sm">
                                    {payment.charge.map((charge, _i) => (
                                        <div key={_i} className="flex justify-between">
                                            <span>● {charge.chargeNames.name}</span>
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell className="py-3 text-sm">{currencyFormat(payment.amount)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    {/* Totals */}

                    <div className="w-[180px] text-sm ml-auto">
                        <div className='flex justify-between'>
                            <span className="text-gray-600 dark:text-gray-300">Total :</span>
                            <span className="text-gray-900 dark:text-gray-400">{currencyFormat(payment.amount)}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="text-gray-600 dark:text-gray-300">Paid :</span>
                            <span className="text-gray-900 dark:text-gray-400">{currencyFormat(payment.paid_amount)}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="text-gray-600 dark:text-gray-300">Balance :</span>
                            <span className="text-gray-900 dark:text-gray-400">{currencyFormat(payment.balance_amount)}</span>
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