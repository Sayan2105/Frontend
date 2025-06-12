import { LabReportFormSchema } from "@/formSchemas/approvedBYschema";
import { createRadiologyBillSchema } from "@/formSchemas/createRadiologyBill";
import { sampleCollectionSchema } from "@/formSchemas/sampleCollectionSchema";
import { useConfirmation } from "@/hooks/useConfirmation";
import RadiologyApi from "@/services/radiology-api";
import { PaginatedRadiologyBills, RadiologyBillDeatils, RadiologySampleCollectionDet, RadioTestReport } from "@/types/radiology/radiology";
import { Params } from "@/types/type";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const useRadiology = (params?: Params) => {

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()
    const [form, setForm] = useState(false)
    const [isLodaing, setLoading] = useState(false)
    const [current, setCurrent] = useState<RadiologyBillDeatils>()
    const [radioBills, setRadioBills] = useState<PaginatedRadiologyBills>({ data: [], total_pages: 0 })
    const [isRefresh, setRefresh] = useState(false)

    // sample collection
    const [collectionForm, setCollectionForm] = useState(false)
    const [collectionDetails, setCollectionDetails] = useState<RadiologySampleCollectionDet>()

    // report
    const [reportForm, setReportForm] = useState(false)
    const [reportDetails, setReportDetails] = useState<RadioTestReport>()


    // handling form data
    const handleSubmit = async (formData: z.infer<typeof createRadiologyBillSchema>) => {
        try {
            let data;
            setLoading(true)
            current ? (
                data = await RadiologyApi.updateRadiologyBill(current.id, formData),
                setCurrent(undefined)
            )
                :
                (
                    data = await RadiologyApi.createRadiologyBill(formData)
                )
            toast.success(data.message)
            getRadiologyBills()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    // list of bills
    const getRadiologyBills = async () => {
        try {
            const data = await RadiologyApi.getRadiologyBills(params!)
            setRadioBills(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    const getRadiologyBillById = async (id: string) => {
        try {
            setLoading(true)
            const data = await RadiologyApi.getRadiologyBillById(id)
            setCurrent(data)
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
            const data = await RadiologyApi.deleteRadiologyBill(id)
            toast.success(data.message)
            getRadiologyBills()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // sample collection

    const onCollectionSubmit = async (formData: z.infer<typeof sampleCollectionSchema>, itemId?: number) => {
        try {
            let data;
            setLoading(true)
            collectionDetails ? (
                data = await RadiologyApi.updateRadioSampleCollection(collectionDetails?.itemId, formData),
                setCollectionDetails(undefined)
            )
                :
                (data = await RadiologyApi.createRadioSampleCollection(formData, itemId!))
            toast.success(data.message)
            setCollectionForm(false)
            setRefresh(!isRefresh)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    const getSampleCollectionById = async (itemId: number) => {
        try {
            setLoading(true)
            const data = await RadiologyApi.getRadioSampleCollectionById(itemId)
            setCollectionDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    const onDeleteCollection = async (itemId: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await RadiologyApi.deleteSampleCollection(itemId)
            toast.success(data.message)
            setRefresh(!isRefresh)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }

    // report

    const onReportSubmit = async (formData: z.infer<typeof LabReportFormSchema>, itemId?: number) => {
        try {
            let data;
            setLoading(true)
            reportDetails ? (
                data = await RadiologyApi.updateRadiologyReport(reportDetails.itemId, formData),
                setReportDetails(undefined)
            )
                :
                (data = await RadiologyApi.createRadiologyReport(itemId!, formData))
            toast.success(data.message)
            setReportForm(false)
            setRefresh(!isRefresh)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    const getRadiologyReportById = async (itemId: number) => {
        try {
            setLoading(true)
            const data = await RadiologyApi.getRadiologyReportById(itemId)
            setReportDetails(data)
        } catch ({ message }: any) {
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }


    const onDeleteReport = async (itemId: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await RadiologyApi.deleteRadiologyReport(itemId)
            toast.success(data.message)
            setRefresh(!isRefresh)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        radioBills,
        getRadiologyBills,
        form,
        setForm,
        current,
        setCurrent,
        getRadiologyBillById,
        handleSubmit,
        isLodaing,
        onDelete,
        confirmationProps,
        isRefresh,

        // sample collection
        collectionForm,
        setCollectionForm,
        onCollectionSubmit,
        collectionDetails,
        setCollectionDetails,
        getSampleCollectionById,
        onDeleteCollection,

        // report
        reportForm,
        setReportForm,
        onReportSubmit,
        getRadiologyReportById,
        reportDetails,
        setReportDetails,
        onDeleteReport
    }
}

export default useRadiology