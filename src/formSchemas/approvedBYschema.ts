import { z } from "zod";

const reportValues = z.object({
    parameterId: z.coerce.number().min(1, 'Parameter name is required').default(0),
    reportValue: z.string().nonempty('Report value is required')
})


export const LabReportFormSchema = z.object({
    staffId: z.coerce.number().min(1, 'Staff id is required').default(0),
    date: z.string().nonempty('Date is required'),
    result: z.string().optional(),
    report: z.array(reportValues)
})