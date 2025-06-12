import AxiosClient from "@/api/apiClient"
import { TestNameFormSchema } from "@/formSchemas/setupSectionSchemas/CreateTestNameSchema"
import { PathologyTestNameDetailsType, PathParametersType, PathTestNameParameter } from "@/types/setupTypes/pathology"
import { z } from "zod"
import { CreatePathCategorySchema } from "./category/create-path-category"
import { CreatPathParameterSchema } from "./parameter/create-path-parameter"
import { PathUnitSchema } from "./units/create-unit"



// Handlers for pathology Units

export const createPathologyUnit = async (formData: z.infer<typeof PathUnitSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/pathology/unit`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getPathologytUnits = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/pathology/unit`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deletePathologytUnit = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/pathology/unit/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}






// radiology parameters

export const createPathologyParameter = async (formData: z.infer<typeof CreatPathParameterSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/pathology/parameter`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getPathologytParameters = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/pathology/parameter`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deletePathologytParameter = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/pathology/parameter/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getPathologytParameterDetails = async (id: number): Promise<PathParametersType> => {
    try {
        const res = await AxiosClient.get(`/api/setup/pathology/parameter/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const updatePathologytParameter = async (id: number, formData: any) => {
    try {
        const res = await AxiosClient.put(`/api/setup/pathology/parameter/${id}`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}





// radiology categories

export const createPathologytCategory = async (formData: z.infer<typeof CreatePathCategorySchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/pathology/category`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getPathologyCategories = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/pathology/category`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deletePathologyCategory = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/pathology/category/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}









// radiology tests

export const createPathologytTest = async (formData: z.infer<typeof TestNameFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/pathology/testName`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getPathologyTests = async (params: { page?: number, limit?: number, search?: string }) => {
    try {
        const res = await AxiosClient.get(`/api/setup/pathology/testName`, { params })
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getPathologyTestDetails = async (id: number): Promise<PathologyTestNameDetailsType> => {
    try {
        const res = await AxiosClient.get(`/api/setup/pathology/testName/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const updatePathologyTest = async (id: number, formData: z.infer<typeof TestNameFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/setup/pathology/testName/${id}`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deletePathologyTest = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/pathology/testName/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


// Test Name Parameters

export const getPathTestNameParameters = async (testNameId: number): Promise<PathTestNameParameter> => {
    try {
        const res = await AxiosClient.get(`/api/setup/pathology/testName/parameters/${testNameId}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}