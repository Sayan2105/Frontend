import Backdrop from '@/components/backdrop';
import { From, PdfFooter, PdfHeader, To, Totals } from '@/components/pdf';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import { IpdInvoice } from '@/types/IPD/ipd';
import { HTMLAttributes, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';



export interface BillPDFProps extends HTMLAttributes<HTMLDivElement> {
    afterPrint: () => void
    info: IpdInvoice
}




const PrintIpdInvoice = ({ afterPrint, info }: BillPDFProps) => {

    const contentRef = useRef(null)

    const Print = useReactToPrint({
        contentRef,
        documentTitle: 'Invoice',
        onAfterPrint() { afterPrint() },
    })



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
        Print()
    }, [])

    return (
        <Backdrop onClick={afterPrint}>
            <div className="scale-75 lg:scale-100" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 dark:bg-[#1e1e1e] border-b-2 border-dashed dark:border-gray-500" ref={contentRef}>
                    {/* Header */}
                    <PdfHeader title="Invoice" id={info?.id!} date={new Date().toLocaleDateString()} />

                    {/* Company and Client Info */}
                    <div className="grid grid-cols-2 gap-8">
                        <From />
                        <To id={info?.patientId!} name={info?.patient.name!} address={info?.patient.address!} phone={info?.patient.phone!} email={info?.patient.email!} />
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
                            {info?.Charge.map((charge, _i) => (
                                <TableRow key={_i}>
                                    <TableCell className="py-3 text-sm">{charge.chargeNames.name}</TableCell>
                                    <TableCell className="py-3 text-sm">{charge.chargeCategory.category}</TableCell>
                                    <TableCell className="py-3 text-sm">{currencyFormat(charge.total)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Totals */}

                    <Totals subtotal={subtotal!} discount={discount} tax={tax} total={total!} />

                    {/* Footer */}

                    <PdfFooter paymentInfo={'offline'} notes={'Have a nice day'} />

                </div>
            </div>

        </Backdrop>
    )
}




export default PrintIpdInvoice;