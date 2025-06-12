import { useConfirmation } from "@/hooks/useConfirmation"
import { useState } from "react"
import SetupStaffApi from "../api-handlers"
import toast from "react-hot-toast"

interface Department {
    id: number,
    name: string
}

const useStaffDepartment = () => {

    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [departments, setDepartments] = useState<Department[]>([])
    const [current, setCurrent] = useState<Department | null>(null)


    const handleSubmit = async (formData: any) => {
        try {
            setPending(true)
            let data;
            current ? (
                data = await SetupStaffApi.updateDepartment(current.id, formData),
                setCurrent(null)
            ) : (data = await SetupStaffApi.createDepartment(formData))
            console.log(data)
            toast.success(data.message)
            getDepartments()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const getDepartments = async () => {
        try {
            const data = await SetupStaffApi.getDepartments()
            setDepartments(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await SetupStaffApi.deleteDepartment(id)
            toast.success(data.message)
            getDepartments()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        departments,
        getDepartments,
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

export default useStaffDepartment