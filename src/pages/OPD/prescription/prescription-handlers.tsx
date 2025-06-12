import { createPrescriptionFormSchema } from "@/formSchemas/createPrescriptionFormSchema";
import { useConfirmation } from "@/hooks/useConfirmation";
import PrescriptionApi from "@/services/prescription-api";
import { prescriptionDetail, PrescriptionsType } from "@/types/opd_section/prescription";
import { OIParams } from "@/types/type";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";



const usePrescription = (params?: OIParams) => {

    const { confirm, confirmationProps } = useConfirmation()
    const [form, setForm] = useState(false)
    const [isPending, setPending] = useState(false)
    const [prescriptions, setPrescriptions] = useState<PrescriptionsType[]>([])
    const [current, setCurrent] = useState<prescriptionDetail | null>(null)
    const [refresh, setRefresh] = useState(false)


    // handling prescription
    const handleSubmit = async (formData: z.infer<typeof createPrescriptionFormSchema>) => {
        try {
            let data;
            setPending(true)
            current ?
                (data = await PrescriptionApi.updatePrescription(current.id, formData), setCurrent(null))
                :
                (data = await PrescriptionApi.createPrescription(formData, { opdId: params?.opdId, ipdId: params?.ipdId }))
            toast.success(data.message)
            setForm(false)
            setRefresh(!refresh)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    // fetching prescription details
    const getPrescriptionInfo = async (id: number) => {
        try {
            setPending(true)
            const data = await PrescriptionApi.getPrescriptionById(id)
            setCurrent(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    const getPrescriptions = async () => {
        try {
            const data = await PrescriptionApi.getPrescriptions(params!)
            setPrescriptions(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // deleting prescription

    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await PrescriptionApi.deletePrescription(id)
            toast.success(data.message)
            setRefresh(!refresh)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        prescriptions,
        getPrescriptions,
        handleSubmit,
        setForm,
        form,
        current,
        setCurrent,
        isPending,
        setPending,
        onDelete,
        getPrescriptionInfo,
        confirmationProps,
        refresh
    }
}


export default usePrescription