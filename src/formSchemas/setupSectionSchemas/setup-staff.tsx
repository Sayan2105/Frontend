import { z } from "zod";


export const StaffDepartmentSchema = z.object({
    name: z.string().min(1, { message: "Department name is required" }),
})


export const StaffDesignationSchema = z.object({
    name: z.string().min(1, { message: "Designation name is required" }),
})


export const StaffSpecializationSchema = z.object({
    name: z.string().min(1, { message: "Specialization name is required" }),
})