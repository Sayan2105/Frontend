import { AuthContext } from "@/contexts/authContext"
import { patientRegistrationSchema } from "@/formSchemas/patientRegisterFormSchema"
import { ResetPasswordForm } from "@/formSchemas/resetPasswordFormSchema"
import { useConfirmation } from "@/hooks/useConfirmation"
import PatientApi from "@/services/patient-api"
import { PatientDetails } from "@/types/patient/patient"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { z } from "zod"



const usePatient = () => {
    const { authUser, logout } = useContext(AuthContext)
    const { confirm, confirmationProps } = useConfirmation()
    const [form, setForm] = useState(false)
    const [isPending, setPending] = useState(false)
    const [current, setCurrent] = useState<PatientDetails | null>(null)
    const router = useNavigate()


    const handlePatient = async (patientData: z.infer<typeof patientRegistrationSchema>, afterSubmit?: (id: number) => void) => {
        try {
            const formData = new FormData()

            const {confirm_password , ...restData} = patientData

            for (const [key, value] of Object.entries(restData)) {
                if (!value) continue
                if (key === 'image') {
                    formData.append('image', value as any)
                } else {
                    formData.append(key, JSON.stringify(value))
                }
            }
            let data; setPending(true)
            current ? (
                data = await PatientApi.updatePatient(current.id, formData)
            ) : (
                data = await PatientApi.createPatient(formData)
            )
            toast.success(data.message)
            setForm(false)
            afterSubmit && afterSubmit(data.id)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setPending(false)
        }
    }


    const getPatientById = async (id: number) => {
        try {
            setPending(true)
            const data = await PatientApi.getPatientById(id)
            setCurrent(data)
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
            const data = await PatientApi.deletePatient(id)
            toast.success(data.message)
            if (authUser?.role === 'patient') {
                logout()
                return
            }
            router(`/admin/setup/patient`)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onResetPassword = async (id: number, formData: z.infer<typeof ResetPasswordForm>) => {
        try {
            setPending(true)
            const data = await PatientApi.resetPassword(id, formData.password)
            toast.success(data.message)
            router(`../profile/${id}`)
        } catch ({ message }: any) {
            toast.error(message)
        }
        finally {
            setPending(false)
        }
    }


    return {
        current,
        setCurrent,
        form,
        setForm,
        handlePatient,
        getPatientById,
        onResetPassword,
        onDelete,
        isPending,
        confirmationProps
    }


}



export default usePatient