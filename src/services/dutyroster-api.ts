import AxiosClient from "@/api/apiClient"
import { AvailableOpdRosterDoctors, RosterInfoForAppointment, Rosters } from "@/types/dutyRoster/DutyRoster"
import { z, ZodType } from "zod"


export type RosterParams = { page?: number, limit?: number, credentials?: string, date?: string, period?: { startDate: string, endDate: string } }


const DutyRosterApi = {

    createOpdRoster: async <T extends ZodType<T>>(formData: z.infer<T>) => {
        const res = await AxiosClient.post(`/api/roster`, formData)
        return res.data
    },

    getOpdRosters: async (params: RosterParams): Promise<Rosters> => {
        const res = await AxiosClient.get(`/api/roster`, { params })
        return res.data
    },

    deleteOpdRoster: async (id: number) => {
        const res = await AxiosClient.delete(`/api/roster/${id}`)
        return res.data
    },

    updateRoster: async <T extends ZodType<T>>(formData: z.infer<T>, ID: number) => {
        const res = await AxiosClient.put(`/api/roster/${ID}`, formData)
        return res.data
    },

    getAllOpdRosterDoctors: async (params: { search: string, page: number, limit: number }): Promise<AvailableOpdRosterDoctors> => {
        const res = await AxiosClient.get(`/api/roster/opdDoctors`, { params })
        return res.data
    },

    getDoctorRosterForAppointment: async (rosterId: number): Promise<RosterInfoForAppointment> => {
        const res = await AxiosClient.get(`/api/roster/opdRosterForAppointmentById/${rosterId}`)
        return res.data
    },

    getTimeSlots: async (id: number) => {
        const res = await AxiosClient.get(`/api/roster/opdRosterTimeSlots/${id}`)
        return res.data
    },

}




export default DutyRosterApi