import { z } from "zod";

const TestNames = z.object({
    testNameId: z.coerce.number().min(1, { message: 'Test name is required' }).default(0),
    reportDays: z.coerce.number().min(1, { message: 'Report days are required' }),
    reportDate: z.coerce.string().min(1, { message: 'Report date is required' }),
    tax: z.coerce.number().min(1, { message: 'Tax is required' }),
    amount: z.coerce.number().min(1, { message: 'Amount is required' }),
})



export const createPathologyBillSchema = z.object({
    moduleId: z.string().optional(),
    doctor: z.string().min(1, { message: 'Doctor is required' }),
    patientId: z.coerce.number().min(1, { message: 'Patient is required' }).default(0),
    date: z.string().min(1, { message: 'Date is required' }),
    previousReportValue: z.string().optional(),
    additionalTax: z.coerce.number().min(0, { message: "Tax cannot be negative" }).optional().default(0),
    discount: z.coerce.number().min(0, { message: "Discount cannot be negative" }).optional().default(0),
    net_amount: z.coerce.number().min(1, { message: 'Net amount is required' }).default(0),
    payment_mode: z.string().min(1, { message: 'Payment mode is required' }).default(''),
    note: z.string().optional(),

    tests: z.array(TestNames),
})


export const PathologyBillDefaultValues = {
    tests: [{
        testNameId: 0,
        reportDays: 0,
        reportDate: '',
        tax: 0,
        amount: 0,
    }]
}