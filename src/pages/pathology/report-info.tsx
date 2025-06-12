import IconMenu from "@/components/icon-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays, Pencil, Radiation, Trash, User } from "lucide-react"
import { useEffect } from "react"
import usePathology from "./handlers"
import PathologyReportForm from "./pathology-report-from"
import PermissionProtectedAction from "@/components/permission-protected-actions"

type Props = {
    ID: number
    isOpen: boolean
    onDelete?: (id: number) => void
    onClose: (v: boolean) => void
    excludeActions?: boolean
}

const PathReportInfo = ({ excludeActions = false, isOpen, onClose, onDelete, ID }: Props) => {

    const { reportForm, setReportForm, onReportSubmit, reportDetails, getPathologyReportById } = usePathology()

    useEffect(() => {
        if (ID) getPathologyReportById(ID)
    }, [isOpen, ID])

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="z-[200]">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between">
                            <p>Report Details</p>
                            {!excludeActions && <div className="flex gap-2 mr-10">
                                <PermissionProtectedAction action='update' module='Pathology Report'>
                                    <div className="relative p-2 bg-yellow-100 dark:bg-yellow-500/10 rounded-full">
                                        <Pencil className="w-4 h-4 text-yellow-500" />
                                        <span className="absolute inset-0 cursor-pointer" onClick={() => { setReportForm(true), onClose(false) }} />
                                    </div>
                                </PermissionProtectedAction>
                                <PermissionProtectedAction action='delete' module='Pathology Report'>
                                    <div className="relative p-2 bg-red-100 dark:bg-red-500/10 rounded-full">
                                        <Trash className="w-4 h-4  text-red-500" />
                                        <span className="absolute inset-0 cursor-pointer" onClick={() => { onDelete && onDelete(ID), onClose(false) }} />
                                    </div>
                                </PermissionProtectedAction>
                            </div>}
                        </DialogTitle>
                        <DialogDescription>This is the radiology report details</DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <div>
                        <div className="flex flex-col gap-4">
                            <IconMenu
                                iconBg="bg-blue-100 dark:bg-blue-500/10"
                                icon={<User className="w-6 h-6 text-blue-500" />}
                                title="Approved By"
                                value={reportDetails?.staff.name}
                            />
                            <IconMenu
                                iconBg="bg-green-100 dark:bg-green-500/10"
                                icon={<CalendarDays className="w-6 h-6 text-green-500" />}
                                title="Approved Date"
                                value={new Date(reportDetails?.date!).toDateString()}
                            />
                            <IconMenu
                                iconBg="bg-yellow-100 dark:bg-yellow-500/10"
                                icon={<Radiation className="w-6 h-6 text-yellow-500" />}
                                title="Test Name"
                                value={reportDetails?.item.testName.name}
                            />

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {['Parameter', 'Value', 'Range'].map((item, i) => (
                                            <TableHead key={i}>{item}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reportDetails?.reportValues.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{item.parameter.name}</TableCell>
                                            <TableCell>{`${item.reportValue} (${item.parameter.unit.name})`}</TableCell>
                                            <TableCell>{`${item.parameter.from}-${item.parameter.to}`}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div>
                                <h1>Result :</h1>
                                <p className="text-muted-foreground text-sm">{reportDetails?.result || 'N/A'}</p>
                            </div>

                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {reportForm && <PathologyReportForm
                editDetails={reportDetails!}
                isPending={false}
                Submit={(formData) => onReportSubmit(formData)}
                onClick={() => setReportForm(false)} testNameId={0} />}

        </>
    )
}






export default PathReportInfo