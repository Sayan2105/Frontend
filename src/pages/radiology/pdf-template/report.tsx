import Backdrop from '@/components/backdrop';
import CustomTooltip from '@/components/customTooltip';
import { PdfHeader, To } from '@/components/pdf';
import RadiologyApi from '@/services/radiology-api';
import { RadiologyBillDeatils, RadiologySampleCollectionDet, RadioTestReport } from '@/types/radiology/radiology';
import html2pdf from "html2pdf.js";
import { Printer, Radiation } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';


interface DocumentProps {
    details: RadiologyBillDeatils,
    report: RadioTestReport,
    collection: RadiologySampleCollectionDet
    afterGenerate: () => void
}


// Move BillPDF outside the main component

const Documents = ({ details, report, collection, afterGenerate }: DocumentProps) => {

    const contentRef = useRef(null);
    const generate = () => {
        const options = {
            filename: `invoice-${details.id}.pdf`,
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

    const headers = ['Parameter Name', 'Report Value', 'Range']

    useEffect(() => {
        generate()
    }, [])

    return (
        <Backdrop onClick={afterGenerate}>
            <div className="scale-90 lg:scale-100 font-normal" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col p-6 max-w-4xl mx-auto bg-white" ref={contentRef}>

                    <PdfHeader title="Radiology Test Report" id={details.id} date={report.date} />

                    <div className="grid grid-cols-2 gap-10 mb-8">
                        <div className='text-gray-600  text-sm'>
                            <p className='font-semibold mb-2 text-gray-800'>Report Info:</p>
                            <p>{collection.center}</p>
                            <p>{`Collection date: ${collection.date}`}</p>
                            <p>{`Report date: ${report.date}`}</p>
                            <p>{`Collected by: ${collection.staff.name}`}</p>
                            <p>{`Approved by: ${report.staff.name}`}</p>
                        </div>
                        <To id={details.patientId} name={details.patient.name} address={details.patient.address} phone={details.patient.phone} email={details.patient.email} />
                    </div>

                    {/* Table */}

                    <div className="flex flex-col border border-gray-200 rounded-lg">
                        <div className="py-3 px-6 flex gap-2 items-center bg-gray-50 border-b border-gray-200">
                            <Radiation className="w-5 h-5 text-red-500" />
                            <h3 className="flex text-lg font-semibold text-gray-900 items-center gap-2">
                                {report.item.testName.name}
                            </h3>
                        </div>
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    {headers.map((item, i) => (
                                        <th key={i} className="py-4 px-6 text-left font-semibold text-gray-700 uppercase">{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {report.reportValues.map((item, i) => (
                                    <tr key={i} className=" hover:bg-gray-50">
                                        <td className="p-6 text-gray-700 flex flex-col">
                                            <p><span className='text-red-500'>● </span>{item.parameter.name}</p>
                                            <p className='text-muted-foreground'>{item.parameter.note}</p>
                                        </td>
                                        <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                            <span className="px-2 font-mono inline-block text-red-500 text-sm font-medium bg-red-100 rounded">
                                                {`${item.reportValue} ${item.parameter.unit.name}`}
                                            </span>
                                        </td>
                                        <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                                            <span className="px-2 inline-block font-mono text-violet-500 text-sm font-medium bg-violet-100 rounded">
                                                {item.parameter.from + ' - ' + item.parameter.to}
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
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



const GenerateRadiologyTestReport = ({ details, itemId, onPending }: PrintRadioTestReportProps) => {

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


            {open && <Documents details={details!} report={report!} collection={collection!} afterGenerate={() => setOpen(false)} />}
        </>
    );
};



export default GenerateRadiologyTestReport;
