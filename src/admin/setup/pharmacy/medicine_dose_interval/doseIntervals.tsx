import AlertModel from '@/components/alertModel'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useConfirmation } from '@/hooks/useConfirmation'
import { doseInterval } from '@/types/setupTypes/pharmacy'
import { Plus, } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createDoseInterval, deleteDoseInterval, getDoseIntervals } from '../service'
import DoseIntervalForm, { DoseIntervalFormSchema } from './doseIntervalForm'



const DoseIntervals = () => {

    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)

    const [form, setForm] = useState(false)

    // API States
    const [doseIntervals, setDoseIntervals] = useState<doseInterval[]>([])


    const handleSubmit = async (formData: z.infer<typeof DoseIntervalFormSchema>) => {
        try {
            setPending(true)
            const data = await createDoseInterval(formData)
            toast.success(data.message)
            setForm(false)
            fetchDoseIntervals()
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
            const data = await deleteDoseInterval(id)
            toast.success(data.message)
            fetchDoseIntervals()
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    const fetchDoseIntervals = async () => {
        try {
            const data = await getDoseIntervals()
            setDoseIntervals(data)
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    useEffect(() => {
        fetchDoseIntervals()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Dose Intervals</h1>
                <PermissionProtectedAction action='create' module='Dose Interval'>
                    <Button size='sm' onClick={() => setForm(true)}>
                        <Plus /> Add Interval
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />


            <ProtectedTable module='Dose Interval' renderTable={(show, canUpdate, canDelete) => (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Interval</TableHead>
                            {show && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doseIntervals.map((Interval) => (
                            <TableRow key={Interval.id}>
                                <TableCell>{Interval.id}</TableCell>
                                <TableCell>{Interval.interval}</TableCell>
                                <TableActions
                                    show={show}
                                    canUpdate={canUpdate}
                                    canDelete={canDelete}
                                    onDelete={() => onDelete(Interval.id)}
                                    exclude={{ edit: true }}
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )} />


            <EmptyList length={doseIntervals.length} />


            {/* Models */}

            {form && (
                <DoseIntervalForm
                    Submit={handleSubmit}
                    isPending={isPending}
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

export default DoseIntervals