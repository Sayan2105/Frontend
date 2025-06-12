import { z } from "zod";

export const operationFormSchema = z.object({
    categoryId: z.coerce.number().min(1, "Category is required").default(0),
    oprNameId: z.coerce.number().min(1, "Operation name is required").default(0),
    date: z.string().min(1, "Date is required"),
    doctorId: z.coerce.number().min(1, "Doctor is required").default(0),
    assistant_1: z.string().optional(),
    assistant_2: z.string().optional(),
    anesthetist: z.string().optional(),
    anesthesia_type: z.string().optional(),
    ot_technician: z.string().optional(),
    ot_assistant: z.string().optional(),
    note: z.string().optional(),
    result: z.string().optional(),
})