import AxiosClient from "@/api/apiClient"
import { Appointment, AppointmentDetails } from "@/types/appointment/appointment"
import { Params } from "@/types/type"
import { z, ZodType } from "zod"




export const AppointmentApi = {

    async createAppointment<T extends ZodType<any>>(formData: z.infer<T>) {
        try {
            const res = await AxiosClient.post(`/api/appointment`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error in creating appointment'
            throw new Error(err)
        }
    },

    async getAppointments(params: Params & { status?: string }): Promise<Appointment> {
        try {
            const res = await AxiosClient.get(`/api/appointment`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error in fetching appointment'
            throw new Error(err)
        }
    },

    async getAppointmentById(id: string): Promise<AppointmentDetails> {
        try {
            const res = await AxiosClient.get(`/api/appointment/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error in fetching appointment'
            throw new Error(err)
        }
    },

    async deleteAppointment(id: string) {
        try {
            const res = await AxiosClient.delete(`/api/appointment/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error in deleting appointment'
            throw new Error(err)
        }
    },

    async updateAppointment<T extends ZodType<any>>(id: string, formData: z.infer<T>) {
        try {
            const res = await AxiosClient.put(`/api/appointment/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error in updating appointment'
            throw new Error(err)
        }
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








