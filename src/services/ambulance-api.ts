import AxiosClient from "@/api/apiClient"
import { AssignedAmbulanceInfo, PaginatedAssignedAmbulances, PagintedAmbulance } from "@/types/ambulance/ambulance"
import { Params } from "@/types/type"


const AmbulanceApi = {

    createAmbulance: async <T>(formData: T) => {
        try {
            const res = await AxiosClient.post('/api/ambulance', formData)
            return res.data
        } catch (error: any) {
            const err = error?.response?.data?.message || 'Error in creating ambulance'
            throw new Error(err)
        }
    },

    updateAmbulance: async <T>(formData: T, id: number) => {
        try {
            const res = await AxiosClient.put(`/api/ambulance/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error?.response?.data?.message || 'Error in updating ambulance'
            throw new Error(err)
        }
    },

    deleteAmbulance: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/ambulance/${id}`)
            return res.data
        } catch (error: any) {
            const err = error?.response?.data?.message || 'Error in deleting ambulance'
            throw new Error(err)
        }
    },

    getAmbulances: async (params: Params): Promise<PagintedAmbulance> => {
        try {
            const res = await AxiosClient.get(`/api/ambulance`, { params })
            return res.data
        } catch (error: any) {
            const err = error?.response?.data?.message || 'Error in fetching ambulance'
            throw new Error(err)
        }
    },


    // Assign Ambulances


    createAssignAmbulance: async <T>(formData: T) => {
        try {
            const res = await AxiosClient.post(`/api/ambulance/assign`, formData)
            return res.data
        } catch (error: any) {
            const err = error?.response?.data?.message || 'Error in assigning ambulance'
            throw new Error(err)
        }
    },

    updateAssignedAmbulance: async<T>(formData: T, id: string) => {
        try {
            const res = await AxiosClient.put(`/api/ambulance/assign/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error?.response?.data?.message || 'Error in updating assigned ambulance'
            throw new Error(err)
        }
    },

    deleteAssignedAmbulance: async (id: string) => {
        try {
            const res = await AxiosClient.delete(`/api/ambulance/assign/${id}`)
            return res.data
        } catch (error: any) {
            const err = error?.response?.data?.message || 'Error in deleting assigned ambulance'
            throw new Error(err)
        }
    },

    getAssignedAmbulances: async (params: Params): Promise<PaginatedAssignedAmbulances> => {
        try {
            const res = await AxiosClient.get(`/api/ambulance/assign`, { params })
            return res.data
        } catch (error: any) {
            const err = error?.response?.data?.message || 'Error in fetching assigned ambulance'
            throw new Error(err)
        }
    },

    getAssignedAmbulanceInfo: async (id: string): Promise<AssignedAmbulanceInfo> => {
        try {
            const res = await AxiosClient.get(`/api/ambulance/assign/${id}`)
            return res.data
        } catch (error: any) {
            const err = error?.response?.data?.message || 'Error in fetching assigned ambulance'
            throw new Error(err)
        }
    },

}




export default AmbulanceApi