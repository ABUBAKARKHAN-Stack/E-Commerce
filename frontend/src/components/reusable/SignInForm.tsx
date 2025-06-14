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
import { FC, useState } from "react";
import { signInFields } from "@/constants/formFields";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "@/context/authContext";

type Props = {
    isAdmin: boolean
}

const SignInForm: FC<Props> = ({ isAdmin }) => {

    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: { email: "", password: "" },
    });
    const [isEyeOn, setIsEyeOn] = useState(false)
    const [isPassVisible, setIsPassVisible] = useState(false)
    const navigate = useNavigate()
    const { login , loading } = useAuthContext()

    const eyeToggler = () => {
        setIsEyeOn((prev) => !prev)
        setIsPassVisible(!isPassVisible)
    }
    const onSubmit = async (data: z.infer<typeof signinSchema>) => {
        login(data, isAdmin, navigate)
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
