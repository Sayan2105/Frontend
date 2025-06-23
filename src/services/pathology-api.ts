import AxiosClient from "@/api/apiClient"
import { RadiologySampleCollectionDet, RadioTestReport } from "@/types/radiology/radiology"
import { Params } from "@/types/type"
import { z, ZodType } from "zod"



const PathologyApi = {

    createPathologyBill: async <F extends ZodType<any>>(formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.post(`/api/pathologyBill`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    updatePathologyBill: async <F extends ZodType<any>>(id: string, formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.put(`/api/pathologyBill/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    getPathologyBills: async (params: Params) => {
        try {
            const res = await AxiosClient.get(`/api/pathologyBill`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    getPathologyBillById: async (id: string) => {
        try {
            const res = await AxiosClient.get(`/api/pathologyBill/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    deletePathologyBill: async (id: string) => {
        try {
            const res = await AxiosClient.delete(`/api/pathologyBill/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    // Pathology sample-collection
    createPathSampleCollection: async <F extends ZodType<any>>(formData: z.infer<F>, itemId: number) => {
        try {
            const res = await AxiosClient.post(`/api/pathologyBill/sample-collection/${itemId}`, formData)
            return res.data
        }
        catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    updatePathSampleCollection: async <F extends ZodType<any>>(itemId: number, formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.put(`/api/pathologyBill/sample-collection/${itemId}`, formData)
            return res.data
        }
        catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    getPathSampleCollectionById: async (id: number): Promise<RadiologySampleCollectionDet> => {
        try {
            const res = await AxiosClient.get(`/api/pathologyBill/sample-collection/${id}`)
            return res.data
        }
        catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    deletePathSampleCollection: async (itemId: number) => {
        try {
            const res = await AxiosClient.delete(`/api/pathologyBill/sample-collection/${itemId}`)
            return res.data
        }
        catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    // Pathology Report

    createPathologyReport: async <F extends ZodType<any>>(itemId: number, formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.post(`/api/pathologyBill/report/${itemId}`, formData)
            return res.data
        }
        catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    getPathologyReportById: async (itemId: number): Promise<RadioTestReport> => {
        try {
            const res = await AxiosClient.get(`/api/pathologyBill/report/${itemId}`)
            return res.data
        }
        catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    updatePathologyReport: async <F extends ZodType<any>>(itemId: number, formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.put(`/api/pathologyBill/report/${itemId}`, formData)
            return res.data
        }
        catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    deletePathologyReport: async (itemId: number) => {
        try {
            const res = await AxiosClient.delete(`/api/pathologyBill/report/${itemId}`)
            return res.data
        }
        catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

}






export default PathologyApi