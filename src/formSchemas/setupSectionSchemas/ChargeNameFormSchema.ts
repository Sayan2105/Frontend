import { z } from "zod";

export const chargeNameFormSchema = z.object({

    chargeTypeId: z.coerce.number()
        .min(1, { message: "Charge type is required" })
        .default(0),

    categoryId: z.coerce.number()
        .min(1, { message: "Charge category is required" })
        .default(0),

    name: z.string()
        .min(1, { message: "Name is required" }),

    unitId: z.coerce.number()
        .min(1, { message: "Unit is required" })
        .default(0),

    taxId: z.coerce.number()
        .min(1, { message: "Tax is required" })
        .default(0),

    tax_percentage: z.number(),

    standard_charge: z.number()
        .min(1, { message: 'Values should be atleast 1' })
        .default(0),

    tpa: z.number()
        .min(0, { message: 'Values should be atleast 0' })
        .default(0),

})