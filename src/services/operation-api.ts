import AxiosClient from "@/api/apiClient"
import { operationDetailsType, PaginatedOperations } from "@/types/opd_section/operationType"
import { OIParams, Params } from "@/types/type"
import { z, ZodType } from "zod"





const OperationApi = {

    createOperation: async <T extends ZodType<any>>(formData: z.infer<T>, params: OIParams) => {
        try {
            const res = await AxiosClient.post(`/api/operation`, formData, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in creating operation"
            throw new Error(err)
        }
    },

    updateOperation: async <T extends ZodType<any>>(id: string, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/operation/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in updating operation"
            throw new Error(err)
        }
    },

    getOperations: async (params: Params & OIParams): Promise<PaginatedOperations> => {
        try {
            const res = await AxiosClient.get(`/api/operation`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in fetching operation"
            throw new Error(err)
        }
    },

    getOperationById: async (id: string): Promise<operationDetailsType> => {
        try {
            const res = await AxiosClient.get(`/api/operation/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in fetching operation"
            throw new Error(err)
        }
    },

    deleteOperation: async (id: string) => {
        try {
            const res = await AxiosClient.delete(`/api/operation/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in deleting operation"
            throw new Error(err)
        }
    }

}











export default OperationApi