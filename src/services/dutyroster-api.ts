import AxiosClient from "@/api/apiClient"
import { Rosters } from "@/types/dutyRoster/DutyRoster"
import { z, ZodType } from "zod"


export type RosterParams = { page?: number, limit?: number, credentials?: string, date?: string, period?: { startDate: string, endDate: string } }


const DutyRosterApi = {

    createRoster: async <T extends ZodType<T>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post(`/api/roster`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in creating roster"
            throw new Error(err)
        }
    },

    updateRoster: async <T extends ZodType<T>>(formData: z.infer<T>, ID: number) => {
        try {
            const res = await AxiosClient.put(`/api/roster/${ID}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in updating roster"
            throw new Error(err)
        }
    },

    getRosterDetails: async (ID: number): Promise<Rosters['data'][0]> => {
        try {
            const res = await AxiosClient.get(`/api/roster/${ID}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in fetching roster"
            throw new Error(err)
        }
    },


    getRosters: async (params: RosterParams): Promise<Rosters> => {
        try {
            const res = await AxiosClient.get(`/api/roster`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in fetching roster"
            throw new Error(err)
        }
    },

    deleteRoster: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/roster/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in deleting roster"
            throw new Error(err)
        }
    },

    // fetching doctors according to appointment date coming from roster model
    async getDoctors(params: { appointmentDate: string, specialistId: number }) {
        try {
            const res = await AxiosClient.get(`/api/roster/doctors`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in fetching doctors"
            throw new Error(err)
        }
    },
}




export default DutyRosterApi