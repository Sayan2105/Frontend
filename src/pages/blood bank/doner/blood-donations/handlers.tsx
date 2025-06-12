import { bloodDonationSchema } from "@/formSchemas/blood-bank"
import { useConfirmation } from "@/hooks/useConfirmation"
import bloodBankApi from "@/services/blood-bank-api"
import { PaginatedDonations } from "@/types/blood-bank/blood-bank"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"




const useDonations = (params: Params) => {


    const { confirm, confirmationProps } = useConfirmation()
    const [donations, setDonations] = useState<PaginatedDonations>({ data: [], total_pages: 0 })
    const [current, setCurrent] = useState<PaginatedDonations['data'][0] | null>(null)
    const [isPending, setPending] = useState<boolean>(false)
    const [form, setForm] = useState(false)


    console.log('Donations Hook');


    const handleSubmit = async (formData: z.infer<typeof bloodDonationSchema>) => {
        try {
            let data; setPending(true)

            current ?
                (data = await bloodBankApi.updateDonation(current.id, formData),
                    setCurrent(null))
                : (data = await bloodBankApi.createDonation(formData))

            setForm(false)
            getDonations()
            toast.success(data?.message)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    const getDonations = async () => {
        try {
            const data = await bloodBankApi.getDonations(params)
            setDonations(data)
        } catch ({ message }: any) { toast.error(message) }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await bloodBankApi.deleteDonation(id)
            toast.success(data.message)
            getDonations()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    return {
        donations,
        getDonations,
        current,
        setCurrent,
        form,
        setForm,
        handleSubmit,
        isPending,
        onDelete,
        confirmationProps
    }
}

export default useDonations