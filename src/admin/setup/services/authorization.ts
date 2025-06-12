import AxiosClient from "@/api/apiClient"
import { z } from "zod"
import { roleFormSchema } from "../Authorization/role/createRole"


const AuthzApi = {
    async createRole(formData: z.infer<typeof roleFormSchema>) {
        try {
            const res = await AxiosClient.post(`/api/setup/authz/role`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err)
        }
    },
    async getRoles() {
        try {
            const res = await AxiosClient.get('/api/setup/authz/role');
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err);
        }
    },

    async updateRole(formData: z.infer<typeof roleFormSchema>, id: number) {
        try {
            const res = await AxiosClient.put(`/api/setup/authz/role/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err);
        }
    },

    async deleteRole(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/authz/role/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err);
        }
    },

    async getRoleDetails(id: number) {
        try {
            const res = await AxiosClient.get(`/api/setup/authz/role/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err);
        }
    },

    // Permission operations
    async createPermission(permission: string, roleId: number) {
        try {
            const res = await AxiosClient.post(`/api/setup/authz/permission/${roleId}`, { name: permission });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err);
        }
    },

    async deletePermission(name: string, roleId: number) {
        try {
            const params = { name };
            const res = await AxiosClient.delete(`/api/setup/authz/permission/${roleId}`, { params });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err);
        }
    },

    async getPermissions(params: { roleId?: number, role?: string }): Promise<{ id: number, name: string }[]> {
        try {
            const res = await AxiosClient.get('/api/setup/authz/permission', { params });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error'
            throw new Error(err);
        }
    }
}



export default AuthzApi