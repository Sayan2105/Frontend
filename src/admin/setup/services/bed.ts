import AxiosClient from "@/api/apiClient";
import { z } from "zod";
import { PaginatedBedType } from "@/types/setupTypes/bedTypes";
import { Params } from "@/types/type";
import { SetupFloorSchema } from "../bed/floor/bed-floors";
import { SetupBedGroupsSchema } from "../bed/group/bed-groups";
import { SetupBedSchema } from "../bed/bed-name/bed";


const bedApi = {
    // Floor operations
    async createFloor(formData: z.infer<typeof SetupFloorSchema>) {
        try {
            const res = await AxiosClient.post('/api/setup/bed/floor', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getFloors() {
        try {
            const res = await AxiosClient.get('/api/setup/bed/floor');
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    },

    async deleteFloor(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/bed/floor/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    },

    // Group operations
    async createGroup(formData: z.infer<typeof SetupBedGroupsSchema>) {
        try {
            const res = await AxiosClient.post('/api/setup/bed/group', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    },

    async updateGroup(id: number, formData: z.infer<typeof SetupBedGroupsSchema>) {
        try {
            const res = await AxiosClient.put(`/api/setup/bed/group/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getGroups() {
        try {
            const res = await AxiosClient.get('/api/setup/bed/group');
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    },

    async deleteGroup(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/bed/group/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getGroupDetails(id: number) {
        try {
            const res = await AxiosClient.get(`/api/setup/bed/group/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    },

    // Bed operations
    async createBed(formData: z.infer<typeof SetupBedSchema>) {
        try {
            const res = await AxiosClient.post('/api/setup/bed', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    },

    async updateBed<T extends {}>(id: number, formData: T) {
        try {
            const res = await AxiosClient.put(`/api/setup/bed/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getBeds(params?: Params): Promise<PaginatedBedType> {
        try {
            const res = await AxiosClient.get('/api/setup/bed', { params });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    },

    async deleteBed(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/bed/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data?.message || 'Connection error';
            throw new Error(err);
        }
    }
};



export default bedApi;