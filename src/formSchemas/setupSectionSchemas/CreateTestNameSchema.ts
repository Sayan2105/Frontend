import { z } from "zod";

const Parameters = z.object({
    parameterId: z.coerce.number().min(1, { message: 'Parameter is required' }),
})


// It is a schema for creating a test for radiology & pathology

export const TestNameFormSchema = z.object({
    name: z.string().nonempty('Name is required'),
    shortName: z.string().nonempty('Short Name is required'),
    testType: z.string().nonempty('Test Type is required'),
    categoryId: z.coerce.number().min(1, { message: 'Category is required' }).default(0),
    method: z.string().nonempty('Method is required'),
    chargeTypeId: z.coerce.number().min(1, { message: 'Charge Type is required' }).default(0),
    chargeCategoryId: z.coerce.number().min(1, { message: 'Charge Category is required' }).default(0),
    chargeNameId: z.coerce.number().min(1, { message: 'Charge Name is required' }).default(0),
    reportDays: z.coerce.number().min(1, { message: 'Report Days is required' }).default(0),
    standardCharge: z.coerce.number().min(1, { message: 'Standard Charge is required' }).default(0),
    tax: z.coerce.number().min(1, { message: 'Tax is required' }).default(0),
    amount: z.coerce.number().min(1, { message: 'Amount is required' }).default(0),

    parameters: z.array(Parameters)
});



export const ParameterDefaultValue = {
    parameters: [{
        parameterId: 0
    }]
}