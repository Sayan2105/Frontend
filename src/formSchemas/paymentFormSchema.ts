import { z } from "zod";

export const paymentFormSchema = z.object({
    date: z.string().min(1, { message: 'Date is required' }),
    chargeId: z.array(z.coerce.number().default(0)).min(1, { message: 'Charge is required' }),
    amount: z.coerce.number().min(1, { message: 'Amount should be atleast 1' }).default(0),
    paid_amount: z.coerce.number().min(1, { message: 'Paid amount should be atleast 1' }).default(0),
    balance_amount: z.coerce.number().optional().default(0),
    payment_mode: z.string().min(1, { message: 'Payment mode is required' }).default(''),
    note: z.string().optional()
})