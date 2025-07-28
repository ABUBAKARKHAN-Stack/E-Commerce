import { Button } from '@/components/ui/button'
import { IShippingAddress, PaymentMethod } from '@/types/main.types'
import { CreditCard, LoaderPinwheel } from 'lucide-react'
import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';
import { useProductContext } from '@/context/productContext'
import { errorToast, successToast } from '@/utils/toastNotifications'
import { useThemeContext } from '@/context/themeContext'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '@/utils/ApiError'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { z } from 'zod';
import { shippingAddressSchema } from '@/schemas/checkoutSchema';

type Props = {
    totalAmount: number;
    shippingAddressCompleted: boolean;
    shippingAddress: z.infer<typeof shippingAddressSchema>;
    activeTab: string;
    shippingMethod: string
}

const CheckoutForm: FC<Props> = ({
    totalAmount,
    shippingAddressCompleted,
    shippingAddress,
    activeTab,
    shippingMethod
}) => {

    const [paymentLoading, setPaymentLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { theme } = useThemeContext();
    const { completeCheckout, setCartProductsCount } = useProductContext();
    const navigate = useNavigate();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string>("")






    const handleSubmitViaCard = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            errorToast("Stripe is not ready yet. Please wait...");
            return;
        }

        if (!shippingAddressCompleted) {
            errorToast("Please complete shipping details first.");
            return;
        }
        const card = elements.getElement(CardElement);
        setPaymentLoading(true)
        try {
            const { clientSecret, orderId } = await completeCheckout({
                paymentMethod,
                shippingAddress: shippingAddress as IShippingAddress,
                totalAmountInUSD: totalAmount,
                shippingMethod
            });

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

    const handleCod = async () => {
        const { orderId } = await completeCheckout({
            paymentMethod,
            shippingAddress: shippingAddress as IShippingAddress,
            totalAmountInUSD: totalAmount,
            shippingMethod
        })
        successToast("Order Placed Successfully");
        setCartProductsCount(0);
        timeoutRef.current = setTimeout(() => {
            navigate(`/checkout/success?orderId=${orderId}`)
        }, 1000);
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


    return activeTab === "payment" ? <div className="w-full">
        <div className="rounded-2xl bg-background overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r rounded-t-2xl from-cyan-500 to-cyan-600 dark:from-orange-500 dark:to-orange-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <CreditCard className="w-6 h-6" />
                    Select Payment Method
                </h2>
                <p className="dark:text-orange-100 text-cyan-50 mt-2">
                    Choose your preferred payment option to complete the order
                </p>
            </div>

            {/* Payment Method Radio Buttons */}
            <RadioGroup
                onValueChange={(value) => setPaymentMethod(value)}
                className="p-6 space-y-4"
                defaultValue={paymentMethod}
            >
                <div className="flex items-center gap-x-3">
                    <RadioGroupItem
                        id="cod"
                        value={PaymentMethod.COD}
                        className="size-5"
                    />
                    <Label htmlFor="cod" className="text-base">
                        Cash On Delivery (COD)
                    </Label>
                </div>

                <div className="flex items-center gap-x-3">
                    <RadioGroupItem
                        id="stripe"
                        value={PaymentMethod.STRIPE}
                        className="size-5"
                    />
                    <Label htmlFor="stripe" className="text-base">
                        Card Payment (Stripe)
                    </Label>
                </div>
            </RadioGroup>

            <Separator />

            {/* Stripe Payment Info */}
            {paymentMethod === PaymentMethod.STRIPE ? (
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-950 dark:text-gray-300 mb-4 flex items-center gap-2">
                        <CreditCard className="size-6" />
                        Payment Information
                    </h3>

                    <form onSubmit={handleSubmitViaCard} className="space-y-6">
                        <div className="rounded-md border border-[#3C3C43] bg-background px-4 py-3">
                            <CardElement options={CARD_ELEMENT_OPTIONS} />
                        </div>

                        <Button
                            size="lg"
                            type="submit"
                            disabled={paymentLoading || !stripe}
                            className="w-full flex justify-center items-center gap-2"
                        >
                            {paymentLoading ? (
                                <>
                                    <span>Processing Payment</span>
                                    <LoaderPinwheel className="animate-spin size-5" />
                                </>
                            ) : (
                                'Complete Order'
                            )}
                        </Button>
                    </form>
                </div>
            )
                : paymentMethod === PaymentMethod.COD ? <div className='p-6'>
                    <Button
                        onClick={handleCod}
                        size={"lg"}
                    >
                        Complete Order Via Payment Method COD
                    </Button>
                </div>
                    : null
            }
        </div>
    </div>
        : null

}

export default CheckoutForm