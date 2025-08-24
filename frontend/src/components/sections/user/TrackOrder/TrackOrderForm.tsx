import { ButtonLoader } from "@/components/Skeleton&Loaders/loaders";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOrderContext } from "@/context/order.context";
import { trackOrderSchema } from "@/schemas/track-orderSchema";
import { OrderLoadingStates } from "@/types/main.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const TrackOrderForm = () => {
  const { userTrackOrder, orderLoading } = useOrderContext();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof trackOrderSchema>>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      orderId: "",
    },
  });
  const trackOrderLoading = orderLoading === OrderLoadingStates.TRACK_ORDER;

  const onSubmit = async (data: z.infer<typeof trackOrderSchema>) => {
    userTrackOrder(data.orderId, navigate);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadow-10px animate-shadow mx-auto flex w-full max-w-2xl flex-col gap-4.5 rounded-lg p-8 shadow-cyan-500 dark:shadow-orange-500"
      >
        <FormField
          control={form.control}
          name="orderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order ID*</FormLabel>
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
          disabled={trackOrderLoading}
          size="lg"
          type="submit"
          className="w-fit"
        >
          {trackOrderLoading ? (
            <>
              <ButtonLoader loaderText="Tracking Your Order..." />
            </>
          ) : (
            "Track My Order"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default TrackOrderForm;
