import CardBox from "@/components/card-box"
import CustomTooltip from "@/components/customTooltip"
import Dialog from "@/components/Dialog"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import SampleCollectionForm from "@/components/sample-collection-form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { CalendarDays, Eye, Plus, Printer, UserRoundPlus } from "lucide-react"
import { HTMLAttributes, useEffect, useRef, useState } from "react"
import usePathology from "./handlers"
import PathologyReportForm from "./pathology-report-from"
import PrintPathologyInvoice from "./print/print-invoice"
import PrintPathTestReport from "./print/print-path-test-report"
import PathSampleCollectionInfo from "./sample-collection-info"
import AlertModel from "@/components/alertModel"
import PathReportInfo from "./report-info"



interface PharmacyDetailsProps extends HTMLAttributes<HTMLDivElement> {
    ID: string,
}


const PathologyBillDetailsModal = ({ ID, ...props }: PharmacyDetailsProps) => {

    const itemId = useRef(0)
    const testId = useRef(0)
    const [print, setPrint] = useState(false)
    const [isCollectionOpen, setCollectionOpen] = useState(false)
    const [isReportOpen, setReportOpen] = useState(false)

    const { current, getPathologyBillDetails, collectionForm, setCollectionForm, onCollectionSubmit, collectionDetails, setCollectionDetails, deleteCollection, isLodaing, reportForm, setReportForm, setReportDetails, onReportSubmit, reportDetails, deletePathologyReport, setLoading, isRefresh, confirmationProps } = usePathology()


    useEffect(() => {
        getPathologyBillDetails(ID)
    }, [ID, isRefresh])



    return (
        <>
            <Dialog pageTitle="Bill Details" {...props}>
                <ScrollArea className={'relative h-[75vh] sm:h-[60vh] w-full'}>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 px-2.5">

                        <div className="flex items-center gap-2 sm:col-span-2 mb-4">
                            <div className='p-3 bg-yellow-500 rounded-full'>
                                <CalendarDays className='w-10 h-10 text-white' />
                            </div>
                            <div className=''>
                                <p className='font-semibold text-lg text-gray-900 dark:text-gray-100'>{current?.date}</p>
                                <div className="flex space-x-1 items-center">
                                    <p className='text-sm text-gray-400'>Invoice Date</p>
                                    {/* printing commulative bill */}
                                    <Printer className='cursor-pointer h-4 w-4 text-gray-600 dark:text-gray-300 active:scale-95' onClick={() => setPrint(true)} />
                                </div>
                            </div>
                        </div>

                        {/* dashed cards */}

                        <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                            <CardBox borderType='dashed' title="Invoice No" value={current?.id} />
                            <CardBox borderType='dashed' title="Patient Name" value={current?.patient.name} />
                        </div>

                        {/* solid cards */}

                        <CardBox borderType='solid' title="Invoice No" value={current?.id} />

                        <CardBox borderType='solid' title="Patient ID" value={current?.patientId ?? 'N/A'} />

                        <CardBox borderType='solid' title="Doctor Name" value={current?.doctor ?? 'N/A'} />

                        <CardBox borderType='solid' title="OPD ID" value={current?.previousReportValue ?? 'N/A'} />

                        <CardBox borderType='solid' title="Discount %" value={current?.discount ?? 'N/A'} />

                        <CardBox borderType='solid' title="Tax %" value={current?.additionalTax ?? 'N/A'} />

                        <CardBox borderType='solid' title={`Net Amount ${currencySymbol()}`} value={currencyFormat(current?.net_amount!) ?? 'N/A'} />

                        <CardBox borderType='solid' title="Payment Mode" value={current?.payment_mode ?? 'N/A'} />

                        <CardBox borderType='solid' title="Note" value={current?.note ?? 'N/A'} />

                    </div>

                    {/* second grid */}

                    <div className="grid pb-10 pt-5 px-2.5 font-medium">
                        <h1 className="text-lg text-gray-800 dark:text-gray-100">Medicines</h1>

                        <Table className="mt-2">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Test Name</TableHead>
                                    <TableHead>Report Days</TableHead>
                                    <TableHead>Expected Date</TableHead>
                                    <TableHead>Collected By</TableHead>
                                    <TableHead>Approved By</TableHead>
                                    <TableHead>Tax%</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {current?.PathologyBillItems.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{item.testName.name}</TableCell>
                                        <TableCell>{item.reportDays}</TableCell>
                                        <TableCell>{item.reportDate}</TableCell>
                                        {/* Collector */}
                                        <TableCell className="flex">

                                            {item.PathSampleCollection?.id ?
                                                <PermissionProtectedAction action="view" module="Sample Collection">
                                                    <CustomTooltip message="View Collector">
                                                        <div className="relative p-2 w-fit bg-pink-100 dark:bg-pink-500/10 rounded-full">
                                                            <Eye className="w-4 h-4 text-pink-500" />
                                                            <span className="cursor-pointer absolute inset-0"
                                                                onClick={() => { itemId.current = item.id, setCollectionOpen(true) }}
                                                            />
                                                        </div>
                                                    </CustomTooltip>
                                                </PermissionProtectedAction>
                                                :
                                                <PermissionProtectedAction action="create" module="Sample Collection">
                                                    <CustomTooltip message="Add User">
                                                        <div className="relative p-2 w-fit bg-green-100 dark:bg-green-500/10 rounded-full">
                                                            <UserRoundPlus className="w-4 h-4 text-green-500 cursor-pointer" />
                                                            <span className="cursor-pointer absolute inset-0"
                                                                onClick={() => { setCollectionForm(true); itemId.current = item.id }}
                                                            />
                                                        </div>
                                                    </CustomTooltip>
                                                </PermissionProtectedAction>
                                            }

                                        </TableCell>

                                        {/* Approved By or Report */}
                                        <TableCell>
                                            {item.PathologyReport?.id ?

                                                <PermissionProtectedAction action='view' module='Pathology Report'>
                                                    <CustomTooltip message="View Report">
                                                        <div className="relative p-2 w-fit bg-pink-100 dark:bg-pink-500/10 rounded-full">
                                                            <Eye className="w-4 h-4 text-pink-500" />
                                                            <span className="cursor-pointer absolute inset-0"
                                                                onClick={async () => { itemId.current = item.id, setReportOpen(true) }}
                                                            />
                                                        </div>
                                                    </CustomTooltip>
                                                </PermissionProtectedAction>
                                                :
                                                <PermissionProtectedAction action='create' module='Pathology Report'>
                                                    <CustomTooltip message="Add Report">
                                                        <div className="relative p-2 w-fit bg-green-100 dark:bg-green-500/10 rounded-full">
                                                            <Plus className="w-4 h-4 text-green-500" />
                                                            <span className="cursor-pointer absolute inset-0"
                                                                onClick={() => { setReportForm(true); testId.current = item.testNameId, itemId.current = item.id }}
                                                            />
                                                        </div>
                                                    </CustomTooltip>
                                                </PermissionProtectedAction>
                                            }

                                        </TableCell>
                                        <TableCell>{item.tax} %</TableCell>
                                        <TableCell>{currencyFormat(item.amount)}</TableCell>
                                        <TableCell>
                                            <PrintPathTestReport details={current!} itemId={item.id} onPending={setLoading} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </div>
                </ScrollArea>
            </Dialog>


            {/* Model */}

            {collectionForm && (
                <SampleCollectionForm
                    editDetails={collectionDetails!}
                    isPending={isLodaing}
                    Role="pathologist"
                    Submit={(formData) => onCollectionSubmit(formData, itemId.current)}
                    onClick={() => { setCollectionForm(false); setCollectionDetails(undefined) }}
                />
            )}


            {reportForm && (
                <PathologyReportForm
                    editDetails={reportDetails!}
                    testNameId={testId.current}
                    isPending={isLodaing}
                    Submit={(formData) => onReportSubmit(formData, itemId.current)}
                    onClick={() => { setReportForm(false); setReportDetails(undefined) }}
                />
            )}

            <PathSampleCollectionInfo
                ID={itemId.current}
                isOpen={isCollectionOpen}
                onClose={setCollectionOpen}
                onDelete={deleteCollection}
            />


            <PathReportInfo
                ID={itemId.current}
                isOpen={isReportOpen}
                onClose={setReportOpen}
                onDelete={deletePathologyReport}
            />


            {confirmationProps.isOpen && <AlertModel
                continue={() => confirmationProps.onConfirm()}
                cancel={() => confirmationProps.onCancel()}
            />}


            {isLodaing && <LoaderModel />}

            {/* printing invoice */}
            {print && <PrintPathologyInvoice Info={current!} afterPrint={() => setPrint(false)} />}

        </>
    )
}

export default PathologyBillDetailsModal