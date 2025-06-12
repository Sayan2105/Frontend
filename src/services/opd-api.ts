import AxiosClient from "@/api/apiClient"
import { opdDetails, OPDs } from "@/types/opd_section/opd"
import { OIParams, Params } from "@/types/type"




const OpdApi = {

    getOPDs: async (params: Params): Promise<OPDs> => {
        try {
            const res = await AxiosClient.get(`/api/opd`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error fetching opd list'
            throw new Error(err)
        }
    },

    getOpdById: async (opdId: string): Promise<opdDetails> => {
        try {
            const res = await AxiosClient.get(`/api/opd/${opdId}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error fetching opd details'
            throw new Error(err)
        }
    },

    getOpdBillInfo: async (opdId: string) => {
        try {
            const res = await AxiosClient.get(`/api/opd/printbill/${opdId}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error fetching opd bill'
            throw new Error(err)
        }
    },

    // treatment history
    getTreatmentHistory: async (params: Params & OIParams): Promise<OPDs> => {
        try {
            const res = await AxiosClient.get(`/api/opd/t/history`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Error fetching treatment history'
            throw new Error(err)
        }
    }
}









export default OpdApi