import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updatePasswordFields, updateProfileFields } from '@/constants/formFields'
import { useAuthContext } from '@/context/authContext'
import { updatePasswordSchema } from '@/schemas/update-ProfileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import PasswordVisibilityToggler from './PasswordVisibilityToggler'

type Props = {
    isAdmin?: boolean
}

const UpdatePasswordForm: FC<Props> = ({ isAdmin = false }) => {
    const { updatePassword } = useAuthContext()

    const form = useForm({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        }
    })


    const onSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
        const res = await updatePassword(isAdmin, data);
        if (!res) return;
        form.reset()
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">


                <div className="flex justify-start items-center">
                    <h3 className="text-lg font-semibold">Change Password</h3>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 relative z-20 gap-6">
                    {updatePasswordFields.map(({ label, name, placeholder, type }, i) => (
                        <FormField
                            key={i}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <PasswordVisibilityToggler
                                            name={name}
                                            type={type}
                                            field={field}
                                            placeholder={placeholder}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>
                <div className="flex justify-start pt-2">
                    <Button
                        type="submit"
                        disabled={!form.formState.isDirty}
                        className="w-fit"
                    >
                        Update Password
                    </Button>
                </div>

            </form>
        </Form>

    )
}

export default UpdatePasswordForm
