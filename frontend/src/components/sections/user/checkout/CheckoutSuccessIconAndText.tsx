import { OrderIdBadge } from "@/components/reusable/user";
import { CheckCircle } from "lucide-react";
import { FC, Ref } from "react";

type Props = {
  checkIconRef: Ref<HTMLDivElement>;
  orderId: string;
};
const CheckoutSuccessIconAndText: FC<Props> = ({ checkIconRef, orderId }) => {
  return (
    <div className="text-center">
      <div
        ref={checkIconRef}
        className="relative inline-flex items-center justify-center"
      >
        <div className="animate-spin-slow absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/10 shadow-[0px_6px_4px_-1px] shadow-cyan-500/40 dark:shadow-orange-400/40"></div>
        <div className="z-10 flex size-28 items-center justify-center rounded-full border border-cyan-200/40 bg-cyan-500 dark:border-orange-400/50 dark:bg-orange-500">
          <CheckCircle className="size-20 text-cyan-100 drop-shadow-md dark:text-orange-200" />
        </div>
      </div>

      {/*  Order Confirmed Title */}
      <h1 className="success-title mt-8 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
        Order Confirmed!
      </h1>

      {/*  Subtitle */}
      <p className="success-subtitle mt-4 text-lg text-gray-900 dark:text-gray-300">
        Thank you for your purchase. Your order has been successfully placed.
        <br />
        <span className="text-muted-foreground inline-block text-sm font-medium">
          A confirmation email with your order details has been sent to your
          inbox.
        </span>
      </p>

      {/*  Order ID badge */}
      <OrderIdBadge orderId={orderId} />
    </div>
  );
};

export default CheckoutSuccessIconAndText;
