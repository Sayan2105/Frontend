import { z } from "zod";


export const sampleCollectionSchema = z.object({
    staffId: z.coerce.number().min(1, 'Staff id is required').default(0),
    date: z.string().nonempty('Date is required'),
    center: z.string().nonempty('Center is required'),
})