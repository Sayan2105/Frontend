import {z} from "zod";


export const dischargeFormSchema = z.object({
    discharge_date: z.string().nonempty('Date is required'),
    discharge_type: z.string().nonempty('Discharge type is required').default(''),
    billingStatus: z.string().nonempty('Billing status is required').default(''),
    discharge_note: z.string().optional(),
    doctor: z.string().optional()
})