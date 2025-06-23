import AxiosClient from "@/api/apiClient"
import { Payment } from "@/types/opd_section/payment"
import { OIParams, Params } from "@/types/type"
import { z, ZodType } from "zod"


const PaymentApi = {

    createPayment: async <F extends ZodType<any>>(formData: z.infer<F>, params: OIParams) => {
        try {
            const res = await AxiosClient.post(`/api/payment`, formData, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    updatePayment: async <F extends ZodType<any>>(id: string, formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.put(`/api/payment/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    getPayments: async (params: Params & OIParams): Promise<Payment> => {
        try {
            const res = await AxiosClient.get(`/api/payment`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Something went wrong'
            throw new Error(err)
        }
    },

    deletePayment: async (id: string) => {
        try {
            const res = await AxiosClient.delete(`/api/payment/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Something went wrong'
            throw new Error(err)
        }
    }

}







export default PaymentApi