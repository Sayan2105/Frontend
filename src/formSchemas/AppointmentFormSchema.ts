import { z } from 'zod'


export const appointmentBaseSchema = z.object({
    rosterId: z.coerce.number().min(1, { message: 'Please select a roster' }).default(0),
    patientId: z.coerce.number().min(1, { message: 'Please select a patient' }).default(0),
    doctorId: z.coerce.number().min(1, { message: 'Please select a doctor' }).default(0),
    fees: z.coerce.number().min(1, { message: 'Fees cannot be 0' }).default(0),
    date: z.string().min(1, { message: 'Please select a date' }).default(''),
    time: z.string().min(1, { message: 'Please select a time slot' }).default(''),
    specialistId: z.coerce.number().min(1, { message: 'Please select specialist' }).default(0),
    payment_mode: z.string().min(1, { message: 'Please select payment mode' }).default(''),
    status: z.string().min(1, { message: 'Please select status' }).default(''),
    discount: z.coerce.number().optional().default(0),
    appointment_priority: z.string().min(1, { message: 'Please select priority' }).default(''),
    symptom_description: z.string().optional(),
    alternative_address: z.string().optional(),
    reference: z.string().optional(),
    previous_medical_issue: z.string().optional(),
    net_amount: z.coerce.number().min(1, { message: 'Net amount cannot be 0' }).default(0)
})


export const appointmentFormSchema = appointmentBaseSchema.refine(
    (data) => new Date(data.date).toISOString().split('T')[0] === new Date(data.time).toISOString().split('T')[0],
    {
        message: 'Please select a time slot',
        path: ['time'],
    },
)


export const patientAppointmentSchema = appointmentBaseSchema.extend({
    patientId: z.coerce.number().optional(),
    payment_mode: z.string().optional(),
    status: z.string().optional(),
})
