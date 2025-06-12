import { z } from 'zod'


export const PurchaseMedicineFormSchema = z.object({
    categoryId: z.string()
        .min(1, { message: 'Medicine category is required' })
        .default(''),

    medicineId: z.string()
        .min(1, { message: 'Medicine name is required' })
        .default(''),

    supplier_name: z.string()
        .min(1, { message: 'Supplier name is required' }),

    batch_no: z.string()
        .min(1, { message: 'Batch no is required' }),

    purchase_date: z.string()
        .min(1, { message: 'Purchase date is required' }),

    expiry_date: z.string()
        .min(1, { message: 'Expiry date is required' }),

    MRP: z.string()
        .min(1, { message: 'MRP is required' }),

    sale_price: z.string().optional(),

    packing_quantity: z.string().optional(),

    quantity: z
    .number()
    .int('Quantity must be an integer')
    .min(0, 'Quantity must be at least 0')
    .max(10000, 'Quantity cannot exceed 10000'),

    purchase_price: z.string()
        .min(1, { message: 'Purchase price is required' }),

    tax: z.string().optional(),

    discount: z.string().optional(),

    amount: z.number().optional().default(0),

    total_amount: z.number().optional(),

    payment_mode: z.string()
        .min(1, { message: 'Select payment mode' }),

    note: z.string().optional(),
})
