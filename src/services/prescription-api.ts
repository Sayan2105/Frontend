import AxiosClient from "@/api/apiClient"
import { prescriptionDetail, PrescriptionsType } from "@/types/opd_section/prescription"
import { OIParams } from "@/types/type"
import { z, ZodType } from "zod"




const PrescriptionApi = {

    createPrescription: async <T extends ZodType<any>>(formData: z.infer<T>, params: OIParams) => {
        try {
            const res = await AxiosClient.post(`/api/prescription`, formData, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error in creating prescription'
            throw new Error(err)
        }
    },

    updatePrescription: async <T extends ZodType<any>>(id: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/prescription/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error in updating prescription'
            throw new Error(err)
        }
    },

    deletePrescription: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/prescription/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error in deleting prescription'
            throw new Error(err)
        }
    },

    getPrescriptionById: async (id: number): Promise<prescriptionDetail> => {
        try {
            const res = await AxiosClient.get(`/api/prescription/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error in fetching prescription'
            throw new Error(err)
        }
    },

    getPrescriptions: async (params: OIParams): Promise<PrescriptionsType[]> => {
        try {
            const res = await AxiosClient.get(`/api/prescription`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error in fetching prescription'
            throw new Error(err)
        }
    }
}





export default PrescriptionApi