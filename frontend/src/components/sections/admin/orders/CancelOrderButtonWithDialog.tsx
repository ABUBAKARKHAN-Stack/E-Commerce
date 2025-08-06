import { FC } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AdminOrderLoading, OrderStatus } from '@/types/main.types';
import { Loader2, X } from 'lucide-react';
import { useAdminOrderContext } from '@/context/adminOrderContext';
import { z } from 'zod';
import { adminCancelOrderSchema } from '@/schemas/admin-cancel-orderSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRevalidator } from 'react-router-dom';

type Props = {
    orderStatus: string;
    orderId: string;
}

const CancelOrderButtonWithDialog: FC<Props> = ({
    orderStatus,
    orderId
}) => {
    const {
        adminCancelOrder,
        loading
    } = useAdminOrderContext();

    const form = useForm({
        resolver: zodResolver(adminCancelOrderSchema),
        defaultValues: { cancellationReason: "" }
    })

    const {
        revalidate
    } = useRevalidator()


    const cancelLoading = loading === AdminOrderLoading.CANCEL_ORDER;

    const onSubmit = (data: z.infer<typeof adminCancelOrderSchema>) => {
        if (!orderId) return;
        adminCancelOrder({
            orderId,
            cancellationReason: data.cancellationReason
        }, revalidate)
    }

    return (
        <Dialog>

            {/* Cancel Order Dialog Trigger */}
            <DialogTrigger asChild>
                <Button
                    disabled={
                        cancelLoading ||
                        orderStatus === OrderStatus.SHIPPED ||
                        orderStatus === OrderStatus.DELIVERED ||
                        orderStatus === OrderStatus.CANCELLED ||
                        orderStatus === OrderStatus.PROCESSING
                    }
                    size="lg"
                    variant="destructive"
                    className="w-full flex items-center justify-center"
                >
                    {cancelLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <X className="w-4 h-4 mr-2" />
                    )}
                    Cancel Order
                </Button>
            </DialogTrigger>

            {/* Dialog Content */}
            <DialogContent className="sm:max-w-lg">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 pt-2"
                    >
                        <DialogHeader className="space-y-3">
                            <DialogTitle className="text-xl font-semibold  leading-tight">
                                Cancel Order #{orderId}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                                Please provide a clear and professional reason for canceling this order.
                                Your message will be sent directly to the customer to explain the cancellation.
                            </DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name="cancellationReason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs xxs:text-sm font-medium">
                                        Cancellation Message to Customer
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g., We apologize, but we're unable to process your order due to product unavailability. Your payment will be fully refunded within 3-5 business days."
                                            className="min-h-[100px] xxs:placeholder:text-xs placeholder:text-[10px] placeholder:leading-relaxed text-sm leading-relaxed resize-none"
                                            {...field}
                                            rows={4}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="gap-3 pt-4 border-t">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 sm:flex-none"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={cancelLoading}
                                variant="destructive"
                                className="flex-1 sm:flex-none font-medium"
                            >
                                {
                                    cancelLoading ? <>
                                        Sending
                                        <Loader2 className='animate-spin-faster' />
                                    </> : "Send Message & Cancel Order"
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CancelOrderButtonWithDialog