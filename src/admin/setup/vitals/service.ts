import AxiosClient from "@/api/apiClient";
import { z } from "zod";
import { SetupVitalFormSchema } from "./setupVitalForm";



export const createSetupVital = async (formData: z.infer<typeof SetupVitalFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/vital`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const updateSetupVital = async (id: number, formData: z.infer<typeof SetupVitalFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/setup/vital/${id}`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getSetupVitalDetails = async (id: number) => {
    try {
        const res = await AxiosClient.get(`/api/setup/vital/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deleteSetupVital = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/vital/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getSetupVitals = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/vital`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}