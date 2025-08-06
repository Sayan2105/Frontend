import { z } from "zod";

export const AssignRosterSchema = z.object({

    staffId: z.number()
        .min(1, { message: 'Staff is required' }).default(0),

    shiftStartTime: z.string()
        .min(1, { message: 'Shift start time is required' }),

    shiftEndTime: z.string()
        .min(1, { message: 'Shift end time is required' }),

    shiftStartDate: z.string()
        .min(1, { message: 'Shift start date is required' }),

    shiftEndDate: z.string()
        .min(1, { message: 'Shift end date is required' }),

    dutyAt: z.string().min(1, { message: 'Duty at is required' }).default(''),

    intervalMinutes: z.coerce.number()
        .optional()
        .refine((val) => !val || (val >= 15 && val <= 60), {
            message: 'Interval minutes must be between 15 and 60',
        }),

    willTakeAppointment: z.boolean().optional(),

    note: z.string().optional(),

}).refine(data => new Date(data.shiftEndDate) >= new Date(data.shiftStartDate), {
    message: 'End date must be after start date',
    path: ['shiftEndDate'],
})