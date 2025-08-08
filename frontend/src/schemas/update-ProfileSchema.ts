import { z } from "zod";



const updateProfileSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z
      .string()
      .min(11, { message: "Phone number must be at least 11 numbers." }),
    address: z
      .string()
      .min(10, { message: "Address must be at least 10 characters." }),
  })
  .partial()
  .refine(
    (data) => Object.keys(data).some((key) => data[key as keyof typeof data]),
    {
      message: "Please provide at least one field to update.",
    },
  );

const adminUpdateProfileSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z
      .string()
      .min(11, { message: "Phone number must be at least 11 numbers." }),
  })
  .partial()

const updatePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Must contain at least one number.")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character.",
    ),
  newPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Must contain at least one number.")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character.",
    ),
});

export { updatePasswordSchema, adminUpdateProfileSchema, updateProfileSchema };
