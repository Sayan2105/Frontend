import { z } from "zod";

export const vitalFormSchema = z.object({
    date: z.string()
        .min(1, { message: "Date is required" })
        .refine((date) => {
            const inputDate = new Date(date);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            return inputDate >= currentDate;  // if input date is equal or greater than should not happen annything
        }, { message: 'Date cannot be in the past' }),

    setup_VitalId: z.number()
        .min(1, { message: 'Vital name is required' }),

    value: z.string()
        .min(1, { message: 'Value is required' }),

})