import { z } from "zod";

const adminCancelOrderSchema = z.object({
    cancellationReason: z
        .string()
        .trim()
        .min(30, 'Reason must be at least 30 words.')
        .max(250, 'Reason must not exceed 250 words.')
});

export {
    adminCancelOrderSchema
}