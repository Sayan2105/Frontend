import { paymentFormSchema } from "@/formSchemas/paymentFormSchema"
import { useConfirmation } from "@/hooks/useConfirmation"
import PaymentApi from "@/services/payment-api"
import { Payment, paymentData } from "@/types/opd_section/payment"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { z } from "zod"



const usePaymentHandlers = (params: Params) => {

    const { opdId, ipdId } = useParams()
    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [payments, setPayments] = useState<Payment>({ data: [], total_pages: 1 })
    const [current, setCurrent] = useState<paymentData | null>(null)



    const handleSubmit = async (formData: z.infer<typeof paymentFormSchema>) => {
        try {
            setPending(true)
            let data;
            current ?
                (data = await PaymentApi.updatePayment(current.id, formData), setCurrent(null))
                :
                (data = await PaymentApi.createPayment(formData, { opdId, ipdId }))
            toast.success(data.message)
            fetchPaymets()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    // Fetching list
    const fetchPaymets = async () => {
        try {
            const data = await PaymentApi.getPayments({ ...params, opdId, ipdId })
            setPayments(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // Delete payment
    const onDelete = async (id: string) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await PaymentApi.deletePayment(id)
            toast.success(data.message)
            fetchPaymets()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    return {
        payments,
        getPayments: fetchPaymets,
        current,
        setCurrent,
        onDelete,
        isPending,
        form,
        setForm,
        handleSubmit,
        confirmationProps
    }
}

export default usePaymentHandlers