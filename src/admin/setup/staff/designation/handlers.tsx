import { useConfirmation } from "@/hooks/useConfirmation"
import { useState } from "react"
import SetupStaffApi from "../api-handlers"
import toast from "react-hot-toast"

interface Designation {
    id: number,
    name: string
}

const useStaffDesignation = () => {

    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [designations, setDesignations] = useState<Designation[]>([])
    const [current, setCurrent] = useState<Designation | null>(null)


    const handleSubmit = async (formData: any) => {
        try {
            setPending(true)
            let data;
            current ? (
                data = await SetupStaffApi.updateDesignation(current.id, formData),
                setCurrent(null)
            ) : (data = await SetupStaffApi.createDesignation(formData))
            console.log(data)
            toast.success(data.message)
            getDesignations()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const getDesignations = async () => {
        try {
            const data = await SetupStaffApi.getDesignations()
            setDesignations(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await SetupStaffApi.deleteDesignation(id)
            toast.success(data.message)
            getDesignations()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        designations,
        getDesignations,
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

export default useStaffDesignation