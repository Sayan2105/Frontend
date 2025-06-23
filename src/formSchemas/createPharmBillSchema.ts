import { z } from "zod";

const ITEM = z.object({
    medicineId: z.number()
        .min(1, { message: 'Medicine name is required' })
        .default(0),

    categoryId: z.number()
        .min(1, { message: 'Medicine category is required' })
        .default(0),

    batchId: z.number()
        .min(1, { message: 'Batch is required' })
        .default(0),

    quantity: z.number()
        .min(1, { message: 'Quantity is required' })
        .default(0),

    salePrice: z.number()
        .min(1, { message: 'Sale price is required' })
        .default(0),

    tax: z.number()
        .optional()
        .default(0),

    amount: z.number()
        .min(1, { message: 'Amount is required' })
        .default(0),
})



export const createPharmacyBillSchema = z.object({

    date: z.string()
        .min(1, { message: 'Date is required' }),

    patientId: z.coerce.number()
        .min(1, { message: 'Patient is required' })
        .default(0),

    opdId: z.string()
        .optional(),

    doctor: z.string(),

    items: z.array(ITEM),

    discount: z.number()
        .optional()
        .default(0),

    net_amount: z.number()
        .int()
        .min(1, { message: 'Net amount is required' })
        .default(0),

    note: z.string()
        .optional(),

})



export const valuesASdefault = {
    items: [{
        categoryId: 0,
        medicineId: 0,
        batchId: 0,
        quantity: 0,
        salePrice: 0,
        tax: 0,
        amount: 0,
    }]
}