import Backdrop from '@/components/backdrop';
import { From, PdfFooter, PdfHeader, To, Totals } from '@/components/pdf';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import { RadiologyBillDeatils } from '@/types/radiology/radiology';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';



type Props = {
    afterPrint: () => void,
    Info: RadiologyBillDeatils
}


const PrintRadiologyInvoice = ({ afterPrint, Info }: Props) => {

    const contentRef = useRef(null);

    const Print = useReactToPrint({
        contentRef,
        documentTitle: 'Invoice',
        onAfterPrint() {
            afterPrint()
        },
    })

    const headers = ['Test Name', 'Report Date', 'Report Days', `Tax %`, `Total ${currencySymbol()}`]

    const subTotal = Info.RadiologyBillItems.reduce((acc, item) => acc + item.amount, 0)

    useEffect(() => {
        Print()
    }, [])


    return (
        <Backdrop onClick={afterPrint}>
            <div className="scale-75 lg:scale-100" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto p-6 bg-white flex flex-col gap-y-5 dark:bg-[#1e1e1e] border-b-2 border-dashed dark:border-gray-500" ref={contentRef}>
                    {/* Header */}
                    <PdfHeader title="Invoice" id={Info.id} date={Info.date} />

                    {/* Company and Client Info */}
                    <div className="grid grid-cols-2 gap-8">
                        <From />
                        <To id={Info.patientId} name={Info.patient.name} address={Info.patient.address} phone={Info.patient.phone} email={Info.patient.email} />
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
                            {Info.RadiologyBillItems?.map((item, i) => (
                                <TableRow key={i} className="dark:border-gray-200">
                                    <TableCell className="py-3 text-sm">{item.testName.name}</TableCell>
                                    <TableCell className="py-3 text-sm">{item.reportDate}</TableCell>
                                    <TableCell className="py-3 text-sm">{item.reportDays}</TableCell>
                                    <TableCell className="py-3 text-sm">{item.tax} %</TableCell>
                                    <TableCell className="py-3 text-sm">{currencyFormat(item.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Totals */}

                    <Totals subtotal={subTotal} discount={Info.discount} tax={Info.additionalTax} total={Info.net_amount} />

                    {/* Footer */}

                    <PdfFooter paymentInfo={'offline'} notes={'Have a nice day'} />

                </div>
            </div>

        </Backdrop>
    )
}




export default PrintRadiologyInvoice


