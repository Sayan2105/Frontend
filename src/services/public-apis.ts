import AxiosClient from "@/api/apiClient"
import { Params } from "@/types/type"
import { z } from "zod"

const pulicApi = {
    async getLatestNews(params: Params) {
        try {
            const res = await AxiosClient.get('/api/public/latest-news', { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },
    async getAnualCalendars() {
        try {
            const res = await AxiosClient.get('/api/public/annual-calendar')
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },
    async getEvents(params: Params) {
        try {
            const res = await AxiosClient.get('/api/public/events', { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },
    async getSpecialisations() {
        try {
            const res = await AxiosClient.get('/api/public/specializations')
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    async createAppointment<f extends z.ZodAny>(formData: z.infer<f>) {
        const res = await AxiosClient.post('/api/public/create-appointment', formData)
        return res.data
    },

    async createAdmin<T extends z.ZodTypeAny>(formData: z.infer<T>) {
        try {
            const res = await AxiosClient.post('/api/public/create-admin', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },
}




export default pulicApi