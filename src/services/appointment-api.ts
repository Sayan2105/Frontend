import AxiosClient from "@/api/apiClient"
import { AppointmentDetails } from "@/types/appointment/appointment"
import { Params } from "@/types/type"
import { z, ZodType } from "zod"




export const AppointmentApi = {

    async createAppointment<T extends ZodType<any>>(formData: z.infer<T>) {
        const res = await AxiosClient.post(`/api/appointment`, formData)
        return res.data
    },

    async getAppointments(params: Params & { status?: string }) {
        const res = await AxiosClient.get(`/api/appointment`, { params })
        return res.data
    },

    async getAppointmentById(id: string): Promise<AppointmentDetails> {
        const res = await AxiosClient.get(`/api/appointment/${id}`)
        return res.data
    },

    async deleteAppointment(id: string) {
        const res = await AxiosClient.delete(`/api/appointment/${id}`)
        return res.data
    },

    async updateAppointment<T extends ZodType<any>>(id: string, formData: z.infer<T>) {
        const res = await AxiosClient.put(`/api/appointment/${id}`, formData)
        return res.data
    },

    async updateStatus(id: string, status: string) {
        try {
            const res = await AxiosClient.put(`/api/appointment/${id}/status`, { status })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error in updating appointment'
            throw new Error(err)
        }
    },

}








