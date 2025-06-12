import { operationFormSchema } from "@/formSchemas/addOperationFormSchema"
import { useConfirmation } from "@/hooks/useConfirmation"
import OperationApi from "@/services/operation-api"
import { operationDetailsType, PaginatedOperations } from "@/types/opd_section/operationType"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { z } from "zod"



const useOperationHandlers = (params: Params) => {

    const { opdId, ipdId } = useParams()
    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [form, setForm] = useState(false)
    const [operations, setOperations] = useState<PaginatedOperations>({ data: [], total_pages: 1 })
    const [current, setCurrent] = useState<operationDetailsType | undefined>(undefined)



    const handleSubmit = async (formData: z.infer<typeof operationFormSchema>) => {
        try {
            setPending(true)
            let data;
            current ? (
                data = await OperationApi.updateOperation(current.id, formData),
                setCurrent(undefined)
            ) : (data = await OperationApi.createOperation(formData, { opdId, ipdId }))

            toast.success(data.message)
            getOperations() // refetching list
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const getOperations = async () => {
        try {
            const data = await OperationApi.getOperations({ ...params, opdId, ipdId })
            setOperations(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: string) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await OperationApi.deleteOperation(id)
            toast.success(data.message)
            getOperations()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    const getDetails = async (id: string) => {
        try {
            setModalLoading(true)
            const data = await OperationApi.getOperationById(id)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setModalLoading(false) }
    }


    return {
        operations,
        getOperations,
        current,
        setCurrent,
        getDetails,
        isPending,
        modalLoading,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps
    }
}

export default useOperationHandlers