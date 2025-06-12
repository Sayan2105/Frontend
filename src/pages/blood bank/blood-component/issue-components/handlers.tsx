import { issueBloodComponentSchema } from '@/formSchemas/blood-bank'
import { useConfirmation } from '@/hooks/useConfirmation'
import bloodBankApi from '@/services/blood-bank-api'
import { IssuedBloodComponentInfo, PaginantedBloodComponentIssue } from '@/types/blood-bank/blood-bank'
import { Params } from '@/types/type'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'



const useBloodComponentIssue = (params: Params) => {

    const { confirm, confirmationProps } = useConfirmation()
    const [form, setForm] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [issuedComponents, setIssuedComponents] = useState<PaginantedBloodComponentIssue>({ data: [], total_pages: 0 })
    const [current, setCurrent] = useState<IssuedBloodComponentInfo>()


    const handleSubmit = async (formData: z.infer<typeof issueBloodComponentSchema>) => {
        try {
            setIsPending(true)
            const data = await bloodBankApi.issueBloodComponent(formData)
            toast.success(data.message)
            setIsPending(false)
            setForm(false)
            getIssuedComponents()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    const getIssuedComponents = async () => {
        try {
            const data = await bloodBankApi.getIssueBloodComponents(params)
            setIssuedComponents(data)
        } catch ({ message }: any) { toast.error(message) }
    }


    const getIssuedComponentById = async (id: string) => {
        try {
            setIsPending(true)
            const data = await bloodBankApi.getIssueBloodComponentById(id)
            setCurrent(data)
        } catch ({ message }: any) { toast.error(message) }
        finally { setIsPending(false) }
    }


    const onDelete = async (id: string) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return
            const data = await bloodBankApi.deleteIssueBloodComponent(id)
            getIssuedComponents()
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    return {
        issuedComponents,
        getIssuedComponents,
        current,
        setCurrent,
        getIssuedComponentById,
        handleSubmit,
        onDelete,
        isPending,
        confirmationProps,
        form,
        setForm
    }
}



export default useBloodComponentIssue