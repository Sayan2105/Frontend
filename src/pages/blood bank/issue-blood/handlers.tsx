import { issueBloodSchema } from '@/formSchemas/blood-bank'
import { useConfirmation } from '@/hooks/useConfirmation'
import bloodBankApi from '@/services/blood-bank-api'
import { IssuedBloodInfo, PaginantedIssueBlood } from '@/types/blood-bank/blood-bank'
import { Params } from '@/types/type'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'




const useIssueBlood = (params: Params) => {

    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [current, setCurrent] = useState<IssuedBloodInfo | null>(null)
    const [issues, setIssues] = useState<PaginantedIssueBlood>({ data: [], total_pages: 0 })


    console.log('useIssueBlood');

    const handleSubmit = async (formData: z.infer<typeof issueBloodSchema>) => {
        try {
            let data; setPending(true)

            current ?
                (data = await bloodBankApi.updateIssueBlood(current.id, formData),
                    setCurrent(null))
                : (data = await bloodBankApi.issueBlood(formData))

            setForm(false)
            getIssueBloods()
            toast.success(data?.message)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    const getIssueBloods = async () => {
        try {
            const data = await bloodBankApi.getIssueBloods(params)
            setIssues(data)
        } catch ({ message }: any) { toast.error(message) }
    }


    const getIssuedBloodInfo = async (id: string) => {
        try {
            setPending(true)
            const data = await bloodBankApi.getIssueBloodById(id)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const onDelete = async (id: string) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await bloodBankApi.deleteIssueBlood(id)
            getIssueBloods()
            toast.success(data.message)
        } catch ({ message }: any) { toast.error(message) }
    }


    return {
        issues,
        getIssueBloods,
        current,
        setCurrent,
        form,
        setForm,
        handleSubmit,
        isPending,
        onDelete,
        getIssuedBloodInfo,
        confirmationProps,
    }
}

export default useIssueBlood