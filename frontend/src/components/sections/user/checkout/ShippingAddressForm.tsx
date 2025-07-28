import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addressFields } from '@/constants/formFields'
import { useAuthContext } from '@/context/authContext'
import { shippingAddressSchema } from '@/schemas/checkoutSchema'
import { CheckoutTabsType, IUser } from '@/types/main.types'
import { handleScrollToSection } from '@/utils/HandleScrollToSection'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
    setShippingAddressCompleted: Dispatch<SetStateAction<boolean>>;
    setShippingAddress: Dispatch<SetStateAction<z.infer<typeof shippingAddressSchema>>>;
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<CheckoutTabsType>>
}

const ShippingAddressForm: FC<Props> = ({
    setShippingAddress,
    setShippingAddressCompleted,
    activeTab,
    setActiveTab
}) => {
    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            country: "",
            email: "",
            fullName: "",
            state: "",
            phone: "",
            postalCode: "",
        }
    });
    const { user } = useAuthContext()


    useEffect(() => {
        if (!user) return;
        const currentUser = user as IUser;
        form.setValue("fullName", currentUser.username);
        form.setValue("email", currentUser.email);
        form.setValue("phone", currentUser.phone as string);
        form.setValue("addressLine1", currentUser?.address || "")
    }, [user])

    const onSubmit = (data: z.infer<typeof shippingAddressSchema>) => {
        setShippingAddressCompleted(true)
        setActiveTab("shipping-method");
        handleScrollToSection("shipping-method-section")
        setShippingAddress(data)
    }

    return activeTab === "shipping-address" ? (
        <div className='rounded-2xl bg-background'>
            <div className="bg-gradient-to-r rounded-t-2xl from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <MapPin className="w-6 h-6" />
                    Shipping Address
                </h2>
                <p className="dark:text-orange-100 text-cyan-50 mt-2">
                    Provide your delivery details to receive your order
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Contact Information */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-950 dark:text-gray-300 mb-4 flex items-center gap-2">
                            <Mail className="w-6 h-6" />
                            Contact Information
                        </h3>
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter your email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='03XXXXXXXXX' type='tel' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Shipping Information */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-950 dark:text-gray-300 mb-4 flex items-center gap-2">
                            <MapPin className="w-6 h-6" />
                            Shipping Address
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addressFields.map(({ name, label, placeholder, type }, i) => (
                                <FormField
                                    key={i}
                                    control={form.control}
                                    name={name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{label}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder={placeholder}
                                                    type={type}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <Button
                        type='submit'
                        size={"lg"}
                    >
                        Complete Shipping Address
                    </Button>
                </form>
            </Form>
        </div>
    ) : null
}

export default ShippingAddressForm