import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(5, "Name is required"),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().optional(),
  message: z
    .string()
    .min(50, "Message is too short — please write at least 50 characters.")
    .max(350, "Message is too long — please keep it under 350 characters."),
});
