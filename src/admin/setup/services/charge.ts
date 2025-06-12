import { z } from "zod";
import AxiosClient from "@/api/apiClient";
import { unitFormSchema } from "../hospital-charges/chargeUnit/addUnitFormModel";
import { taxFormSchema } from "../hospital-charges/taxes/addTaxformModel";
import { ChargeTypeformModelSchema } from "../hospital-charges/chargeType/addChargeTypeformModel";
import { ChargeCategoryFormSchema } from "../hospital-charges/chargesCategory/addChargeCategoryFormModel";
import { chargeNameFormSchema } from "@/formSchemas/setupSectionSchemas/ChargeNameFormSchema";
import { Charge_Type_Interface } from "../hospital-charges/chargeType/chargeTypes";
import { TaxType } from "../hospital-charges/taxes/taxList";
import { chargeNameDetailsType, chargeNamesType } from "@/types/setupTypes/chargeName";


export type chargeModuleType = 'opd' | 'ipd' | 'appointment' | 'radiology' | 'pathology' | 'blood_bank' | 'ambulance';


export const hospitalChargeApi = {
    // Unit operations
    async createUnit(formData: z.infer<typeof unitFormSchema>) {
        try {
            const res = await AxiosClient.post('/api/setup/charge/unit', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async updateUnit(id: number, formData: z.infer<typeof unitFormSchema>) {
        try {
            const res = await AxiosClient.put(`/api/setup/charge/unit/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getUnitDetails(id: number) {
        try {
            const res = await AxiosClient.get(`/api/setup/charge/unit/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getUnitList() {
        try {
            const res = await AxiosClient.get('/api/setup/charge/unit');
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async deleteUnit(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/charge/unit/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    // Tax operations
    async createTax(formData: z.infer<typeof taxFormSchema>) {
        try {
            const res = await AxiosClient.post('/api/setup/charge/tax', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async updateTax(id: number, formData: z.infer<typeof taxFormSchema>) {
        try {
            const res = await AxiosClient.put(`/api/setup/charge/tax/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async deleteTax(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/charge/tax/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getTaxDetails(id: number): Promise<TaxType> {
        try {
            const res = await AxiosClient.get(`/api/setup/charge/tax/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getTaxesList() {
        try {
            const res = await AxiosClient.get('/api/setup/charge/tax');
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    // Charge Type operations
    async createChargeType(formData: z.infer<typeof ChargeTypeformModelSchema>) {
        try {
            const res = await AxiosClient.post('/api/setup/charge/type', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async updateChargeType(id: number, formData: z.infer<typeof ChargeTypeformModelSchema>) {
        try {
            const res = await AxiosClient.put(`/api/setup/charge/type/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async deleteChargeType(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/charge/type/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getChargeTypes(module?: chargeModuleType): Promise<Charge_Type_Interface[]> {
        try {
            const params = { module };
            const res = await AxiosClient.get('/api/setup/charge/type', { params });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getChargeTypeDetails(id: number) {
        try {
            const res = await AxiosClient.get(`/api/setup/charge/type/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async updateChargeTypeModule(id: number, data: any) {
        try {
            const res = await AxiosClient.put(`/api/setup/charge/type/module/${id}`, data);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    // Charge Category operations
    async createChargeCategory(formData: z.infer<typeof ChargeCategoryFormSchema>) {
        try {
            const res = await AxiosClient.post('/api/setup/charge/category', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async updateChargeCategory(id: number, formData: z.infer<typeof ChargeCategoryFormSchema>) {
        try {
            const res = await AxiosClient.put(`/api/setup/charge/category/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async deleteChargeCategory(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/charge/category/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getChargeCategoryDetails(id: number) {
        try {
            const res = await AxiosClient.get(`/api/setup/charge/category/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getChargeCategories(chargeTypeId?: number) {
        try {
            const params = { chargeTypeId };
            const res = await AxiosClient.get('/api/setup/charge/category', { params });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    // Charge Name operations
    async createChargeName(formData: z.infer<typeof chargeNameFormSchema>) {
        try {
            const res = await AxiosClient.post('/api/setup/charge/name', formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async updateChargeName(id: number, formData: z.infer<typeof chargeNameFormSchema>) {
        try {
            const res = await AxiosClient.put(`/api/setup/charge/name/${id}`, formData);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async deleteChargeName(id: number) {
        try {
            const res = await AxiosClient.delete(`/api/setup/charge/name/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getChargeNameDetails(id: number): Promise<chargeNameDetailsType> {
        try {
            const res = await AxiosClient.get(`/api/setup/charge/name/${id}`);
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    },

    async getChargeNames(params: { page?: number, search?: string, limit?: number }): Promise<chargeNamesType> {
        try {
            const res = await AxiosClient.get('/api/setup/charge/name', { params });
            return res.data;
        } catch (error: any) {
            const err = error.response?.data.message || 'Connection error';
            throw new Error(err);
        }
    }
};



export default hospitalChargeApi;