import AxiosClient from "@/api/apiClient"
import { TestNameFormSchema } from "@/formSchemas/setupSectionSchemas/CreateTestNameSchema"
import { RadiologyTestNameDetailsType, RadioParametersType, RadioTestNameParameter } from "@/types/setupTypes/radiology"
import { Params } from "@/types/type"
import { z } from "zod"
import { CreateRadioCategorySchema } from "./category/createRadioCategory"
import { RadioUnitSchema } from "./units/createRadioUnit"


// Handlers for Radiology Units

export const createRadiologytUnit = async (formData: z.infer<typeof RadioUnitSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/radiology/unit`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getRadiologytUnits = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/radiology/unit`)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deleteRadiologytUnit = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/radiology/unit/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


// radiology parameters

export const createRadiologytParameter = async (formData: any) => {
    try {
        const res = await AxiosClient.post(`/api/setup/radiology/parameter`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getRadiologytParameters = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/radiology/parameter`)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deleteRadiologytParameter = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/radiology/parameter/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getRadiologytParameterDetails = async (id: number): Promise<RadioParametersType> => {
    try {
        const res = await AxiosClient.get(`/api/setup/radiology/parameter/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const updateRadiologytParameter = async (id: number, formData: any) => {
    try {
        const res = await AxiosClient.put(`/api/setup/radiology/parameter/${id}`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}



// radiology categories

export const createRadiologytCategory = async (formData: z.infer<typeof CreateRadioCategorySchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/radiology/category`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getRadiologyCategories = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/radiology/category`)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deleteRadiologyCategory = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/radiology/category/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


// radiology tests

export const createRadiologytTest = async (formData: z.infer<typeof TestNameFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/radiology/testName`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getRadiologyTests = async (params?: Params) => {
    try {
        const res = await AxiosClient.get(`/api/setup/radiology/testName`, { params })
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getRadiologyTestDetails = async (id: number): Promise<RadiologyTestNameDetailsType> => {
    try {
        const res = await AxiosClient.get(`/api/setup/radiology/testName/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const updateRadiologyTest = async (id: number, formData: z.infer<typeof TestNameFormSchema>) => {
    try {
        const res = await AxiosClient.put(`/api/setup/radiology/testName/${id}`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deleteRadiologyTest = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/radiology/testName/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}


// Test Name Parameters

export const getRadioTestNameParameters = async (testNameId: number): Promise<RadioTestNameParameter> => {
    try {
        const res = await AxiosClient.get(`/api/setup/radiology/testName/parameters/${testNameId}`)
        return res.data
    } catch (error: any) {
        const err = error.response.data.message || 'Connection Error'
        throw new Error(err)
    }
}