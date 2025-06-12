import { z } from 'zod'


// Helper function for password validation
const createPasswordSchema = (isRequired: boolean) => {
    let schema = z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(15, { message: 'Password should be less than 15 characters' });

    return isRequired
        ? schema
        : schema.optional().or(z.literal('')).transform(e => e === "" ? undefined : e);
};


export const patientRegistrationSchema = z.object({

    name: z.string()
        .min(1, { message: 'Patient name is required' })
        .max(25, { message: 'Patient name must be less than 25 characters' }),


    guardian_name: z.string()
        .min(1, { message: 'Guardian name is required' })
        .max(25, { message: 'Guardian name must be less than 25 characters' }),


    gender: z.string()
        .min(1, { message: "Please select valid gender" })
        .default(''),

    dob: z.string()
        .min(1, { message: 'Date of birth is required' })
    ,


    age: z.string()
        .min(1, { message: 'Age is required' })
    ,


    blood_group: z.string()
        .min(1, { message: 'Please select your blood group' })
        .default(''),


    marital_status: z.string()
        .min(1, { message: 'Please select marital status' })
        .default(''),


    image: z.instanceof(File)
        .optional()  // Makes the image field optional
        .refine((file) => file === undefined || file.size < 5 * 1024 * 1024, {
            message: 'File size should be less than 5MB',
        })
        .refine((file) => file === undefined || ['image/jpeg', 'image/png'].includes(file.type), {
            message: 'Only JPEG and PNG images are allowed',
        }),


    phone: z.string({ required_error: 'Phone number is required' })
        .min(10, { message: 'Phone number must be 10 numbers' })
        .max(10, { message: 'Phone number should less than be 10 numbers' })
    ,


    email: z.string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Enter valid email' }),


    password: createPasswordSchema(true),


    alergies: z.string().optional(),


    aadhar: z.string().max(16)
        .optional(),


    address: z.string()
        .min(1, { message: 'Address is required' })
        .max(70)
})


// For optional password scenarios, create a different schema
export const patientUpdateSchema = patientRegistrationSchema.extend({
    password: createPasswordSchema(false), // Set to false for optional
});


export const DefaultValues = {
    name: '',
    guardian_name: '',
    dob: '',
    age: '',
    image: undefined,
    phone: '',
    email: '',
    password: '',
    alergies: '',
    aadhar: '',
    address: ''
};





export const homepagePatientRegisterSchema = z.object({
    name: z.string()
        .min(1, { message: 'Patient name is required' })
        .max(25, { message: 'Patient name must be less than 25 characters' }),
    gender: z.string()
        .min(1, { message: "Please select valid gender" })
        .default(''),
    dob: z.string()
        .min(1, { message: 'Date of birth is required' })
    ,

    email: z.string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Enter valid email' }),

    password: createPasswordSchema(true),
})