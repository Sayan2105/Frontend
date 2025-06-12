import AxiosClient from "@/api/apiClient";
import { z, ZodType } from "zod";


const SetupStaffApi = {

    createDepartment: async <T extends ZodType<any>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post('/api/setup/staff/department', formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    updateDepartment: async <T extends ZodType<any>>(id: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/setup/staff/department/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    deleteDepartment: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/setup/staff/department/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    getDepartments: async () => {
        try {
            const res = await AxiosClient.get(`/api/setup/staff/department`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    createDesignation: async <T extends ZodType<any>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post('/api/setup/staff/designation', formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    updateDesignation: async <T extends ZodType<any>>(id: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/setup/staff/designation/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    deleteDesignation: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/setup/staff/designation/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    getDesignations: async () => {
        try {
            const res = await AxiosClient.get(`/api/setup/staff/designation`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    createSpecialization: async <T extends ZodType<any>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post('/api/setup/staff/specialization', formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    updateSpecialization: async <T extends ZodType<any>>(id: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/setup/staff/specialization/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    deleteSpecialization: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/setup/staff/specialization/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    },

    getSpecializations: async () => {
        try {
            const res = await AxiosClient.get(`/api/setup/staff/specialization`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Something went wrong"
            throw new Error(err)
        }
    }
}




export default SetupStaffApi