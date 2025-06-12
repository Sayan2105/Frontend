import { useConfirmation } from "@/hooks/useConfirmation"
import { HomeEventType } from "@/types/setupTypes/homepage"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import homapeageApi from "../../services/homepage"
import { homeEventSchema } from "./events"

const useHomeEvent = (params: Params) => {

    const { confirm, confirmationProps } = useConfirmation()
    const [form, setForm] = useState(false)
    const [isPending, setPending] = useState(false)
    const [current, setCurrent] = useState<HomeEventType['data'][0] | null>(null)
    const [events, setEvents] = useState<HomeEventType>({ data: [], total_pages: 0 })


    const handleSubmit = async (formData: z.infer<typeof homeEventSchema>) => {
        try {
            setPending(true)
            let data;
            if (current) {
                (data = await homapeageApi.updateHomeEvent(current.id, formData),
                    setCurrent(null))
            } else {
                data = await homapeageApi.createHomeEvent(formData)
            }
            setPending(false)
            toast.success(data.message)
            setForm(false)
            getAllEvents()
        } catch ({ message }: any) {
            toast.error(message)
            setPending(false)
        }
    }

    const getAllEvents = async () => {
        try {
            const data = await homapeageApi.getAllHomeEvents(params)
            setEvents(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await homapeageApi.deleteHomeEvent(id);
            toast.success(data.message)
            getAllEvents()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    return {
        events,
        getAllEvents,
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

export default useHomeEvent