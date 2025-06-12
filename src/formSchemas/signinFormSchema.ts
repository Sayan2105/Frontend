import { z } from "zod";

export const signInformSchema = z.object({

    email: z.string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Enter valid email' }),

    password: z.string()
        .min(1, { message: 'Password is required' })

})