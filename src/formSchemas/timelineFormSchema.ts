import { z } from "zod";

export const timelineFormSchema = z.object({
    title: z.string()
        .min(1, { message: 'Title is required' }),
    date: z.string()
        .min(1, { message: 'date is required' }),
    description: z.string()
        .min(1, { message: 'Description is required' }),
})