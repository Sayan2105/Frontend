import { dischargeFormSchema } from "@/formSchemas/discharge"
import { useConfirmation } from "@/hooks/useConfirmation"
import { DischargeDataType } from "@/types/discharge/discharge"
import { OIParams } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import { createDischarge, deleteDischarge, getDischargeInfo } from "./api-handlers"





const useDischarge = (params: OIParams) => {

    const { confirm, confirmationProps } = useConfirmation()
    const [form, setForm] = useState(false)
    const [isPending, setPending] = useState(false)
    const [current, setCurrent] = useState<DischargeDataType | null>(null)
    const [refresh, setRefresh] = useState(false)


    const handleSubmit = async (formData: z.infer<typeof dischargeFormSchema>) => {
        try {
            setPending(true)
            const data = await createDischarge(formData, { opdId: params.opdId, ipdId: params.ipdId })
            toast.success(data.message)
            setForm(false)
            setRefresh(!refresh)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await deleteDischarge(id)
            setRefresh(!refresh)
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const fetchDischargeInfo = async (id: number) => {
        try {
            setPending(true)
            const data = await getDischargeInfo(id)
            setCurrent(data)

        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    return {
        handleSubmit,
        onDelete,
        getDischargeInfo: fetchDischargeInfo,
        isPending,
        form,
        setForm,
        current,
        setCurrent,
        refresh,
        confirmationProps
    }


}



export default useDischarge