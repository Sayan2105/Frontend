import AxiosClient from "@/api/apiClient"

type searchParams = {
    year?: number
    month?: string
    date?: string
}

export const getPatientDashTotalCount = async () => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/patient/totalCount`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}



export const getPatientExpenseReport = async (params?: searchParams) => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/patient/expenseReport`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getApppointmentStatusCount = async (params?: searchParams) => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/patient/appointmentReport`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const getPatientTotalExpenses = async () => {
    try {
        const res = await AxiosClient.get(`/api/dashboard/patient/totalExpenses`,)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}