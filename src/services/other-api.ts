import AxiosClient from "@/api/apiClient"
import { Patients } from "@/types/type"


export const OtherApi = {
    // fetching patients on serach
    async getPatients(value: string): Promise<Patients[]> {
        try {
            const res = await AxiosClient.get(`/api/patient?search=${value}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Error in fetching patients"
            throw new Error(err)

        }
    },
}