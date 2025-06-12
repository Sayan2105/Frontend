import { z } from "zod";

export const AddMedicinesFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'Medicine Name is required' }),

    categoryId: z.string()
        .min(1, { message: 'Select medicine category' })
        .default(''),

    companyId: z.string()
        .optional(),

    composition: z.string()
        .optional(),

    groupId: z.string()
        .optional(),

    unitId: z.string()
        .min(1, { message: 'Select medicine unit' })
        .default(''),

    min_level: z.string()
        .optional(),

    reorder_level: z.string()
        .optional(),

    vat: z.string()
        .optional(),

    rack_no: z.string()
        .optional(),

    note: z.string()
        .optional(),
})