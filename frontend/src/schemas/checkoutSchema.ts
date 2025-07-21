import { z } from "zod";

const addressSchema = z.object({
    fullName: z
        .string()
        .min(2, "Full name is required"),
    addressLine1: z
        .string()
        .min(5, "Address is required"),
    addressLine2: z
        .string()
        .optional(),
    city: z
        .string()
        .min(2, "City is required"),
    state: z
        .string()
        .min(2, "State is required"),
    country: z
        .string()
        .min(2, "Country is required"),
    zipCode: z
    .string()
    .min(4, "ZIP code is required"),
    phone: z
        .string()
        .min(10, "Phone number is required")
        .max(15, "Invalid phone number"),
    email: z
        .string()
        .email("Invalid email address"),
});




export {
    addressSchema
}