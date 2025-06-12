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

    shift: z.string()
        .min(1, { message: 'Shift is required' }).default(''),

    note: z.string().optional(),

}).refine(data => new Date(data.shiftEndDate) >= new Date(data.shiftStartDate), {
    message: 'End date must be after start date',
    path: ['shiftEndDate'],
})