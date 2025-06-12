import AxiosClient from "@/api/apiClient"
import { medicinePurchaseDetails, medicinePurchases } from "@/types/opd_section/purchaseMedicine"
import { medicineBatchDetails, medicineDetails, medicinesBYcategory, paginatedMedicines } from "@/types/pharmacy/pharmacy"
import { Params } from "@/types/type"
import { z, ZodType } from "zod"



const PharmacyApi = {

    createMedicine: async <F extends ZodType<any>>(formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.post(`/api/pharmacy`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    updateMedicine: async <F extends ZodType<any>>(id: number, formData: z.infer<F>): Promise<medicineDetails> => {
        try {
            const res = await AxiosClient.put(`/api/pharmacy/${id}`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    getMedicines: async (params: Params): Promise<paginatedMedicines> => {
        try {
            const res = await AxiosClient.get(`/api/pharmacy`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    getMedicinesBYcategory: async (categoryId: number): Promise<medicinesBYcategory[]> => {
        try {
            const res = await AxiosClient.get(`/api/pharmacy/names/${categoryId}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    deleteMedicine: async (id: number) => {
        try {
            const res = await AxiosClient.delete(`/api/pharmacy/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    getMedicineById: async (id: number): Promise<medicineDetails> => {
        try {
            const res = await AxiosClient.get(`/api/pharmacy/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },


    // API handlers for purchase medicine
    createPurchase: async <F extends ZodType<any>>(formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.post(`/api/pharmacy/purchase`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    getPurchases: async (params: Params): Promise<medicinePurchases> => {
        try {
            console.log(params);

            const res = await AxiosClient.get(`/api/pharmacy/purchase`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    getMedicinePurchaseById: async (id: string): Promise<medicinePurchaseDetails> => {
        try {
            const res = await AxiosClient.get(`/api/pharmacy/purchase/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    deletePurchaseMedicine: async (id: string) => {
        try {
            const res = await AxiosClient.delete(`/api/pharmacy/purchase/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    // medicine batches
    getMedicinesBatches: async (medicineId: number) => {
        try {
            const res = await AxiosClient.get(`/api/pharmacy/batch/${medicineId}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    getMedicinesBatchDetails: async (batchId: number): Promise<medicineBatchDetails> => {
        try {
            const res = await AxiosClient.get(`/api/pharmacy/batch/details/${batchId}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    //  pharmacy bill
    createPharmacyBill: async <F extends ZodType<any>>(formData: z.infer<F>) => {
        try {
            const res = await AxiosClient.post(`/api/pharmacy/bill`, formData)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    getPharmacyBills: async (params: Params) => {
        try {
            const res = await AxiosClient.get(`/api/pharmacy/bill`, { params })
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    getPharmacyBillById: async (id: string) => {
        try {
            const res = await AxiosClient.get(`/api/pharmacy/bill/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    },

    deletePharmacyBill: async (id: string) => {
        try {
            const res = await AxiosClient.delete(`/api/pharmacy/bill/${id}`)
            return res.data
        } catch (error: any) {
            const err = error.response?.data?.message || "Connection Failed"
            throw new Error(err)
        }
    }
}







export default PharmacyApi