import AlertModel from '@/components/alertModel'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useConfirmation } from '@/hooks/useConfirmation'
import { medicineGroup } from '@/types/setupTypes/pharmacy'
import { Plus, } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createMedicineGroup, deleteMedicineGroup, geteMedicineGroups } from '../service'
import MedicineGroupFrom, { MedicineGroupFromSchema } from './medicineGroupFrom'





const MedicineGroups = () => {

    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)


    // model states
    const [isMedGroupFormVisible, setMedGroupFormVisible] = useState<boolean>(false)


    // API States
    const [medicineGroups, setMedicineGroups] = useState<medicineGroup[]>([])


    const handleSubmit = async (formData: z.infer<typeof MedicineGroupFromSchema>) => {
        try {
            setPending(true)
            const data = await createMedicineGroup(formData)
            toast.success(data.message)
            setMedGroupFormVisible(false)
            fetchMedicineGroups()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
        }
    }


    const fetchMedicineGroups = async () => {
        try {
            const data = await geteMedicineGroups()
            setMedicineGroups(data)
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await deleteMedicineGroup(id)
            toast.success(data.message)
            fetchMedicineGroups()
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    useEffect(() => {
        fetchMedicineGroups()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lgfont-semibold">Groups</h1>
                <PermissionProtectedAction action='create' module='Medicine Group'>
                    <Button size='sm' onClick={() => { setMedGroupFormVisible(true) }}>
                        <Plus /> Add Group
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            <ProtectedTable module='Medicine Group' renderTable={(show, canUpdate, canDelete) => (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            {show && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {medicineGroups.map((group) => (
                            <TableRow key={group.id}>
                                <TableCell>{group.id}</TableCell>
                                <TableCell>{group.name}</TableCell>
                                <TableActions
                                    show={show}
                                    canUpdate={canUpdate}
                                    canDelete={canDelete}
                                    onDelete={() => onDelete(group.id)}
                                    exclude={{ edit: true }}
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )} />


            <EmptyList length={medicineGroups.length} />


            {/* Form model */}

            {isMedGroupFormVisible && (
                <MedicineGroupFrom
                    Submit={handleSubmit}
                    isPending={isPending}
                    onClick={() => {
                        setMedGroupFormVisible(false)
                    }}
                />
            )}

            {/* alert model */}

            {confirmationProps.isOpen && (
                <AlertModel
                    continue={() => confirmationProps.onConfirm()}
                    cancel={() => confirmationProps.onCancel()}
                />
            )}

        </section>
    )
}

export default MedicineGroups