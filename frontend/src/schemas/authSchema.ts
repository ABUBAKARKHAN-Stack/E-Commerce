import * as z from "zod"

// Signup Schema
const signupSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z
        .string()
        .email({
            message: "Please enter a valid email address.",
        }),
    phone: z
        .string()
        .min(11, {
            message: "Phone number must be at least 11 numbers.",
        }),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters.",
        })
        .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Must contain at least one number.")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character."),
})

// Signin Schema
const signinSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

// Forgot Password Schema
const forgotPasswordSchema = z.object({
    identifier: z
        .string()
        .refine((val) => {
            const testEmail = /\S+@\S+\.\S+/.test(val);
            const testPhone = /^[0-9]{11}$/.test(val);
            return testEmail || testPhone;
        }, {
            message: "Email or phone number is required"
        })
})

// Reset Password Schema 
const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters."
        })
        .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Must contain at least one number.")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character."),
})

export {
    signupSchema,
    signinSchema,
    forgotPasswordSchema,
    resetPasswordSchema
}