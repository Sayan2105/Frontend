import AlertModel from "@/components/alertModel"
import EmptyList from "@/components/emptyList"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useConfirmation } from "@/hooks/useConfirmation"
import { doseDuration } from "@/types/setupTypes/pharmacy"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { createDoseDuration, deleteDoseDuration, getDoseDurations } from "../service"
import DoseDurationForm from "./doseDurationForm"




const DoseDuration = () => {

    const { confirm, confirmationProps } = useConfirmation()


    // Loaders
    const [isPending, setPending] = useState<boolean>(false)

    const [form, setForm] = useState(false)

    // API States
    const [doseDurations, setDoseDurations] = useState<doseDuration[]>([])



    const handleSubmit = async (formData: any) => {
        try {
            setPending(true)
            const data = await createDoseDuration(formData)
            toast.success(data.message)
            setForm(false)
            fetchDoseDurations()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await deleteDoseDuration(id)
            toast.success(data.message)
            fetchDoseDurations()
        } catch ({ message }: any) {
            toast.error(message);
        }
    }



    const fetchDoseDurations = async () => {
        try {
            const data = await getDoseDurations()
            setDoseDurations(data)
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    useEffect(() => {
        fetchDoseDurations()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Dose Durations</h1>
                <PermissionProtectedAction action='create' module='Dose Duration'>
                    <Button size='sm' onClick={() => setForm(true)}>
                        <Plus /> Add Duration
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            <ProtectedTable module='Dose Duration' renderTable={(show, canUpdate, canDelete) => (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            {show && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doseDurations.map((doseDuration) => (
                            <TableRow key={doseDuration.id}>
                                <TableCell>{doseDuration.id}</TableCell>
                                <TableCell>{doseDuration.duration}</TableCell>
                                <TableActions
                                    show={show}
                                    canUpdate={canUpdate}
                                    canDelete={canDelete}
                                    onDelete={() => onDelete(doseDuration.id)}
                                    exclude={{ edit: true }}
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )} />


            <EmptyList length={doseDurations.length} />


            {/* Models */}

            {form && (
                <DoseDurationForm
                    isPending={isPending}
                    Submit={handleSubmit}
                    onClick={() => setForm(false)}
                />
            )}

            {confirmationProps.isOpen && (
                <AlertModel
                    continue={() => confirmationProps.onConfirm()}
                    cancel={() => confirmationProps.onCancel()}
                />
            )}

        </section>
    )
}

export default DoseDuration