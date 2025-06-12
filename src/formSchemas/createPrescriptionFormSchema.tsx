import { z } from "zod";


const Medicine = z.object({
    categoryId: z.number()
        .min(1, { message: 'Medicine category is required' })
        .default(0),

    medicineId: z.number()
        .min(1, { message: 'Medicine name is required' })
        .default(0),

    doseIntervalId: z.number()
        .min(1, { message: 'Dose interval is required' })
        .default(0),

    doseDurationId: z.number()
        .min(1, { message: 'Dose duration is required' })
        .default(0),

    instruction: z.string().optional()
})


const Finding = z.object({
    findingCategoryId: z.number()
        .min(1, { message: 'Finding Category is required' })
        .default(0),

    findingNameId: z.number()
        .min(1, { message: 'Name is required' })
        .default(0),

    description: z.string()
        .optional(),
})


export const createPrescriptionFormSchema = z.object({
    header_note: z.string()
        .optional(),
    finding: z.array(Finding),
    medicine: z.array(Medicine)
})



export const valuesASdefault = {
    finding: [{
        findingCategoryId: 0,
        findingNameId: 0,
        description: ''
    }],

    medicine: [{
        categoryId: 0,
        medicineId: 0,
        doseIntervalId: 0,
        doseDurationId: 0,
        instruction: ''
    }]
}