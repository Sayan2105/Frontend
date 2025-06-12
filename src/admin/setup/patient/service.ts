import AxiosClient from "@/api/apiClient"

export const getSetupPatinets = async (params: { page?: number, limit?: number, search?: string }) => {
    try {
        const res = await AxiosClient.get(`/api/setup/patient`, { params })
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message)
    }
}