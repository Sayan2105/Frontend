import Backdrop from '@/components/backdrop';
import CustomTooltip from '@/components/customTooltip';
import { From, PdfFooter, PdfHeader, To, Totals } from '@/components/pdf';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import OpdApi from '@/services/opd-api';
import { PrintBillDetails } from '@/types/opd_section/opd';
import { Printer } from 'lucide-react';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useReactToPrint } from 'react-to-print';



export interface BillPDFProps extends HTMLAttributes<HTMLDivElement> {
    bill: PrintBillDetails
    afterPrint: () => void
}




const Document = ({ bill, afterPrint }: BillPDFProps) => {

    const contentRef = useRef(null)

    const Print = useReactToPrint({
        contentRef,
        documentTitle: 'Invoice',
        onAfterPrint() { afterPrint() },
    })

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
        Print()
    }, [])


    return (
        <Backdrop onClick={afterPrint}>
            <div className="scale-75 lg:scale-100" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 dark:bg-[#1e1e1e] border-b-2 border-dashed dark:border-gray-500" ref={contentRef}>
                    {/* Header */}
                    <PdfHeader title="Invoice" id={bill.id} date={new Date().toLocaleDateString()} />

                    {/* Company and Client Info */}
                    <div className="grid grid-cols-2 gap-8">
                        <From />
                        <To id={bill.patientId} name={bill.patient.name} address={bill.patient.address} phone={bill.patient.phone} email={bill.patient.email} />
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
                            {bill.charges.map((charge, _i) => (
                                <TableRow key={_i}>
                                    <TableCell className="py-3 text-sm">{charge.chargeNames.name}</TableCell>
                                    <TableCell className="py-3 text-sm">{charge.chargeCategory.category}</TableCell>
                                    <TableCell className="py-3 text-sm">{currencyFormat(charge.total)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

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

            {current && <Document bill={current!} afterPrint={() => setCurrent(null)} />}
        </>
    );
};




export default PrintOpdBill;