import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useOrderContext } from '@/context/orderContext'
import { trackOrderSchema } from '@/schemas/track-orderSchema'
import { OrderLoading } from '@/types/main.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, LoaderPinwheel } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const TrackOrderForm = () => {
    const { getConfirmedOrderDetails, loading } = useOrderContext()
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof trackOrderSchema>>({
        resolver: zodResolver(trackOrderSchema),
        defaultValues: {
            orderId: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof trackOrderSchema>) => {
        getConfirmedOrderDetails(data.orderId, navigate)
        // console.log(res);

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full shadow-10px rounded-lg dark:shadow-orange-500 animate-shadow shadow-cyan-500 p-8  flex-col max-w-2xl mx-auto gap-4.5">
                <FormField
                    control={form.control}
                    name="orderId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Order ID* 
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter your 8-character Order ID (e.g., ABCD1234)"
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={loading === OrderLoading.TRACK_ORDER_LOADING}
                    size="lg" type="submit" className="w-fit">
                    {
                        loading === OrderLoading.TRACK_ORDER_LOADING ? <>
                            <span>Tracking Your Order</span>
                            <LoaderPinwheel className='animate-spin' />
                        </> : "Track My Order"
                    }
                </Button>
            </form>
        </Form>

    )
}

export default TrackOrderForm