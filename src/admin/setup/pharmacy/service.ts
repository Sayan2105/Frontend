import { z } from "zod";
import { MedicineGroupFromSchema } from "./medicine_group/medicineGroupFrom";
import { MedicineCompanyFormSchema } from "./medicine_company/medicineCompanyForm";
import { MedicineUnitFormSchema } from "./medicine_unit/medicineUnitForm";
import { DoseDurationFormSchema } from "./medicine_dose_duration/doseDurationForm";
import { DoseIntervalFormSchema } from "./medicine_dose_interval/doseIntervalForm";
import { MedicineCategoryFormSchema } from "./medicine_category/medicineCategoryForm";
import AxiosClient from "@/api/apiClient";



export const createMedicineGroup = async (formData: z.infer<typeof MedicineGroupFromSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/pharmacy/group`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}

export const deleteMedicineGroup = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/pharmacy/group/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const geteMedicineGroups = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/pharmacy/group`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}




// Handlers for medicine company

export const createMedicineCompany = async (formData: z.infer<typeof MedicineCompanyFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/pharmacy/company`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deleteMedicineCompany = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/pharmacy/company/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getMedicineCompanies = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/pharmacy/company`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}



// API handlers for medicine unit


export const createMedicineUnit = async (formData: z.infer<typeof MedicineUnitFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/pharmacy/unit`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deleteMedicineUnit = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/pharmacy/unit/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getMedicineUnits = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/pharmacy/unit`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}



// API Handlers for Dose Duration


export const createDoseDuration = async (formData: z.infer<typeof DoseDurationFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/pharmacy/duration`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deleteDoseDuration = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/pharmacy/duration/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getDoseDurations = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/pharmacy/duration`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}



// API handlers for dose interval


export const createDoseInterval = async (formData: z.infer<typeof DoseIntervalFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/pharmacy/interval`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deleteDoseInterval = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/pharmacy/interval/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getDoseIntervals = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/pharmacy/interval`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}



// API Handlers for medicine categories


export const createMedicineCategory = async (formData: z.infer<typeof MedicineCategoryFormSchema>) => {
    try {
        const res = await AxiosClient.post(`/api/setup/pharmacy/category`, formData)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const deleteMedicineCategory = async (id: number) => {
    try {
        const res = await AxiosClient.delete(`/api/setup/pharmacy/category/${id}`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}


export const getMedicineCategories = async () => {
    try {
        const res = await AxiosClient.get(`/api/setup/pharmacy/category`)
        return res.data
    } catch (error: any) {
        const err = error.response?.data?.message || 'Connection Error'
        throw new Error(err)
    }
}
