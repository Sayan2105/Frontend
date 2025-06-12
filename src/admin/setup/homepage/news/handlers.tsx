import { useConfirmation } from "@/hooks/useConfirmation"
import { paginatedNews } from "@/types/setupTypes/homepage"
import { useState } from "react"
import { newsSchems } from "./news"
import { z } from "zod"
import toast from "react-hot-toast"
import homapeageApi from "../../services/homepage"
import { Params } from "@/types/type"


const useLatestNews = (params: Params) => {

    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [news, setNews] = useState<paginatedNews>({ data: [], total_pages: 0 })
    const [current, setCurrent] = useState<paginatedNews['data'][0] | null>(null)


    const handleSubmit = async (newsData: z.infer<typeof newsSchems>) => {
        try {
            let data; setPending(true)
            const formData = new FormData()

            Object.entries(newsData).forEach(([key, value]) => {
                if (!value) return
                if (key === 'pdf') {
                    formData.append('pdf', value)
                } else {
                    formData.append(key, value) // cause everything here a string
                }
            })

            if (current) {
                data = await homapeageApi.updateNews(current.id, formData);
                setCurrent(null);
            } else {
                data = await homapeageApi.createNews(formData);
            }
            toast.success(data.message)
            getAllNews()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    const getAllNews = async () => {
        try {
            const data = await homapeageApi.getNews(params)
            setNews(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await homapeageApi.deleteNews(id)
            toast.success(data.message)
            getAllNews()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        news,
        current,
        setCurrent,
        isPending,
        form,
        setForm,
        handleSubmit,
        getAllNews,
        onDelete,
        confirmationProps,
    }
}

export default useLatestNews