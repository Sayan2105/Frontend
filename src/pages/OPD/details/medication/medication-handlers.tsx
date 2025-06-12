import { medicationFormSchema } from "@/formSchemas/medicationFormSchema"
import { useConfirmation } from "@/hooks/useConfirmation"
import medicationApi from "@/services/medication-api"
import { medicationDetail, opdMedications } from "@/types/opd_section/medication"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { z } from "zod"




const useMedicationHandlers = (params?: Params) => {

    const { opdId, ipdId } = useParams()
    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [form, setForm] = useState(false)
    const [medications, setMedications] = useState<opdMedications>({ data: [], total_pages: 1 })
    const [current, setCurrent] = useState<medicationDetail | undefined>(undefined)


    // handling both upsert
    const handleSubmit = async (formData: z.infer<typeof medicationFormSchema>) => {
        try {
            let data;
            setPending(true)
            current ?
                (data = await medicationApi.updateMedication(current.id, formData), setCurrent(undefined))
                :
                (data = await medicationApi.createMedication(formData, { opdId, ipdId }))

            toast.success(data.message)
            setForm(false)
            getMedications()
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    const getMedications = async () => {
        try {
            const data = await medicationApi.getMedications({ ...params, opdId, ipdId })
            setMedications(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const getMedicationDetails = async (id: number) => {
        try {
            setModalLoading(true)
            const data = await medicationApi.getMedicationById(id)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setModalLoading(false) }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await medicationApi.deleteMedication(id)
            toast.success(data.message)
            getMedications()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        medications,
        getMedications,
        current,
        setCurrent,
        getMedicationDetails,
        isPending,
        modalLoading,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps
    }

}

export default useMedicationHandlers