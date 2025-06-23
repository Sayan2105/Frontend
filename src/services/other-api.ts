import AxiosClient from "@/api/apiClient"
import { Patients } from "@/types/type"


export const OtherApi = {
    async getPatients(value?: string): Promise<Patients[]> {
        const res = await AxiosClient.get(`/api/patient?search=${value}`)
        return res.data
    },
}