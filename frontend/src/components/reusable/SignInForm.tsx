import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinSchema } from "@/schemas";
import { loginUser } from "@/API/userApi";
import { useState } from "react";
import { errorToast, infoToast, successToast } from "@/utils/toastNotifications";
import { signInFields } from "@/constants/formFields";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";


const SignInForm = () => {

    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: { email: "", password: "" },
    });
    const [loading, setLoading] = useState(false);
    const [isEyeOn, setIsEyeOn] = useState(false)
    const [isPassVisible, setIsPassVisible] = useState(false)
    const navigate = useNavigate()

    const eyeToggler = () => {
        setIsEyeOn((prev) => !prev)
        setIsPassVisible(!isPassVisible)
    }
    const onSubmit = async (data: z.infer<typeof signinSchema>) => {

        try {
            console.log(data);
            setLoading(true)
            const res = await loginUser(data)
            console.log(res);
            if (res.status === 200) {
                successToast(res.data.message)
                navigate("/")
            }

        } catch (error: any) {
            console.log(error);
            const errorMsg = error.response.data.message
            errorToast(errorMsg)
        } finally {
            setLoading(false)
        }

        console.log("Login Data:", data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4.5">
                {
                    signInFields.map(({ name, label, placeholder, type }, i) => {
                        return <FormField
                            key={i}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {label}
                                    </FormLabel>

                                    <FormControl>
                                        <Input type={
                                            type === "password" && isPassVisible ? "text" : type
                                        } placeholder={placeholder} {...field} />
                                    </FormControl>
                                    {
                                        name === "password" && <FormDescription>
                                            <div className="relative text-[#1B1B1F] dark:text-gray-200">
                                                <button type="button" className="absolute block -top-[79px] right-2" onClick={eyeToggler} >
                                                    {
                                                        !isEyeOn ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />
                                                    }
                                                </button>
                                            </div>
                                        </FormDescription>
                                    }
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    })
                }

                <Button disabled={loading} className="w-full xsm:w-fit" type="submit">
                    {
                        loading ? "Signing In..." : "Sign In"
                    }
                </Button>
            </form>
        </Form>
    );
};

export default SignInForm;
