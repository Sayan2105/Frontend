import AxiosClient from "@/api/apiClient"
import { User } from "@/contexts/authContext"

export const AuthApi = {
    async signin<T extends any>(data: T): Promise<User> {
        const res = await AxiosClient.post('/api/auth/signin', data)
        return res.data
    },

    async signout() {
        const res = await AxiosClient.post('/api/auth/signout')
        return res.data
    },

    async checkAuth(): Promise<User> {
        const res = await AxiosClient.get('/api/auth/check-auth')
        return res.data
    },
    async resetPassword(token: string, password: string) {
        const res = await AxiosClient.post('/api/auth/reset-password', { token, password })
        return res.data
    },
    async forgotPassword(email: string) {
        const res = await AxiosClient.post('/api/auth/forgot-password', { email })
        return res.data
    },
}