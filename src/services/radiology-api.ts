import AxiosClient from "@/api/apiClient"
import { RadiologySampleCollectionDet, RadioTestReport } from "@/types/radiology/radiology"
import { Params } from "@/types/type"
import { z, ZodType } from "zod"



const RadiologyApi = {

    createRadiologyBill: async <T extends ZodType<T>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post(`/api/radiologyBill`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    updateRadiologyBill: async <T extends ZodType<T>>(id: string, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/radiologyBill/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    getRadiologyBills: async (params: Params) => {
        try {
            const res = await AxiosClient.get(`/api/radiologyBill`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    getRadiologyBillById: async (id: string) => {
        try {
            const res = await AxiosClient.get(`/api/radiologyBill/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    deleteRadiologyBill: async (id: string) => {
        try {
            const res = await AxiosClient.delete(`/api/radiologyBill/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    // Radiology sample-collection
    createRadioSampleCollection: async <T extends ZodType<T>>(formData: z.infer<T>, itemId: number) => {
        try {
            const res = await AxiosClient.post(`/api/radiologyBill/sample-collection/${itemId}`, formData)
            return res.data
        }
        catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    updateRadioSampleCollection: async <T extends ZodType<T>>(itemId: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/radiologyBill/sample-collection/${itemId}`, formData)
            return res.data
        }
        catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    getRadioSampleCollectionById: async (id: number): Promise<RadiologySampleCollectionDet> => {
        try {
            const res = await AxiosClient.get(`/api/radiologyBill/sample-collection/${id}`)
            return res.data
        }
        catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    deleteSampleCollection: async (itemId: number) => {
        try {
            const res = await AxiosClient.delete(`/api/radiologyBill/sample-collection/${itemId}`)
            return res.data
        }
        catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    // Radiology Report
    createRadiologyReport: async <T extends ZodType<T>>(itemId: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post(`/api/radiologyBill/report/${itemId}`, formData)
            return res.data
        }
        catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    updateRadiologyReport: async <T extends ZodType<T>>(itemId: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/radiologyBill/report/${itemId}`, formData)
            return res.data
        }
        catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    getRadiologyReportById: async (itemId: number): Promise<RadioTestReport> => {
        try {
            const res = await AxiosClient.get(`/api/radiologyBill/report/${itemId}`)
            return res.data
        }
        catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },

    deleteRadiologyReport: async (itemId: number) => {
        try {
            const res = await AxiosClient.delete(`/api/radiologyBill/report/${itemId}`)
            return res.data
        }
        catch (error: any) {
            const err = error.response?.data?.message || "Network Error"
            throw new Error(err)
        }
    },


}






export default RadiologyApi