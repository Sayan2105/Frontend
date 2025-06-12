import AxiosClient from "@/api/apiClient"
import { Params } from "@/types/type"
import { z, ZodType } from "zod"




const bloodBankApi = {

    createBloodDonor: async <T>(formData: T) => {
        try {
            const res = await AxiosClient.post('/api/blood-bank/donor', formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    getBloodDonors: async (params: Params) => {
        try {
            const res = await AxiosClient.get('/api/blood-bank/donor', { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    deleteBloodDonor: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/blood-bank/donor/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    updateBloodDonor: async <T>(id: number, formData: T) => {
        try {
            const res = await AxiosClient.put(`/api/blood-bank/donor/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    // Handlers for Donations


    createDonation: async <T>(formData: T) => {
        try {
            const res = await AxiosClient.post('/api/blood-bank/donation', formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    getDonations: async (params: Params) => {
        try {
            const res = await AxiosClient.get('/api/blood-bank/donation', { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    deleteDonation: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/blood-bank/donation/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    updateDonation: async <T>(id: number, formData: T) => {
        try {
            const res = await AxiosClient.put(`/api/blood-bank/donation/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    // Handlers for Bags

    getBloodBags: async (group: string) => {
        try {
            const res = await AxiosClient.get(`/api/blood-bank/donation/bags/${group}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },


    // issue blood

    issueBlood: async <T extends ZodType<any>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post(`/api/blood-bank/issue-blood`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },


    getIssueBloodById: async (id: string) => {
        try {
            const res = await AxiosClient.get(`/api/blood-bank/issue-blood/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },


    getIssueBloods: async (params: Params) => {
        try {
            const res = await AxiosClient.get(`/api/blood-bank/issue-blood`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },


    updateIssueBlood: async <T>(id: string, formData: T) => {
        try {
            const res = await AxiosClient.put(`/api/blood-bank/issue-blood/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    deleteIssueBlood: async (id: string) => {
        try {
            const res = await AxiosClient.delete(`/api/blood-bank/issue-blood/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },


    // Blood Components
    createBloodComponent: async <T extends ZodType<any>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post(`/api/blood-bank/component`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    getBloodComponents: async (params: Params) => {
        try {
            const res = await AxiosClient.get(`/api/blood-bank/component`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    deleteBloodComponent: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/blood-bank/component/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    getBloodComponentBags: async (component: string) => {
        try {
            const res = await AxiosClient.get(`/api/blood-bank/component/bags/${component}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },


    // issue blood component
    issueBloodComponent: async <T extends ZodType<any>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post(`/api/blood-bank/issue-component`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    getIssueBloodComponents: async (params: Params) => {
        try {
            const res = await AxiosClient.get(`/api/blood-bank/issue-component`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    getIssueBloodComponentById: async (id: string) => {
        try {
            const res = await AxiosClient.get(`/api/blood-bank/issue-component/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    deleteIssueBloodComponent: async (id: string) => {
        try {
            const res = await AxiosClient.delete(`/api/blood-bank/issue-component/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    },
}






export default bloodBankApi