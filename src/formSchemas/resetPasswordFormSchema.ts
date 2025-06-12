import { z } from "zod";

export const ResetPasswordForm = z.object({
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(15, { message: 'Password should be less than 15 characters' }),

    confirm_password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(15, { message: 'Password should be less than 15 characters' })
}).refine((data) => data.password === data.confirm_password, {
    message: 'Password did not match',
    path: ['confirm_password'],
  })