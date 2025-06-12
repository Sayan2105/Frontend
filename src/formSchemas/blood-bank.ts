import { z } from "zod";

// For Blood Donors form
export const bloodDonorSchema = z.object({
    name: z.string().nonempty("Name is required"),
    dob: z.string().nonempty("DOB is required"),
    blood_group: z.string().nonempty("Blood group is required"),
    gender: z.string().nonempty("Gender is required"),
    father_name: z.string().optional(),
    contact: z.string().optional(),
})


// For Blood Donations form
export const bloodDonationSchema = z.object({
    donorId: z.coerce.number().min(1, "Donor id is required").default(0),
    blood_group: z.string().nonempty("Blood group is required").default(''),
    bag: z.string().nonempty("Bag is required"),
    expiry: z.coerce.string().nonempty("Expiry date is required")
        .refine(value => value >= new Date().toISOString().split('T')[0], // works on false
            { message: 'Expiry date should be greater than today' }
        ),
})


// For Isuue Blood form
export const issueBloodSchema = z.object({
    patientId: z.coerce.number().min(1, "Patient is required").default(0),
    doctor: z.string().nonempty("Doctor is required"),
    date: z.coerce.string().nonempty("Issue date is required")
        .refine(value => value >= new Date().toISOString().split('T')[0], // works on false
            { message: 'Issue date should be greater than today' }
        ),
    blood_group: z.string().nonempty("Blood group is required").default(''),
    bag: z.string().nonempty("Bag is required").default(''),
    chargeTypeId: z.coerce.number().min(1, "Charge type is required").default(0),
    chargeCategoryId: z.coerce.number().min(1, "Charge category is required").default(0),
    chargeNameId: z.coerce.number().min(1, "Charge name is required").default(0),
    standard_charge: z.coerce.number().min(1, "Standard charge is required").default(0),
    tax: z.coerce.number().optional().default(0),
    taxRate: z.coerce.number().optional().default(0),
    discount: z.coerce.number().optional().default(0),
    discountRate: z.coerce.number().optional().default(0),
    payment_mode: z.string().nonempty("Payment mode is required").default(''),
    payment_info: z.string().optional(),
    net_amount: z.coerce.number().min(1, "Net amount is required").default(0),
    note: z.string().optional(),
})



// for Blood Components
const blood_component = z.object({
    name: z.string().nonempty("Component name is required"),
    bag: z.string().nonempty("Bag is required"),
    lot: z.coerce.number().min(1, "Lot is required").default(0),
    institution: z.string().optional(),
})


export const bloodComponentSchema = z.object({
    blood_group: z.string().nonempty("Blood group is required").default(''),
    bag: z.string().nonempty("Bag is required").default(''),
    components: z.array(blood_component).nonempty("Component is required"),
})



export const defaultBCFields = {
    components: [
        {
            name: '',
            bag: '',
            lot: 0,
            institution: ''
        }
    ]
}



// rest of the this are same excep this
export const issueBloodComponentSchema = issueBloodSchema.extend({
    component: z.string().nonempty("Component is required").default('')
})