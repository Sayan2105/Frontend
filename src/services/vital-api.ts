import AxiosClient from "@/api/apiClient"
import { VitalType } from "@/types/opd_section/vitals"
import { OIParams } from "@/types/type"
import { z, ZodType } from "zod"



export const VitalApi = {

    createVital: async <T extends ZodType<any>>(formData: z.infer<T>, params: OIParams) => {
        try {
            const res = await AxiosClient.post(`/api/vital`, formData, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in creating vital"
            throw new Error(err)
        }
    },

    getVitals: async (params: OIParams & { search?: string }): Promise<VitalType[]> => {
        try {
            const res = await AxiosClient.get(`/api/vital`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in fetching vital"
            throw new Error(err)
        }
    },

    deleteVitals: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/vital/${id}`,)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in deleting vital"
            throw new Error(err)
        }
    }
}






export default VitalApi