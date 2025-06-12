import AxiosClient from "@/api/apiClient"

import { AdminDash_MM_IncExp, AdminDashAppmtReport, AdminDashTotalCount, AdminDashVisitors } from "@/types/dashboard/adminDashboard"


export const getAdminDashIncExp = async (): Promise<AdminDashTotalCount> => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/admin`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)

    }
}

export const getAdminDash_MM_IncExp = async (params?: { year?: number, month?: string, date?: string }): Promise<AdminDash_MM_IncExp[]> => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/admin/monthly`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)

    }
}


export const getAdminDashVisitors = async (params?: { year?: number, month?: string, date?: string }): Promise<AdminDashVisitors[]> => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/admin/visitors`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getAdminDashAppointmentReport = async (params?: { year?: number, month?: string, date?: string }): Promise<AdminDashAppmtReport> => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/admin/appointmentReport`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}