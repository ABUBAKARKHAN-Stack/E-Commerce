import { sendContactMessage } from '@/API/userApi'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { contactFields } from '@/constants/formFields'
import { useAuthContext } from '@/context/authContext'
import { contactSchema } from '@/schemas/contactSchema'
import { ApiErrorType, IUser } from '@/types/main.types'
import { errorToast, successToast } from '@/utils/toastNotifications'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { LoaderPinwheel } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ContactForm = () => {
    const form = useForm({
        resolver: zodResolver<z.infer<typeof contactSchema>>(contactSchema),
        defaultValues: {
            email: "",
            name: "",
            message: "",
            subject: "",
        }
    })
    const { user } = useAuthContext()
    const messageLength = form.watch('message').length;
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) return;
        const currentUser = user as IUser;
        if (currentUser.username) form.setValue('name', currentUser.username);
        if (currentUser.email) form.setValue('email', currentUser.email);
    }, [user, form.formState.isSubmitSuccessful])

    const onSubmit = async (data: z.infer<typeof contactSchema>) => {

        try {
            setLoading(true)
            const res = await sendContactMessage(data);
            if (res.status === 200) {
                successToast(res.data.message);
                form.reset()
            }
        } catch (error) {
            const err = error as AxiosError<ApiErrorType>
            const errMsg = err.response?.data.message || "Something went wrong";
            errorToast(errMsg);
        } finally {
            setLoading(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full shadow-10px rounded-lg dark:shadow-orange-500 shadow-cyan-500 p-8 overflow-x-hidden flex-col max-w-2xl mx-auto gap-4.5">
                {contactFields.map(({ label, name, placeholder, type }) => (
                    <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {label}
                                </FormLabel>
                                <FormControl>
                                    {
                                        name === "message" ? (
                                            <Textarea
                                                {...field}
                                                placeholder={placeholder}
                                                className={`text-wrap resize-none  ${messageLength > 350 && "text-muted"}`}
                                            />

                                        ) : (
                                            <Input
                                                {...field}
                                                placeholder={placeholder}
                                                type={type}
                                            />
                                        )
                                    }
                                </FormControl>
                                {name === 'message' && (<div className="relative">
                                    <div className={`absolute -bottom-4.5 right-0 text-xs font-light pointer-events-none ${messageLength > 350 ? 'text-destructive-foreground' : 'text-muted-foreground'}`}>
                                        {messageLength}/350
                                    </div>
                                </div>)}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button
                    disabled={loading}
                    size="lg" type="submit" className="w-fit">
                    {
                        loading ? <>
                            <span>Sending Message</span>
                            <LoaderPinwheel className='animate-spin' />
                        </> : "Send Message"
                    }
                </Button>
            </form>
        </Form>
    )
}

export default ContactForm