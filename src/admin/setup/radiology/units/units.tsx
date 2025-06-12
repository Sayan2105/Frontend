import AlertModel from '@/components/alertModel'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useConfirmation } from '@/hooks/useConfirmation'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createRadiologytUnit, deleteRadiologytUnit, getRadiologytUnits } from '../service'
import CreateRadiologyUnit, { RadioUnitSchema } from './createRadioUnit'



export interface RadiologyUnitType {
    "id": number,
    "name": string
}


const RadiologyUnits = () => {

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)


    // model states
    const [isUnitForm, setUnitForm] = useState<boolean>(false)


    // API States
    const [unitsList, setUnitsList] = useState<RadiologyUnitType[]>([])


    // performing upsert
    const handleSubmit = async (formData: z.infer<typeof RadioUnitSchema>) => {
        try {
            setPending(true)
            const data = await createRadiologytUnit(formData)
            toast.success(data.message)
            setUnitForm(false)
            fetchUnits()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    // fetching list

    const fetchUnits = async () => {
        try {
            const data = await getRadiologytUnits()
            setUnitsList(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // deleting details
    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteRadiologytUnit(id)
            toast.success(data.message)
            fetchUnits()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    useEffect(() => {
        fetchUnits()
    }, [])


    return (
        <section className="flex flex-col pb-16 gap-y-5">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Unit List</h1>
                <PermissionProtectedAction action='create' module='Radiology Unit'>
                    <Button size='sm' onClick={() => { setUnitForm(true) }}>
                        <Plus /> Add Unit
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            <ProtectedTable module='Radiology Unit' renderTable={(show, canUpdate, canDelete) => (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className=''>Unit Names</TableHead>
                            {show && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {unitsList.map((unit) => {
                            return <TableRow key={unit.id}>
                                <TableCell>{unit.name}</TableCell>
                                <TableActions
                                    show={show}
                                    canUpdate={canUpdate}
                                    canDelete={canDelete}
                                    onDelete={() => onDelete(unit.id)}
                                    exclude={{ edit: true }}
                                />
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            )} />

            {/* Models */}

            {unitsList.length === 0 && <p className="text-center text-sm text-gray-500">No Units Found</p>}


            {/* form model */}
            {isUnitForm && (
                <CreateRadiologyUnit isPending={isPending} Submit={handleSubmit}
                    onClick={() => { setUnitForm(false) }}
                />
            )}


            {/* Alert model */}
            {confirmationProps.isOpen && <AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => confirmationProps.onConfirm()}
            />}

        </section>
    )
}


export default RadiologyUnits