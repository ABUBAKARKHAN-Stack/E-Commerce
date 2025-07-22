import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addressFields } from '@/constants/formFields'
import { useAuthContext } from '@/context/authContext'
import { addressSchema } from '@/schemas/checkoutSchema'
import { IUser } from '@/types/main.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard, LoaderPinwheel, Mail, MapPin, ShoppingBag } from 'lucide-react'
import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';
import { useProductContext } from '@/context/productContext'
import { errorToast, successToast } from '@/utils/toastNotifications'
import { useThemeContext } from '@/context/themeContext'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '@/utils/ApiError'

type Props = {
    totalAmount: number;
}

const CheckoutForm: FC<Props> = ({
    totalAmount,
}) => {
    let { user } = useAuthContext();
    const form = useForm<z.infer<typeof addressSchema>>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            country: "",
            email: "",
            fullName: "",
            state: "",
            phone: "",
            zipCode: "",
        }
    });
    const [activeTab, setActiveTab] = useState('shipping');
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [shippingCompleted, setShippingCompleted] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { theme } = useThemeContext();
    const { completeCheckout, setCartProductsCount } = useProductContext();
    const navigate = useNavigate();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        if (!user) return;
        const currentUser = user as IUser;
        form.setValue("fullName", currentUser.username);
        form.setValue("email", currentUser.email);
        form.setValue("phone", currentUser.phone as string);
        form.setValue("addressLine1", currentUser?.address || "")
    }, [user])



    const onSubmit = (data: z.infer<typeof addressSchema>) => {
        console.log(data);
        setShippingCompleted(true)
        setActiveTab('payment')
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            errorToast("Stripe is not ready yet. Please wait...");
            return;
        }

        if (!shippingCompleted) {
            errorToast("Please complete shipping details first.");
            return;
        }
        const card = elements.getElement(CardElement);
        setPaymentLoading(true)
        try {
            const { clientSecret, orderId } = await completeCheckout(totalAmount);

            const { paymentIntent, error, } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card!
                },
            })
            if (error) {
                errorToast(error.message || "Something went wrong")
            } else if (paymentIntent.status === 'succeeded') {
                successToast("Payment Successful!");
                setCartProductsCount(0);
                timeoutRef.current = setTimeout(() => {
                    navigate(`/checkout/success?orderId=${orderId}`)
                }, 1000);
            }
        } catch (error) {
            const err = error as Error;
            throw new ApiError(500, err.message);
        } finally {
            setPaymentLoading(false)
        }
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [])


    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
                fontSize: '16px',
                '::placeholder': {
                    color: theme === 'dark' ? '#a0a0a0' : '#999999',
                },
            },
            invalid: {
                color: 'red',
            },
        },
        hidePostalCode: true,
    };




    return (
        <div className="xl:w-[calc(100%+125px)] w-full">
            <div className="rounded-2xl shadow-xl shadow-black overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 p-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <ShoppingBag className="w-6 h-6" />
                        Checkout
                    </h2>
                    <p className="dark:text-orange-100 text-cyan-50 mt-2">Complete your purchase securely</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab('shipping')}
                        className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${activeTab === 'shipping'
                            ? 'dark:text-orange-600 text-cyan-600 border-b-2 border-cyan-500 dark:border-orange-500 dark:bg-orange-50 bg-cyan-50'
                            : ' dark:hover:text-orange-500 hover:text-cyan-500 dark:hover:bg-orange-50 hover:bg-cyan-50 hover:cursor-pointer '
                            }`}
                    >
                        <MapPin className="w-5 h-5 inline mr-2" />
                        Shipping
                    </button>
                    <button
                        onClick={() => setActiveTab('payment')}
                        className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${activeTab === 'payment'
                            ? 'dark:text-orange-600 text-cyan-600 border-b-2 border-cyan-500 dark:border-orange-500 dark:bg-orange-50 bg-cyan-50'
                            : ' dark:hover:text-orange-500 dark:hover:bg-orange-50 hover:bg-cyan-50 hover:text-cyan-500 hover:cursor-pointer'
                            }`}
                    >
                        <CreditCard className="w-5 h-5 inline mr-2" />
                        Payment
                    </button>
                </div>

                {/* Form Section */}
                {activeTab === 'shipping' && (
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
                                            <FormItem >
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

                            {/* Continue Button */}
                            <div className="pt-4">
                                <Button
                                    size={'lg'}
                                    type="submit"
                                    className='w-full'
                                >
                                    Continue to Payment
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}

                {activeTab === 'payment' && (
                    <div className="p-6 space-y-6">
                        {/* Payment Section */}

                        <h3 className="text-xl font-semibold text-gray-950 dark:text-gray-300 mb-4 flex items-center gap-2">
                            <CreditCard className="size-6" />
                            Payment Information
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="rounded-md border border-[#3C3C43] bg-background px-4 py-3">
                                <CardElement options={CARD_ELEMENT_OPTIONS} />
                            </div>

                            <Button
                                size={'lg'}
                                type="submit"
                                disabled={paymentLoading || !stripe}
                                className='w-full'

                            >
                                {
                                    paymentLoading ? <>
                                        <span>Processing Payment</span>
                                        <LoaderPinwheel className='animate-spin' />
                                    </> : "Complete Order"
                                }
                            </Button>
                        </form>

                    </div>
                )

                }
            </div>
        </div>

    )
}

export default CheckoutForm