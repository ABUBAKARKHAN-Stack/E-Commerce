import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


const formSchema = z.object({
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

const SignUpComponent = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "abcd",
            email: "abcd@example.com",
            phone: "03XXXXXXXXX",
            password: "********"
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    }

    return (
        <Form  {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                                <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                                <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                                <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                                <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    Create
                </Button>
            </form>
        </Form>
    )


}

export default SignUpComponent;