import { z } from "zod";

const charges = z.object({
    chargeTypeId: z.coerce.number().min(1, { message: 'Select charge type' }).default(0),
    categoryId: z.coerce.number().min(1, { message: 'Select charge category' }).default(0),
    chargeNameId: z.coerce.number().min(1, { message: 'Select charge name' }).default(0),
    standard_charge: z.coerce.number().min(1, { message: 'Standard charge should be atleast 1' }).default(0),
    tpa: z.coerce.number().optional().default(0),
    date: z.string().min(1, { message: 'Date is required' }),
    total: z.coerce.number().min(1, { message: 'Total amount should be atleast 1' }).default(0),
    tax: z.coerce.number().optional().default(0),
    discount: z.coerce.number().optional().default(0),
    net_amount: z.coerce.number().min(1, { message: 'Net amount should be atleast 1' }).default(0),
})


export const chargeFormSchema = z.object({
    charge: z.array(charges),
})




export const valuesASdefault = {
    charge: [{
        chargeTypeId: 0,
        categoryId: 0,
        chargeNameId: 0,
        standard_charge: 0,
        tpa: 0,
        date: '',
        total: 0,
        tax: 0,
        discount: 0,
        net_amount: 0
    }]
}