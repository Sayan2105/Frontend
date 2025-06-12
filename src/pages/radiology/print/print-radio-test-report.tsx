import Backdrop from '@/components/backdrop';
import CustomTooltip from '@/components/customTooltip';
import { PdfHeader, To } from '@/components/pdf';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import RadiologyApi from '@/services/radiology-api';
import { RadiologyBillDeatils, RadiologySampleCollectionDet, RadioTestReport } from '@/types/radiology/radiology';
import { Printer } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useReactToPrint } from 'react-to-print';



interface DocumentProps {
    details: RadiologyBillDeatils,
    report: RadioTestReport,
    collection: RadiologySampleCollectionDet
    afterPrint: () => void
}


// Move BillPDF outside the main component

const Documents = ({ details, report, collection, afterPrint }: DocumentProps) => {

    const contentRef = useRef(null);
    const Print = useReactToPrint({
        contentRef,
        documentTitle: 'Radiology Report',
        onAfterPrint() {
            afterPrint()
        },
    })

    const headers = ['Parameter Name', 'Report Value', 'Range']

    useEffect(() => {
        Print()
    }, [])

    return (
        <Backdrop onClick={afterPrint}>
            <div className="scale-90 lg:scale-100 font-normal" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col p-6 max-w-4xl mx-auto bg-white dark:bg-background" ref={contentRef}>

                    <PdfHeader title="Radiology" id={details.id} date={report.date} />

                    <div className="grid grid-cols-2 gap-10 mb-8">
                        <div className='text-gray-600 dark:text-gray-300 text-sm'>
                            <p className='font-semibold mb-2 text-gray-800 dark:text-white'>Report Info:</p>
                            <p>{collection.center}</p>
                            <p>{`Collection date: ${collection.date}`}</p>
                            <p>{`Report date: ${report.date}`}</p>
                            <p>{`Collected by: ${collection.staff.name}`}</p>
                            <p>{`Approved by: ${report.staff.name}`}</p>
                        </div>
                        <To id={details.patientId} name={details.patient.name} address={details.patient.address} phone={details.patient.phone} email={details.patient.email} />
                    </div>

                    <div className="text-gray-600 dark:text-gray-300 text-sm mb-3 text-center">
                        <h1 className='text-xl font-bold'>{report.item.testName.name}</h1>
                    </div>

                    {/* Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {headers.map((item, i) => (
                                    <TableHead key={i}>{item}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {report.reportValues.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell className='flex flex-col max-w-[300px]'>
                                        <p className='font-bold'>{item.parameter.name}</p>
                                        <p className='text-sm'>{item.parameter.note}</p>
                                    </TableCell>
                                    <TableCell>{`${item.reportValue} ${item.parameter.unit.name}`}</TableCell>
                                    <TableCell>{item.parameter.from + ' - ' + item.parameter.to}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Backdrop>
    )
}


interface PrintRadioTestReportProps {
    details: RadiologyBillDeatils,
    itemId: number,
    onPending: (v: boolean) => void
}



const PrintRadioTestReport = ({ details, itemId, onPending }: PrintRadioTestReportProps) => {

    const [open, setOpen] = useState(false);
    const [collection, setCollection] = useState<RadiologySampleCollectionDet>()
    const [report, setReport] = useState<RadioTestReport>()


    const handlePrint = async () => {
        try {
            onPending(true)
            const [report, collectionData] = await Promise.all([
                RadiologyApi.getRadiologyReportById(itemId),
                RadiologyApi.getRadioSampleCollectionById(itemId)
            ])
            if (!details || !report || !collectionData) return toast.error('No data found')
            setCollection(collectionData)
            setReport(report)
            setOpen(true)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { onPending(false) }
    };



    return (
        <>
            <CustomTooltip message='Print Report'>
                <Printer className='cursor-pointer text-gray-600 dark:text-gray-300 w-4 active:scale-95' onClick={handlePrint} />
            </CustomTooltip>


            {open && <Documents details={details!} report={report!} collection={collection!} afterPrint={() => setOpen(false)} />}
        </>
    );
};



export default PrintRadioTestReport;
