import { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdminOrderLoading, OrderStatus } from "@/types/main.types";
import { Loader2, X } from "lucide-react";
import { useAdminOrderContext } from "@/context/adminOrder.context";
import { z } from "zod";
import { adminCancelOrderSchema } from "@/schemas/admin-cancel-orderSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRevalidator } from "react-router-dom";

type Props = {
  orderStatus: string;
  orderId: string;
};

const CancelOrderButtonWithDialog: FC<Props> = ({ orderStatus, orderId }) => {
  const { adminCancelOrder, loading } = useAdminOrderContext();

  const form = useForm({
    resolver: zodResolver(adminCancelOrderSchema),
    defaultValues: { cancellationReason: "" },
  });

  const { revalidate } = useRevalidator();

  const cancelLoading = loading === AdminOrderLoading.CANCEL_ORDER;

  const onSubmit = (data: z.infer<typeof adminCancelOrderSchema>) => {
    if (!orderId) return;
    adminCancelOrder(
      {
        orderId,
        cancellationReason: data.cancellationReason,
      },
      revalidate,
    );
  };

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
          className="flex w-full items-center justify-center"
        >
          {cancelLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <X className="mr-2 h-4 w-4" />
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
              <DialogTitle className="text-xl leading-tight font-semibold">
                Cancel Order #{orderId}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
                Please provide a clear and professional reason for canceling
                this order. Your message will be sent directly to the customer
                to explain the cancellation.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="cancellationReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="xxs:text-sm text-xs font-medium">
                    Cancellation Message to Customer
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., We apologize, but we're unable to process your order due to product unavailability. Your payment will be fully refunded within 3-5 business days."
                      className="xxs:placeholder:text-xs min-h-[100px] resize-none text-sm leading-relaxed placeholder:text-[10px] placeholder:leading-relaxed"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-3 border-t pt-4">
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
                className="flex-1 font-medium sm:flex-none"
              >
                {cancelLoading ? (
                  <>
                    Sending
                    <Loader2 className="animate-spin-faster" />
                  </>
                ) : (
                  "Send Message & Cancel Order"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderButtonWithDialog;
