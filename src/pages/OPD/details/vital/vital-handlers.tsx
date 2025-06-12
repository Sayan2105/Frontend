import { getSetupVitals } from '@/admin/setup/vitals/service'
import { vitalFormSchema } from '@/formSchemas/vitalFormSchema'
import { useConfirmation } from '@/hooks/useConfirmation'
import VitalApi from '@/services/vital-api'
import { VitalType } from '@/types/opd_section/vitals'
import { SetupVital } from '@/types/setupTypes/vital'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { z } from 'zod'





const useVitalHandlers = () => {

    const { opdId, ipdId } = useParams()
    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [vitals, setVitals] = useState<VitalType[]>([])
    const [setupVitals, setSetupVitals] = useState<SetupVital[]>([])



    const handleSubmit = async (formData: z.infer<typeof vitalFormSchema>) => {
        try {
            setPending(true)
            const data = await VitalApi.createVital(formData, { opdId, ipdId })
            toast.success(data.message)
            setForm(false)
            getVitals()
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }

    const getVitals = async (search?: string) => {
        try {
            const data = await VitalApi.getVitals({ opdId, ipdId, search })
            setVitals(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await VitalApi.deleteVitals(id)
            toast.success(data.message)
            getVitals()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchSetupVitals = async () => {
        try {
            const data = await getSetupVitals()
            setSetupVitals(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        vitals,
        setupVitals,
        getVitals,
        getSetupVitals: fetchSetupVitals,
        isPending,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps
    }
}

export default useVitalHandlers