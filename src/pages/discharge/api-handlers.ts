import { z } from "zod";
import { dischargeFormSchema } from "@/formSchemas/discharge.ts";
import { OIParams } from "@/types/type";
import AxiosClient from "@/api/apiClient";


export const createDischarge = async (formData: z.infer<typeof dischargeFormSchema>, params: OIParams) => {
    try {
        const res = await AxiosClient.post(`/api/discharge`, formData, { params })
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'An Unknown Error Occured'
        throw new Error(err)
    }
}


export const deleteDischarge = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/discharge/${id}`)
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'An Unknown Error Occured'
        throw new Error(err)
    }
}


export const updateDischarge = async (formData: z.infer<typeof dischargeFormSchema>, id: number) => {
    try {
        const res = await AxiosClient.put(`/api/discharge/${id}`, formData)
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'An Unknown Error Occured'
        throw new Error(err)
    }
}


export const getDischargeInfo = async (id:number) => {
    try {
        const res = await AxiosClient.get(`/api/discharge/${id}`)
        return res.data
    } catch (error: any) {
        const err = error?.response ? error.response.data.message : 'An Unknown Error Occured'
        throw new Error(err)
    }
}