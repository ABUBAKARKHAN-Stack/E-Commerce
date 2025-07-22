import { z } from "zod";

export const trackOrderSchema = z.object({
    orderId: z
        .string({
            required_error: "Order ID is required",
            invalid_type_error: "Order ID must be a string",
        })
        .min(8, { message: "Order ID must be exactly 8 characters long" })
        .max(8, { message: "Order ID must be exactly 8 characters long" }),
});
