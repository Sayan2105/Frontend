import AlertModel from "@/components/alertModel"
import EmptyList from "@/components/emptyList"
import LoaderModel from "@/components/loader"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useConfirmation } from "@/hooks/useConfirmation"
import { PathParametersType } from "@/types/setupTypes/pathology"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import { createPathologyParameter, deletePathologytParameter, getPathologytParameterDetails, getPathologytParameters, updatePathologytParameter } from "../service"
import CreatePathParameter, { CreatPathParameterSchema } from "./create-path-parameter"




const SetupPathParameters = () => {

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [loading, setloading] = useState<{ inline: boolean, model: boolean }>({ inline: false, model: false })

    // API states
    const [parameters, setParameters] = useState<PathParametersType[]>([])
    const [parameterDetails, setParameterDetails] = useState<PathParametersType | undefined>(undefined)

    // model states
    const [isParameterForm, setParameterForm] = useState(false)


    // doing both upsert
    const handleSubmit = async (formData: z.infer<typeof CreatPathParameterSchema>) => {
        try {
            setloading(prev => ({ ...prev, inline: true }))
            let data;
            parameterDetails ? (data = await updatePathologytParameter(parameterDetails.id, formData),
                setParameterDetails(undefined))
                :
                data = await createPathologyParameter(formData)
            toast.success(data.message)
            fetchParameters()
            setParameterForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setloading(prev => ({ ...prev, inline: false })) }
    }



    const fetchParameters = async () => {
        try {
            const data = await getPathologytParameters()
            setParameters(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchParameterDetails = async (id: number) => {
        try {
            setloading(prev => ({ ...prev, model: true }))
            const data = await getPathologytParameterDetails(id)
            setParameterDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setloading(prev => ({ ...prev, model: false })) }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deletePathologytParameter(id)
            toast.success(data.message)
            fetchParameters()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchParameters()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16 pt-5">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Radiology Parameters</h1>
                <PermissionProtectedAction action='create' module='Pathology Parameter'>
                    <Button size='sm' onClick={() => setParameterForm(true)}>
                        <Plus /> Add Parameter
                    </Button>
                </PermissionProtectedAction>
            </div>


            <Separator />


            <ProtectedTable module='Pathology Parameter' renderTable={(show, canUpdate, canDelete) => (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Reference Range</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Note</TableHead>
                            {show && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {parameters.map((parameter) => (
                            <TableRow>
                                <TableCell>{parameter.name}</TableCell>
                                <TableCell>{parameter.from} {'- ' + parameter.to}</TableCell>
                                <TableCell>{parameter.unit.name}</TableCell>
                                <TableCell>{parameter.note}</TableCell>
                                <TableActions
                                    show={show}
                                    canUpdate={canUpdate}
                                    canDelete={canDelete}
                                    onDelete={() => onDelete(parameter.id)}
                                    onEdit={async () => {
                                        await fetchParameterDetails(parameter.id)
                                        setParameterForm(true)
                                    }}
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )} />


            <EmptyList length={parameters.length} message="No Parameters Found" />


            {isParameterForm && <CreatePathParameter
                editDetails={parameterDetails!}
                Submit={handleSubmit}
                isPending={loading.inline}
                onClick={() => { setParameterForm(false), setParameterDetails(undefined) }}
            />}

            {/* loader model */}

            {loading.model && <LoaderModel />}

            {confirmationProps.isOpen && (
                <AlertModel
                    cancel={() => confirmationProps.onCancel()}
                    continue={() => confirmationProps.onConfirm()}
                />
            )}
        </section>

    )
}



export default SetupPathParameters