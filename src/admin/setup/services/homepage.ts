import AxiosClient from "@/api/apiClient";
import { Params } from "@/types/type";
import { z } from "zod";



const homapeageApi = {
    async createNews<f extends z.ZodAny>(formData: z.infer<f>) {
        try {
            const res = await AxiosClient.post('/api/setup/homepage/news', formData , { headers: { 'Content-Type': 'multipart/form-data' } });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
    async updateNews<f extends z.ZodAny>(id: number, formData: z.infer<f>) {
        try {
            const res = await AxiosClient.put(`/api/setup/homepage/news/${id}`, formData , { headers: { 'Content-Type': 'multipart/form-data' } });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
    async deleteNews(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/homepage/news/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
    async getNews(params: Params) {
        try {
            const res = await AxiosClient.get('/api/setup/homepage/news', { params });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
    async createAnnualCalendar<f extends z.ZodAny>(formData: z.infer<f>) {
        try {
            const res = await AxiosClient.post('/api/setup/homepage/annual-calendar', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
    async updateAnnualCalendar<f extends z.ZodAny>(id: number, formData: z.infer<f>) {
        try {
            const res = await AxiosClient.put(`/api/setup/homepage/annual-calendar/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
    async deleteAnnualCalendar(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/homepage/annual-calendar/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
    async getAllAnnualCalendar() {
        try {
            const res = await AxiosClient.get('/api/setup/homepage/annual-calendar');
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
    async createHomeEvent<f extends z.ZodAny>(formData: z.infer<f>) {
        try {
            const res = await AxiosClient.post('/api/setup/homepage/event', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
    async updateHomeEvent<f extends z.ZodAny>(id: number, formData: z.infer<f>) {
        try {
            const res = await AxiosClient.put(`/api/setup/homepage/event/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
    async deleteHomeEvent(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/homepage/event/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
    async getAllHomeEvents(params: Params) {
        try {
            const res = await AxiosClient.get('/api/setup/homepage/event', { params });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },
}






export default homapeageApi;