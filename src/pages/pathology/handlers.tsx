import { LabReportFormSchema } from "@/formSchemas/approvedBYschema"
import { createRadiologyBillSchema } from "@/formSchemas/createRadiologyBill"
import { sampleCollectionSchema } from "@/formSchemas/sampleCollectionSchema"
import { useConfirmation } from "@/hooks/useConfirmation"
import PathologyApi from "@/services/pathology-api"
import { PaginatedPathologyBills, PathologyBillDeatils, PathologySampleCollectionDet, PathTestReport } from "@/types/pathology/pathology"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"

const usePathology = (params?: Params) => {

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()
    const [form, setForm] = useState(false)
    const [isLodaing, setLoading] = useState(false)
    const [current, setCurrent] = useState<PathologyBillDeatils>()
    const [pathoBills, setPathoBills] = useState<PaginatedPathologyBills>({ data: [], total_pages: 0 })
    const [isRefresh, setRefresh] = useState(false)

    // sample collection
    const [collectionForm, setCollectionForm] = useState(false)
    const [collectionDetails, setCollectionDetails] = useState<PathologySampleCollectionDet>()

    // report
    const [reportForm, setReportForm] = useState(false)
    const [reportDetails, setReportDetails] = useState<PathTestReport>()


    // handling form data
    const handleSubmit = async (formData: z.infer<typeof createRadiologyBillSchema>) => {
        try {
            let data;
            setLoading(true)
            current ? (
                data = await PathologyApi.updatePathologyBill(current.id, formData),
                setCurrent(undefined)
            )
                :
                (data = await PathologyApi.createPathologyBill(formData))
            toast.success(data.message)
            getPathologyBills()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    const getPathologyBills = async () => {
        try {
            const data = await PathologyApi.getPathologyBills(params!)
            setPathoBills(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const getPathologyBillDetails = async (id: string) => {
        try {
            setLoading(true)
            const data = await PathologyApi.getPathologyBillById(id)
            setCurrent(data)
            console.log(data);

        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async (id: string) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await PathologyApi.deletePathologyBill(id)
            toast.success(data.message)
            getPathologyBills()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    // Sample Collection

    const onCollectionSubmit = async (formData: z.infer<typeof sampleCollectionSchema>, itemId?: number) => {
        try {
            let data;
            setLoading(true)
            collectionDetails ? (
                data = await PathologyApi.updatePathSampleCollection(collectionDetails?.itemId, formData),
                setCollectionDetails(undefined)
            )
                :
                (data = await PathologyApi.createPathSampleCollection(formData, itemId!))
            toast.success(data.message)
            setCollectionForm(false)
            setRefresh(!isRefresh)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    const getCollectionById = async (itemId: number) => {
        try {
            setLoading(true)
            const data = await PathologyApi.getPathSampleCollectionById(itemId)
            setCollectionDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    const deleteCollection = async (itemId: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await PathologyApi.deletePathSampleCollection(itemId)
            toast.success(data.message)
            setRefresh(!isRefresh)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    // Report

    const onReportSubmit = async (formData: z.infer<typeof LabReportFormSchema>, itemId?: number) => {
        try {
            let data;
            setLoading(true)
            reportDetails ? (
                data = await PathologyApi.updatePathologyReport(reportDetails.itemId, formData),
                setReportDetails(undefined)
            )
                :
                (data = await PathologyApi.createPathologyReport(itemId!, formData))
            toast.success(data.message)
            setReportForm(false)
            setRefresh(!isRefresh)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    const getPathologyReportById = async (itemId: number) => {
        try {
            setLoading(true)
            const data = await PathologyApi.getPathologyReportById(itemId)
            console.log(data);

            setReportDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    const deletePathologyReport = async (itemId: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await PathologyApi.deletePathologyReport(itemId)
            toast.success(data.message)
            setRefresh(!isRefresh)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        form,
        setForm,
        pathoBills,
        getPathologyBills,
        current,
        setCurrent,
        getPathologyBillDetails,
        handleSubmit,
        isLodaing,
        setLoading,
        onDelete,
        confirmationProps,
        isRefresh,

        // sample collection
        collectionForm,
        setCollectionForm,
        onCollectionSubmit,
        collectionDetails,
        setCollectionDetails,
        getCollectionById,
        deleteCollection,

        // report
        reportForm,
        setReportForm,
        onReportSubmit,
        getPathologyReportById,
        reportDetails,
        setReportDetails,
        deletePathologyReport

    }
}

export default usePathology