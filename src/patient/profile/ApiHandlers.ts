import AxiosClient from "@/api/apiClient"
import { PatientDetails } from "@/types/patient/patient"




export const getPatientDetails = async (patientId: number): Promise<PatientDetails> => {
    try {
        const res = await AxiosClient.get(`/api/patient/${patientId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const resetPatientPassword = async (password: string, patientId: number) => {
    try {
        const res = await AxiosClient.put(`/api/patient/reset/${patientId}`, { password })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}


export const deletePatient = async (patientId: number) => {
    try {
        const res = await AxiosClient.delete(`/api/patient/${patientId}`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}
