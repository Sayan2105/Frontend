import { z } from "zod"
import { AnnualCalendarSchema } from "./form"
import toast from "react-hot-toast"
import { useConfirmation } from "@/hooks/useConfirmation"
import { useState } from "react"
import { AnnualCalendarType } from "@/types/setupTypes/homepage"
import homapeageApi from "../../services/homepage"

const useAnnualCalendar = () => {

    const { confirm, confirmationProps } = useConfirmation()
    const [form, setForm] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [current, setCurrent] = useState<AnnualCalendarType | null>(null)
    const [calendars, setCalendars] = useState<AnnualCalendarType[]>([])


    async function handleSubmit(formData: z.infer<typeof AnnualCalendarSchema>) {
        try {
            console.log('hello');

            let data; setIsPending(true)
            if (current) {
                data = await homapeageApi.updateAnnualCalendar(current.id, formData)
                setCurrent(null)
            } else {
                data = await homapeageApi.createAnnualCalendar(formData)
            }
            setIsPending(false)
            setForm(false)
            getAllCalendars()
            toast.success(data.message)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    async function getAllCalendars() {
        try {
            const data = await homapeageApi.getAllAnnualCalendar()
            setCalendars(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    async function onDelete(id: number) {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return
            const data = await homapeageApi.deleteAnnualCalendar(id)
            toast.success(data.message)
            getAllCalendars()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    return {
        calendars,
        getAllCalendars,
        current,
        setCurrent,
        isPending,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps,
    }
}

export default useAnnualCalendar