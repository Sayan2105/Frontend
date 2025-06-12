import AxiosClient from "@/api/apiClient"
import { ChargeDetailsType, ChargeListType } from "@/types/opd_section/charges"
import { OIParams, Params } from "@/types/type"
import { z, ZodType } from "zod"





const ChargeApi = {

    createCharges: async <F extends ZodType<any>>(formData: z.infer<F>, params: OIParams) => {
        try {
            const res = await AxiosClient.post(`/api/charge`, formData, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in creating charge"
            throw new Error(err)
        }
    },

    updateCharge: async <F extends ZodType<any>>(id: string | number, formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.put(`/api/charge/${id}`, formData)
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in updating charge"
            throw new Error(err)
        }
    },

    deleteCharge: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/charge/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in deleting charge"
            throw new Error(err)
        }
    },

    getChargeById: async (id: number): Promise<ChargeDetailsType> => {
        try {
            const res = await AxiosClient.get(`/api/charge/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in fetching charge"
            throw new Error(err)
        }
    },

    getCharges: async (params: Params & OIParams): Promise<ChargeListType> => {
        try {
            const res = await AxiosClient.get(`/api/charge`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in fetching charge"
            throw new Error(err)
        }
    }
}










export default ChargeApi