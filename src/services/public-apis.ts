import AxiosClient from "@/api/apiClient"
import { Params } from "@/types/type"
import { z } from "zod"

const pulicApi = {
    async getLatestNews(params: Params) {
        try {
            const res = await AxiosClient.get('/api/public/latest-news', { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    },
    async getAnualCalendars() {
        try {
            const res = await AxiosClient.get('/api/public/annual-calendar')
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    },
    async getEvents(params: Params) {
        try {
            const res = await AxiosClient.get('/api/public/events', { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    },
    async getDoctors(params: Params & { role?: string }) {
        try {
            params.role = 'doctor'
            const res = await AxiosClient.get('/api/public/doctors', { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    },
    async getRosterDoctors(params: { appointmentDate: string, specialistId: number }) {
        try {
            const res = await AxiosClient.get('/api/public/roster-doctors', { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    },
    async getSpecialisations() {
        try {
            const res = await AxiosClient.get('/api/public/specializations')
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    },
    async createAppointment<f extends z.ZodAny>(formData: z.infer<f>) {
        try {
            const res = await AxiosClient.post('/api/public/create-appointment', formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    },
    async checkDoctorAvailability(params: { doctorId: number, appointmentDate: string }) {
        try {
            const res = await AxiosClient.get('/api/public/check-availability', { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    },
}




export default pulicApi