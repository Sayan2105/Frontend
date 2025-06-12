import { chargeFormSchema } from "@/formSchemas/chargeFormSchema"
import { useConfirmation } from "@/hooks/useConfirmation"
import ChargeApi from "@/services/charges-api"
import { ChargeDetailsType, ChargeListType } from "@/types/opd_section/charges"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { z } from "zod"



const useChargeHandlers = (params: Params & { paymentId?: string }) => {

    const { opdId, ipdId } = useParams()
    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [form, setForm] = useState(false)
    const [charges, setCharges] = useState<ChargeListType>({ data: [], total_pages: 1 })
    const [current, setCurrent] = useState<ChargeDetailsType | null>(null)


    // handling create and update both
    const handleSubmit = async (formData: z.infer<typeof chargeFormSchema>) => {
        try {
            setPending(true)
            let data;
            current ? (data = await ChargeApi.updateCharge(current.id, formData), setCurrent(null))
                :
                (data = await ChargeApi.createCharges(formData, { opdId, ipdId }))

            toast.success(data.message)
            getCharges()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }



    const getCharges = async () => {
        try {
            const data = await ChargeApi.getCharges({ ...params, opdId, ipdId })
            setCharges(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // Fetching details for Details model and form on edit mode
    const getDetails = async (id: number) => {
        try {
            setModalLoading(true)
            const data = await ChargeApi.getChargeById(id)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setModalLoading(false) }
    }



    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await ChargeApi.deleteCharge(id)
            toast.success(data.message)
            getCharges()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        charges,
        getCharges,
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


export default useChargeHandlers