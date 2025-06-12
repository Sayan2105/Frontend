import AlertModel from "@/components/alertModel"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useConfirmation } from "@/hooks/useConfirmation"
import { SetupVital } from "@/types/setupTypes/vital"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import { createSetupVital, deleteSetupVital, getSetupVitalDetails, getSetupVitals, updateSetupVital } from "./service"
import SetupVitalForm, { SetupVitalFormSchema } from "./setupVitalForm"




const SetupVitals = () => {

    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [loading, setloading] = useState({ inline: false, model: false })

    // API states
    const [vitals, setVitals] = useState<SetupVital[]>([])
    const [vitalDetails, setVitalDetails] = useState<SetupVital>()

    const [form, setForm] = useState(false)



    const handleSubmit = async (formData: z.infer<typeof SetupVitalFormSchema>) => {
        try {
            setloading(prev => ({ ...prev, inline: true }))
            let data;
            vitalDetails ? (data = await updateSetupVital(vitalDetails.id, formData),
                setVitalDetails(undefined))
                :
                data = await createSetupVital(formData)
            toast.success(data.message)
            fetchSetupVitals()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setloading(prev => ({ ...prev, inline: false })) }
    }



    const fetchSetupVitals = async () => {
        try {
            const data = await getSetupVitals()
            setVitals(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchVitalDetails = async (id: number) => {
        try {
            setloading(prev => ({ ...prev, model: true }))
            const data = await getSetupVitalDetails(id)
            setVitalDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setloading(prev => ({ ...prev, model: false })) }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await deleteSetupVital(id)
            toast.success(data.message)
            fetchSetupVitals()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchSetupVitals()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16 pt-5 px-2.5">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Vitals</h1>
                <PermissionProtectedAction action='create' module='Setup Vital'>
                    <Button size='sm' onClick={() => setForm(true)}>
                        <Plus /> Add Vital
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />


            <ProtectedTable module='Setup Vital' renderTable={(show, canUpdate, canDelete) => (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Reference Range</TableHead>
                            <TableHead>Unit</TableHead>
                            {show && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vitals.map((vital) => (
                            <TableRow>
                                <TableCell>{vital.name}</TableCell>
                                <TableCell>{vital.from} {'- ' + vital.to}</TableCell>
                                <TableCell>{vital.unit}</TableCell>
                                <TableActions
                                    show={show}
                                    canUpdate={canUpdate}
                                    canDelete={canDelete}
                                    onDelete={() => onDelete(vital.id)}
                                    onEdit={async () => {
                                        await fetchVitalDetails(vital.id)
                                        setForm(true)
                                    }}
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )} />


            {form && <SetupVitalForm
                setupVitalDetails={vitalDetails!}
                Submit={handleSubmit}
                isPending={loading.inline}
                onClick={() => { setForm(false); setVitalDetails(undefined) }}
            />}


            {/* loader model */}

            {loading.model && <LoaderModel />}

            {confirmationProps.isOpen && (
                <AlertModel
                    continue={() => confirmationProps.onConfirm()}
                    cancel={() => confirmationProps.onCancel()}
                />
            )}
        </section>

    )
}

export default SetupVitals