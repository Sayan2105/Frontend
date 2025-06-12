import { AddOperationCategoryFormSchema } from "./operation_category/addOperationCategoryForm"
import { z } from "zod"
import { AddOperationNameFormSchema } from "./operation_name/addOperationNameModel"
import AxiosClient from "@/api/apiClient"


export const createOperationCategory = async (formData: z.infer<typeof AddOperationCategoryFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/operation/category`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const updateOperationCategory = async (id: number, formData: z.infer<typeof AddOperationCategoryFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/setup/operation/category/${id}`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deleteOperationCategory = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/operation/category/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getOperationCategoryDetails = async (id: number) => {
    try {
        const res = await AxiosClient.get(`/api/setup/operation/category/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getOperationCategories = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/operation/category`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}



// API handlers for operation name section

export const createOperationName = async (formData: z.infer<typeof AddOperationNameFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/operation/name`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const updateOperationName = async (id: number, formData: z.infer<typeof AddOperationNameFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/setup/operation/name/${id}`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}

export const deleteOperationName = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/operation/name/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getOperationNameDetails = async (id: number) => {
    try {
        const res = await AxiosClient.get(`/api/setup/operation/name/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}

export const getOperationNames = async (categoryId?: number) => {
    try {
        const params = { categoryId }
        const res = await AxiosClient.get(`/api/setup/operation/name`, { params })
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}