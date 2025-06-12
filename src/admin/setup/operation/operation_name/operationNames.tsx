import AlertModel from '@/components/alertModel'
import LoaderModel from '@/components/loader'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useConfirmation } from '@/hooks/useConfirmation'
import { operationNameType } from '@/types/setupTypes/setupOpeartion'
import { Plus, } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { createOperationName, deleteOperationName, getOperationNameDetails, getOperationNames, updateOperationName } from '../service'
import AddOperationNameModel, { AddOperationNameFormSchema } from './addOperationNameModel'

const OperationNames = () => {

    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)
    const [isLoader, setLoader] = useState<boolean>(false)


    // model states
    const [isAddOperNameFormVisible, setAddOperNameFormVisible] = useState<boolean>(false)


    // API States
    const [operationNames, setoperationNames] = useState<operationNameType[]>([])
    const [operationNameDetails, setoperationNameDetails] = useState<operationNameType | undefined>(undefined)


    // handling both upsert
    const handleSubmit = async (formData: z.infer<typeof AddOperationNameFormSchema>) => {
        try {
            setPending(true)
            let data;
            if (operationNameDetails) {
                data = await updateOperationName(operationNameDetails.id, formData)
                setoperationNameDetails(undefined)
            } else {
                data = await createOperationName(formData)
            }
            fetchOperationNames()
            setAddOperNameFormVisible(false)
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
        }
    }


    // fetching list
    const fetchOperationNames = async () => {
        try {
            const data = await getOperationNames()
            setoperationNames(data)
        } catch ({ message }: any) {
            toast.error(message);
        }
    }


    // fetching particular details

    const fetchOperationNameDetails = async (id: number) => {
        try {
            setLoader(true)
            const data = await getOperationNameDetails(id)
            setoperationNameDetails(data)
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setLoader(false)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await deleteOperationName(id)
            toast.success(data.message)
            fetchOperationNames()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchOperationNames()
    }, [])


    return (
        <section className="flex flex-col gap-y-5 pb-16">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Operations List</h1>
                <PermissionProtectedAction action='create' module='Setup Operation'>
                    <Button size='sm' onClick={() => { setAddOperNameFormVisible(true) }}>
                        <Plus /> Add Operation
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            {/* <div className="sm:w-48 space-y-1">
                <p className="text-sm text-gray-700">Search</p>
                <Input type="text" onChange={(e) => { onSearch(e.target.value) }} placeholder="name , category" />
            </div> */}

            {/* <Separator /> */}

            <div className="flex flex-col min-h-[70vh] gap-y-16">
                {/* child 1 */}
                <div className="flex-1">
                    <ProtectedTable module='Setup Operation' renderTable={(show, canUpdate, canDelete) => (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    {show && <TableHead>Action</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {operationNames.map((name) => {
                                    return <TableRow key={name.id}>
                                        <TableCell>{name.id}</TableCell>
                                        <TableCell>{name.name}</TableCell>
                                        <TableCell>{name.category.name}</TableCell>
                                        <TableActions
                                            show={show}
                                            canUpdate={canUpdate}
                                            canDelete={canDelete}
                                            onEdit={async () => {
                                                await fetchOperationNameDetails(name.id)
                                                setAddOperNameFormVisible(true)
                                            }}
                                            onDelete={() => onDelete(name.id)}
                                        />
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    )} />
                </div>
            </div>


            {/* Mdoels */}

            {isAddOperNameFormVisible && <AddOperationNameModel
                operationNameDetails={operationNameDetails!}
                Submit={handleSubmit}
                isPending={isPending}
                onClick={() => { setAddOperNameFormVisible(false); setoperationNameDetails(undefined) }}
            />}


            {/* Loader model */}

            {isLoader && <LoaderModel />}


            {/* AlertModel */}

            {confirmationProps.isOpen && (
                <AlertModel
                    cancel={() => confirmationProps.onCancel()}
                    continue={() => confirmationProps.onConfirm()}
                />
            )}
        </section>
    )
}

export default OperationNames