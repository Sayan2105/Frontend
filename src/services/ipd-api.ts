import AxiosClient from "@/api/apiClient"
import { PaginatedConsultantRegister } from "@/types/IPD/consutant-register"
import { IpdInfo, PaginatedIpdTreatmentHisInfo } from "@/types/IPD/ipd"
import { OIParams, Params } from "@/types/type"
import { z, ZodType } from "zod"



const IpdApi = {
    createIpd: async <F extends ZodType<F>>(formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.post(`/api/ipd`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    updateIpd: async <F extends ZodType<F>>(id: string, formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.put(`/api/ipd/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    getIpds: async (params?: Params) => {
        try {
            const res = await AxiosClient.get(`/api/ipd`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    deleteIpd: async (id: string) => {
        try {
            const res = await AxiosClient.delete(`/api/ipd/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    getIpdOverview: async (opdId: string) => {
        try {
            const res = await AxiosClient.get(`/api/ipd/overview/${opdId}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    getIpdInfo: async (id: string): Promise<IpdInfo> => {
        try {
            const res = await AxiosClient.get(`/api/ipd/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    // treatment history
    getIpdTreatmentHistory: async (params: Params & OIParams): Promise<PaginatedIpdTreatmentHisInfo> => {
        try {
            const res = await AxiosClient.get(`/api/ipd/t/history`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    // consultant register
    createConsultantReg: async <F extends ZodType<F>>(formData: z.infer<F>, params: OIParams) => {
        try {
            const res = await AxiosClient.post(`/api/consultantReg`, formData, { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    updateConsultantReg: async <F extends ZodType<F>>(id: number, formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.put(`/api/consultantReg/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    getConsultantRegs: async (params: Params & OIParams): Promise<PaginatedConsultantRegister> => {
        try {
            const res = await AxiosClient.get(`/api/consultantReg`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    deleteConsultantReg: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/consultantReg/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    // Lab investigations
    getIpdRadInvestigation: async (moduleId: string, params: { search?: string }) => {
        try {
            const res = await AxiosClient.get(`/api/radiologyBill/items/${moduleId}`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    getIpdPatInvestigation: async (moduleId: string, params: { search?: string }) => {
        try {
            const res = await AxiosClient.get(`/api/pathologyBill/items/${moduleId}`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

    getIpdBillByIpdId: async (ipdId: string) => {
        try {
            const res = await AxiosClient.get(`/api/ipd/bill/${ipdId}`)
            return res.data
        } catch (error: any) {
            const err = error.response.data.message || "Connection Error"
            throw new Error(err)
        }
    },

}







export default IpdApi