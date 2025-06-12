import AlertModel from "@/components/alertModel"
import EmptyList from "@/components/emptyList"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import TextMore from "@/components/text-more"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { useEffect } from "react"
import AnnualCalendarForm from "./form"
import useAnnualCalendar from "./handlers"




const SetupAnnualCalenders = () => {

    const { calendars, getAllCalendars, current, setCurrent, isPending, form, setForm, handleSubmit, onDelete, confirmationProps } = useAnnualCalendar()

    useEffect(() => {
        getAllCalendars()
    }, [])

    return (
        <section className="flex flex-col pb-16 gap-y-5 h-full">

            {/* Action */}
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Calenders</h1>
                <PermissionProtectedAction action='create' module='Annual Calendar'>
                    <Button size='sm' onClick={() => { setForm(true) }}>
                        <Plus /> Add Calendar
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            <ProtectedTable module="Annual Calendar" renderTable={(show, canUpdate, canDelete) => (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            {show && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {calendars.map((item) => {
                            return <TableRow key={item.id}>
                                <TableCell className="whitespace-nowrap">{item.date}</TableCell>
                                <TableCell className="whitespace-nowrap">{item.to}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell><TextMore text={item.description} /></TableCell>
                                <TableActions
                                    show={show}
                                    canUpdate={canUpdate}
                                    canDelete={canDelete}
                                    onEdit={() => {
                                        setCurrent(item)
                                        setForm(true)
                                    }}
                                    onDelete={() => onDelete(item.id)}
                                />
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            )} />

            <EmptyList length={calendars.length} message="No News Found" />


            {/* Alert model */}
            {confirmationProps.isOpen && (
                <AlertModel
                    cancel={() => confirmationProps.onCancel()}
                    continue={() => confirmationProps.onConfirm()} />
            )}

            {/* Form */}
            {form &&
                <AnnualCalendarForm
                    isPending={isPending}
                    editDetails={current!}
                    Submit={handleSubmit}
                    onClick={() => { setForm(false); setCurrent(null) }}
                />
            }

        </section>
    )
}

export default SetupAnnualCalenders