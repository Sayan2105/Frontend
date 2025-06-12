import Backdrop from '@/components/backdrop';
import { From, PdfFooter, PdfHeader, Supplier, Totals } from '@/components/pdf';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import { medicinePurchaseDetails } from '@/types/opd_section/purchaseMedicine';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';



interface Props {
    afterPrint: () => void,
    Info: medicinePurchaseDetails
}


const PrintMedicinePurchase = ({ afterPrint, Info }: Props) => {

    const contentRef = useRef(null);
    const Print = useReactToPrint({
        contentRef,
        documentTitle: 'Invoice',
        onAfterPrint() {
            afterPrint()
        },
    })
    const headers = ['Medicine Name', 'Category', 'Batch No.', `Purchase Price ${currencySymbol()}`, 'Qty', `Total ${currencySymbol()}`]

    const taxedPrice = ((+Info.tax / 100) * Info.amount) + Info.amount
    const discountPrice = (+Info.discount / 100) * taxedPrice // cause discount is applied on taxable price not on net amount


    useEffect(() => {
        Print()
    }, [])


    return (
        <Backdrop onClick={afterPrint}>
            <div className="scale-75 lg:scale-100" onClick={(e) => e.stopPropagation()}>

                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 dark:bg-[#1e1e1e] border-b-2 border-dashed dark:border-gray-500" ref={contentRef}>

                    <PdfHeader title="Invoice" id={Info.id} date={Info.purchase_date} />

                    <div className="grid grid-cols-2 gap-8">
                        <Supplier name={Info.supplier_name} />
                        <From title='To:' />
                    </div>

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
                                <TableCell className="py-3 text-sm">{Info.medicine.name}</TableCell>
                                <TableCell className="py-3 text-sm">{Info.category.name}</TableCell>
                                <TableCell className="py-3 text-sm">{Info.batch_no}</TableCell>
                                <TableCell className="py-3 text-sm">{currencyFormat(+Info.purchase_price)}</TableCell>
                                <TableCell className="py-3 text-sm">{Info.quantity}</TableCell>
                                <TableCell className="py-3 text-sm">{currencyFormat(Info.amount)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    {/* Totals */}

                    <Totals subtotal={Info.amount} discount={+Info.discount} discount_amount={discountPrice} tax={+Info.tax} total={Info.total_amount} />

                    <PdfFooter paymentInfo={Info.payment_mode} notes={'Have a nice day'} />

                </div>
            </div>

        </Backdrop>
    )
}



export default PrintMedicinePurchase
