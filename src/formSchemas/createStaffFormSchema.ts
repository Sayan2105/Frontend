import { z } from "zod";


export const createStaffFormSchema = z.object({
    role: z.string().min(1, { message: "Role is required" }),
    designation: z.string().min(1, { message: "Designation is required" }).default(''),
    department: z.string().min(1, { message: "Department is required" }).default(''),
    specializationId: z.array(z.coerce.number().default(0)).optional(),
    emergency_fees: z.coerce.number().optional().default(0),
    normal_fees: z.coerce.number().optional().default(0),
    salary: z.coerce.number().optional().default(0),
    name: z.string().min(1, { message: "Name is required" }),
    father_name: z.string().min(1, { message: "Father name is required" }),
    mother_name: z.string().min(1, { message: "Mother name is required" }),
    gender: z.string().min(1, { message: "Gender name is required" }).default(''),
    marital_status: z.string().default('').optional(),
    blood_group: z.string().default('').optional(),
    dob: z.string().min(1, { message: "DOB is required" }),
    date_of_joining: z.string().optional(),
    phone: z.string().optional(),
    emergency_contact: z.string().optional(),
    email: z.string().min(1, { message: "Email is required" }).email({ message: 'Invalid Email' }),
    image: z.instanceof(File)
        .optional()  // Makes the image field optional
        .refine((file) => file === undefined || file.size < 4 * 1024 * 1024, {
            message: 'File size should be less than 4MB',
        })
        .refine((file) => file === undefined || ['image/jpeg', 'image/png'].includes(file.type), {
            message: 'Only JPEG and PNG images are allowed',
        }),
    current_address: z.string().optional(),
    permanent_address: z.string().optional(),
    qualification: z.string().optional(),
    work_experience: z.string().optional(),
    PAN: z.string().optional(),
    national_identification_number: z.string().optional(),
    local_identification_number: z.string().optional(),
    license_number: z.string().optional(),

    // Bank Account
    nominee_name: z.string().optional().default(''),
    relation: z.string().optional().default(''),
    account_holder: z.string().optional(),
    account_number: z.string().optional(),
    bank_name: z.string().optional(),
    branch: z.string().optional(),
    ifsc_code: z.string().optional(),

    // documents
    aadhar_image: z.instanceof(File)
        .optional()
        .refine((file) => file === undefined || file.size < 4 * 1024 * 1024, {
            message: 'File size should be less than 4MB',
        })
        .refine((file) => file === undefined || ['image/jpeg', 'image/png'].includes(file.type), {
            message: 'Only JPEG and PNG images are allowed',
        }),

    pan_image: z.instanceof(File)
        .optional()
        .refine((file) => file === undefined || file.size < 4 * 1024 * 1024, {
            message: 'File size should be less than 4MB',
        })
        .refine((file) => file === undefined || ['image/jpeg', 'image/png'].includes(file.type), {
            message: 'Only JPEG and PNG images are allowed',
        }),

    diploma_image: z.instanceof(File)
        .optional()
        .refine((file) => file === undefined || file.size < 4 * 1024 * 1024, {
            message: 'File size should be less than 4MB',
        })
        .refine((file) => file === undefined || ['image/jpeg', 'image/png'].includes(file.type), {
            message: 'Only JPEG and PNG images are allowed',
        }),

    graduation_image: z.instanceof(File)
        .optional()
        .refine((file) => file === undefined || file.size < 4 * 1024 * 1024, {
            message: 'File size should be less than 4MB',
        })
        .refine((file) => file === undefined || ['image/jpeg', 'image/png'].includes(file.type), {
            message: 'Only JPEG and PNG images are allowed',
        }),

    masters_image: z.instanceof(File)
        .optional()
        .refine((file) => file === undefined || file.size < 4 * 1024 * 1024, {
            message: 'File size should be less than 4MB',
        })
        .refine((file) => file === undefined || ['image/jpeg', 'image/png'].includes(file.type), {
            message: 'Only JPEG and PNG images are allowed',
        }),

    license_image: z.instanceof(File)
        .optional()
        .refine((file) => file === undefined || file.size < 4 * 1024 * 1024, {
            message: 'File size should be less than 4MB',
        })
        .refine((file) => file === undefined || ['image/jpeg', 'image/png'].includes(file.type), {
            message: 'Only JPEG and PNG images are allowed',
        }),

})