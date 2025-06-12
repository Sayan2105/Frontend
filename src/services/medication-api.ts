import AxiosClient from "@/api/apiClient"
import { medicationDetail, opdMedications } from "@/types/opd_section/medication"
import { OIParams, Params } from "@/types/type"
import { z, ZodType } from "zod"



const medicationApi = {

    createMedication: async <T extends ZodType<any>>(formData: z.infer<T>, params: (Params & OIParams)) => {
        try {
            const res = await AxiosClient.post(`/api/medication`, formData, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in creating medication"
            throw new Error(err)
        }
    },

    getMedications: async (params: Params & OIParams): Promise<opdMedications> => {
        try {
            const res = await AxiosClient.get(`/api/medication`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in fetching medication"
            throw new Error(err)
        }
    },

    deleteMedication: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/medication/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in deleting medication"
            throw new Error(err)
        }
    },

    getMedicationById: async (id: number): Promise<medicationDetail> => {
        try {
            const res = await AxiosClient.get(`/api/medication/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in fetching medication"
            throw new Error(err)
        }
    },

    updateMedication: async <T extends ZodType<any>>(id: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/medication/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in updating medication"
            throw new Error(err)
        }
    }
}







export default medicationApi