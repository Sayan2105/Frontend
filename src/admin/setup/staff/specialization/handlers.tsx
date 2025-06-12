import { useConfirmation } from "@/hooks/useConfirmation"
import { useState } from "react"
import SetupStaffApi from "../api-handlers"
import toast from "react-hot-toast"

export interface Specialization {
    id: number,
    name: string
}

const useSpecialization = () => {

    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [specializations, setSpecializations] = useState<Specialization[]>([])
    const [current, setCurrent] = useState<Specialization | null>(null)


    const handleSubmit = async (formData: any) => {
        try {
            setPending(true)
            let data;
            current ? (
                data = await SetupStaffApi.updateSpecialization(current.id, formData),
                setCurrent(null)
            ) : (data = await SetupStaffApi.createSpecialization(formData))
            console.log(data)
            toast.success(data.message)
            getSpecializations()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const getSpecializations = async () => {
        try {
            const data = await SetupStaffApi.getSpecializations()
            setSpecializations(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await SetupStaffApi.deleteSpecialization(id)
            toast.success(data.message)
            getSpecializations()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        specializations,
        getSpecializations,
        current,
        setCurrent,
        isPending,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps
    }
}

export default useSpecialization