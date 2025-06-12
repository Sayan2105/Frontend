import AxiosClient from "@/api/apiClient"
import { PatientDetails } from "@/types/patient/patient"
import { z, ZodType } from "zod"



const PatientApi = {

    createPatient: async <T extends ZodType<any>>(formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.post('/api/patient', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Network Error'
            throw new Error(err)
        }
    },

    updatePatient: async <T extends ZodType<any>>(patinetId: number, formData: z.infer<T>) => {
        try {
            const res = await AxiosClient.put(`/api/patient/${patinetId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || 'Network Error'
            throw new Error(err)
        }
    },

    getPatientById: async (id: number): Promise<PatientDetails> => {
        try {
            const res = await AxiosClient.get(`/api/patient/${id}`)
            return res.data
        } catch (error: any) {
            throw new Error(error.response?.data?.message)
        }
    },

    resetPassword: async (id: number, password: string,) => {
        try {
            const res = await AxiosClient.put(`/api/patient/reset/${id}`, { password })
            return res.data
        } catch (error: any) {
            throw new Error(error.response?.data?.message)
        }
    },

    deletePatient: async (patientId: number) => {
        try {
            console.log(patientId)

            const res = await AxiosClient.delete(`/api/patient/${patientId}`)
            return res.data
        } catch (error: any) {
            throw new Error(error.response?.data?.message)
        }
    }


}





export default PatientApi





// in the backend i am not checking token thats why patient signup is working without token
