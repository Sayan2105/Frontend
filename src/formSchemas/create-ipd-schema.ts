import { z } from "zod";


export const CreateIpdSchema = z.object({
    patientId: z.coerce.number().min(1, "Patient id is required").default(0),
    date: z.string().nonempty("Date is required"),
    opdId: z.string().optional(),
    casualty: z.string().optional(),
    old_patient: z.string().optional(),
    reference: z.string().optional(),
    doctorId: z.coerce.number().min(1, "Doctor id is required").default(0),
    bedGroupId: z.coerce.number().min(1, "Bed group id is required").default(0),
    bedId: z.coerce.number().min(1, "Bed id is required").default(0),
    symptom_type: z.string().optional(),
    symptom_description: z.string().optional(),
    previous_medical_issue: z.string().optional(),
    note: z.string().optional(),
})

