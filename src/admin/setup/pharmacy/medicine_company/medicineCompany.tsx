import AlertModel from '@/components/alertModel'
import EmptyList from '@/components/emptyList'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useConfirmation } from '@/hooks/useConfirmation'
import { medicineComapny } from '@/types/setupTypes/pharmacy'
import { Plus, } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createMedicineCompany, deleteMedicineCompany, getMedicineCompanies } from '../service'
import MedicineCompanyForm, { MedicineCompanyFormSchema } from './medicineCompanyForm'




const MedicineCompany = () => {

    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)

    const [form, setForm] = useState(false)


    // API States
    const [medicineCompanies, setMedicineCompanies] = useState<medicineComapny[]>([])


    const handleSubmit = async (formData: z.infer<typeof MedicineCompanyFormSchema>) => {
        try {
            setPending(true)
            const data = await createMedicineCompany(formData)
            toast.success(data.message)
            setForm(false)
            fetchMedicineComapnies()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
        }
    }


    const fetchMedicineComapnies = async () => {
        try {
            const data = await getMedicineCompanies()
            setMedicineCompanies(data)
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await deleteMedicineCompany(id)
            toast.success(data.message)
            fetchMedicineComapnies()
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    useEffect(() => {
        fetchMedicineComapnies()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Comapnies</h1>
                <PermissionProtectedAction action='create' module='Medicine Company'>
                    <Button size='sm' onClick={() => { setForm(true) }}>
                        <Plus /> Add Company
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            <ProtectedTable module='Medicine Company' renderTable={(show, canUpdate, canDelete) => (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            {show && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {medicineCompanies.map((company) => (
                            <TableRow key={company.id}>
                                <TableCell>{company.id}</TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableActions
                                    show={show}
                                    canUpdate={canUpdate}
                                    canDelete={canDelete}
                                    onDelete={() => onDelete(company.id)}
                                    exclude={{ edit: true }}
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )} />


            <EmptyList length={medicineCompanies.length} />


            {/* Form model */}

            {form && (
                <MedicineCompanyForm
                    Submit={handleSubmit}
                    isPending={isPending}
                    onClick={() => setForm(false)}
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



export default MedicineCompany