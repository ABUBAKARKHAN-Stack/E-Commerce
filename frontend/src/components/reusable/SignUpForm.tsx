import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage , FormDescription } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { signupSchema } from "@/schemas"
import { signUpFields } from "@/constants/formFields"
import { createUser } from "@/API/userApi"
import { useState } from "react"
import { successToast, errorToast } from '@/utils/toastNotifications'
import { Eye, EyeOff } from "lucide-react"


const SignUpForm = () => {

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            phone: "",
            password: ""
        }
    })

    const [loading, setLoading] = useState(false)
    const [isEyeOn, setIsEyeOn] = useState(false)
    const [isPassVisible, setIsPassVisible] = useState(false)

    const eyeToggler = () => {
        setIsEyeOn((prev) => !prev)
        setIsPassVisible(!isPassVisible)
    }

    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        try {
            setLoading(true)
            const res = await createUser(data)
            console.log(res);
            if (res.status === 201) {
                successToast(res.data.message)
            }

        } catch (error: any) {
            const errorMsg = error.response.data.message
            errorToast(errorMsg)
        } finally {
            setLoading(false)
        }

    }

    return (
        <Form  {...form}>
            <form className="flex w-full flex-col gap-4.5" onSubmit={form.handleSubmit(onSubmit)}>
                {
                    signUpFields.map((field, i) => {
                        const { label, name, type, placeholder } = field
                        return (
                            <FormField
                                key={i}
                                control={form.control}
                                name={name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{label}</FormLabel>
                                        <FormControl>
                                            <Input type={type} placeholder={placeholder} {...field} />
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
                        )
                    })
                }
                <Button className="w-full xsm:w-fit" type="submit">
                    {
                        loading ? "" : "Sign UP"
                    }
                </Button>
            </form>
        </Form>
    )

}

export default SignUpForm;