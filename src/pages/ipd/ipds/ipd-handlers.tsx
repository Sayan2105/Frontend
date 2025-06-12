import { CreateIpdSchema } from "@/formSchemas/create-ipd-schema"
import { errorHandler } from "@/helpers/error-handler.ts"
import { useConfirmation } from "@/hooks/useConfirmation"
import IpdApi from "@/services/ipd-api"
import { IpdInfo, IpdInvoice, IpdOverviewType, PaginatedIpdType } from "@/types/IPD/ipd"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { z } from "zod"




const useIpdHandlers = () => {

    const { ipdId } = useParams()
    const { confirm, confirmationProps } = useConfirmation()
    const [form, setForm] = useState(false)
    const [isPending, setPending] = useState(false)
    const [current, setCurrent] = useState<IpdInfo | null>(null)
    const [ipds, setIpds] = useState<PaginatedIpdType>({ data: [], total_pages: 0 })
    const [overview, setOverview] = useState<IpdOverviewType | null>(null)
    const [invoice, setInvoice] = useState<IpdInvoice | null>(null)


    const handleSubmit = async (formData: z.infer<typeof CreateIpdSchema>) => {
        try {
            setPending(true)
            let data;
            current ? (
                data = await IpdApi.updateIpd(current.id, formData),
                setCurrent(null)
            ) : (
                data = await IpdApi.createIpd(formData)
            );
            toast.success(data.message);
            setForm(false)
            await fetchIpds()
        } catch (error) {
            toast.error(errorHandler(error))
        } finally {
            setPending(false)
        }
    }


    const fetchIpds = async (params?: Params) => {
        try {
            const data = await IpdApi.getIpds(params)
            setIpds(data)
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }


    const fetchIpdInfo = async (ipdId: string) => {
        try {
            setPending(true)
            const data = await IpdApi.getIpdInfo(ipdId)
            setCurrent(data)
        } catch (error) {
            toast.error(errorHandler(error))
        } finally {
            setPending(false)
        }
    }


    const onDelete = async (id: string) => {
        // @ts-ignore
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await IpdApi.deleteIpd(id)
            toast.success(data.message)
            await fetchIpds()
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }


    const getIpdOverview = async () => {
        try {
            const data = await IpdApi.getIpdOverview(ipdId!)
            setOverview(data)
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }


    const getIpdInvoice = async (ipdId: string) => {
        try {
            const data = await IpdApi.getIpdBillByIpdId(ipdId!)
            setInvoice(data)
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }


    return {
        ipds,
        fetchIpds,
        overview,
        getIpdOverview,
        current,
        setCurrent,
        fetchIpdInfo,
        isPending,
        setPending,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps,

        // invoice
        invoice,
        setInvoice,
        getIpdInvoice
    }
}

export default useIpdHandlers