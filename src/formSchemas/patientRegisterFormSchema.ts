import { z } from 'zod'


export const patientBasedSchema = z.object({

    name: z.string()
        .min(1, { message: 'Patient name is required' })
        .max(25, { message: 'Patient name must be less than 25 characters' }).default(''),


    guardian_name: z.string()
        .min(1, { message: 'Guardian name is required' })
        .max(25, { message: 'Guardian name must be less than 25 characters' }).default(''),


    gender: z.string()
        .min(1, { message: "Please select valid gender" })
        .default(''),

    dob: z.string()
        .min(1, { message: 'Date of birth is required' })
        .default('')
    ,

    age: z.string()
        .min(1, { message: 'Age is required' })
        .default('')
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
        .email({ message: 'Enter valid email' }).default(''),


    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(15, { message: 'Password should be less than 15 characters' }).default(''),

    confirm_password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(15, { message: 'Password should be less than 15 characters' }).default(''),


    alergies: z.string().optional(),

    aadhar: z
        .string()
        .optional()
        .refine((val) => {
            if (val === undefined || val.trim() === '') return true;
            return val.length === 12;
        }, {
            message: 'Aadhar number should be exactly 12 digits',
        }),


    address: z.string()
        .min(1, { message: 'Address is required' })
        .max(70)
        .default('')
})


export const patientRegistrationSchema = patientBasedSchema.refine(
    (data) => data.password === data.confirm_password,
    {
        message: 'Passwords do not match',
        path: ['confirm_password'],
    }
);



// For optional password scenarios, create a different schema
export const patientUpdateSchema = patientBasedSchema.extend({
    password: z.string().optional(),
    confirm_password: z.string().optional(),
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
    confirm_password: '',
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
        .min(1, { message: 'Date of birth is required' }),

    email: z.string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Enter valid email' }),

    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(15, { message: 'Password should be less than 15 characters' }),

    confirm_password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(15, { message: 'Password should be less than 15 characters' }),
})
    .refine((data) => data.password === data.confirm_password, {
        message: 'Password did not match',
        path: ['confirm_password'],
    })