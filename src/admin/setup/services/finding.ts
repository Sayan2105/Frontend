import { z } from "zod";
import AxiosClient from "@/api/apiClient";
import { FindingCategoryFormSchema } from "../findings/finding_category/findingCategoryForm";
import { FindingNameFormSchema } from "../findings/finding_name/findingNameForm";


const findingApi = {
    // Category operations
    async createCategory(formData: z.infer<typeof FindingCategoryFormSchema>) {
        try {
            const res = await AxiosClient.post('/api/setup/finding/category', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async updateCategory(id: number, formData: z.infer<typeof FindingCategoryFormSchema>) {
        try {
            const res = await AxiosClient.put(`/api/setup/finding/category/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async deleteCategory(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/finding/category/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getCategoryDetails(id: number) {
        try {
            const res = await AxiosClient.get(`/api/setup/finding/category/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getCategories() {
        try {
            const res = await AxiosClient.get('/api/setup/finding/category');
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    // Name operations
    async createName(formData: z.infer<typeof FindingNameFormSchema>) {
        try {
            const res = await AxiosClient.post('/api/setup/finding/name', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async updateName(id: number, formData: z.infer<typeof FindingNameFormSchema>) {
        try {
            const res = await AxiosClient.put(`/api/setup/finding/name/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async deleteName(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/finding/name/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getNameDetails(id: number) {
        try {
            const res = await AxiosClient.get(`/api/setup/finding/name/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getNames(categoryId?: string) {
        try {
            const params = { categoryId };
            const res = await AxiosClient.get('/api/setup/finding/name', { params });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    }
};





export default findingApi;