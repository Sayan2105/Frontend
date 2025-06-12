import { bloodComponentSchema } from '@/formSchemas/blood-bank'
import { useConfirmation } from '@/hooks/useConfirmation'
import bloodBankApi from '@/services/blood-bank-api'
import { PaginantedBloodComponents } from '@/types/blood-bank/blood-bank'
import { Params } from '@/types/type'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'

const useBloodComponent = (params: Params) => {

    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [bloodComponents, setBloodComponents] = useState<PaginantedBloodComponents>({ data: [], total_pages: 0 })


    const handleSubmit = async (formData: z.infer<typeof bloodComponentSchema>) => {
        try {
            setPending(true)
            const data = await bloodBankApi.createBloodComponent(formData)
            setForm(false)
            getBloodComponents()
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const getBloodComponents = async () => {
        try {
            const data = await bloodBankApi.getBloodComponents(params)
            setBloodComponents(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await bloodBankApi.deleteBloodComponent(id)
            toast.success(data.message)
            getBloodComponents()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        bloodComponents,
        getBloodComponents,
        handleSubmit,
        onDelete,
        confirmationProps,
        isPending,
        form,
        setForm
    }
}

export default useBloodComponent