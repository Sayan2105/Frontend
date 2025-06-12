import AxiosClient from "@/api/apiClient"
import { timeline } from "@/types/opd_section/timeline"
import { OIParams } from "@/types/type"
import { z, ZodType } from "zod"



const TimelineApi = {
    createTimeline: async <F extends ZodType<any>>(formData: z.infer<F>, params: OIParams) => {
        try {
            const res = await AxiosClient.post(`/api/timeline`, formData, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Failed to create timeline"
            throw new Error(err)
        }
    },

    updateTimeine: async <F extends ZodType<any>>(id: number, formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.put(`/api/timeline/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Failed to update timeline"
            throw new Error(err)
        }
    },

    getTimelines: async (params: OIParams): Promise<timeline[]> => {
        try {
            const res = await AxiosClient.get(`/api/timeline`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Failed to fetch timelines"
            throw new Error(err)
        }
    },

    deleteTimeline: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/timeline/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Failed to delete timeline"
            throw new Error(err)
        }
    }
}







export default TimelineApi