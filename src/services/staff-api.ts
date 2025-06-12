import AxiosClient from "@/api/apiClient"
import { StaffProfile, staffs } from "@/types/staff/staff"
import { Params } from "@/types/type"
import { z, ZodType } from "zod"



const StaffApi = {

    createStaff: async <F extends ZodType<any>>(formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.post(`/api/staff`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Network Error"
            throw new Error(err)
        }
    },

    getStaffById: async (id: number): Promise<StaffProfile> => {
        try {
            const res = await AxiosClient.get(`/api/staff/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Network Error"
            throw new Error(err)
        }
    },

    getStaffs: async (params: Params): Promise<staffs> => {
        try {
            const response = await AxiosClient.get(`/api/staff`, { params })
            return response.data
        } catch (error: any) {
            const err = error.response.data.message || "Network Error"
            throw new Error(err)
        }
    },

    updateStaff: async <F extends ZodType<any>>(id: number, formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.put(`/api/staff/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Network Error"
            throw new Error(err)
        }
    },

    deleteStaffProfile: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/staff/${id}`)
            return res.data
        } catch (error: any) {
            throw new Error(error.response?.data?.message)

        }
    },

    resetPassword: async (id: number, password: string) => {
        try {
            const res = await AxiosClient.put(`/api/staff/reset/${id}`, { password })
            return res.data
        } catch (error: any) {
            throw new Error(error.response?.data?.message)
        }
    }

}







export default StaffApi