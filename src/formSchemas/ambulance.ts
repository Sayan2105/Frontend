import { z } from "zod";

export const createAmbulanceSchema = z.object({
    vehicleNumber: z.string().nonempty("Vehicle number is required"),
    model: z.string().nonempty("Model is required"),
    color: z.string().optional(),
    yearMade: z.coerce.number().min(1900, "Year made is required").default(new Date().getFullYear()),
    driverName: z.string().nonempty("Driver name is required"),
    driverContact: z.string().nonempty("Driver contact is required"),
    driverLicenseNumber: z.string().nonempty("Driver license number is required"),
    vehicleType: z.string().nonempty("Vehicle type is required").default(''),
});



export const assignAmbulanceSchema = z.object({
    patientId: z.coerce.number().min(1, "Patient id is required").default(0),
    ambulanceId: z.coerce.number().min(1, "Ambulance id is required").default(0),
    date: z.string().nonempty("Date is required"),
    chargeTypeId: z.coerce.number().min(1, "Charge type id is required").default(0),
    chargeCategoryId: z.coerce.number().min(1, "Charge category id is required").default(0),
    chargeNameId: z.coerce.number().min(1, "Charge name id is required").default(0),
    kilometers: z.coerce.number().min(1, "Kilometers is required").default(0),
    standard_charge: z.coerce.number().min(1, "Standard charge is required").default(0),
    total: z.coerce.number().min(1, "Amount is required").default(0),
    net_amount: z.coerce.number().min(1, "Net amount is required").default(0),
    payment_mode: z.string().nonempty("Payment mode is required").default(''),
    payment_info: z.string().optional(),
    tax: z.coerce.number().optional(),
    tax_amount: z.coerce.number().optional(),
    discount: z.coerce.number().optional(),
    discount_amount: z.coerce.number().optional(),
    note: z.string().optional(),
});