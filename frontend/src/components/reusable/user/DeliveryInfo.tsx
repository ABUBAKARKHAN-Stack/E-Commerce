import { Separator } from "@/components/ui/separator";
import useFormattedDateTime from "@/hooks/useFormattedDateTime";
import { FC } from "react";

type Props = {
  formattedDate: Date;
  etaDate: Date;
  className?: string;
};

const DeliveryInfo: FC<Props> = ({ formattedDate, etaDate, className }) => {
  const { formatDate, formatTime } = useFormattedDateTime();
  return (
    <div
      className={`p-4 ${className} border border-cyan-100 bg-cyan-50 dark:border-orange-500/20 dark:bg-orange-500/10`}
    >
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-900 dark:text-gray-300">
            Order Confirmed At:
          </span>
          <span className="font-medium text-cyan-700 dark:text-orange-300">
            {formatDate(formattedDate)} - {formatTime(formattedDate)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-900 dark:text-gray-300">
            Estimated Delivery:
          </span>
          <span className="font-semibold text-cyan-700 dark:text-orange-300">
            {formatDate(etaDate)} - {formatTime(formattedDate)}
          </span>
        </div>
        <Separator className="border-muted-foreground border" />
        <p className="text-muted-foreground text-center text-xs font-light text-wrap">
          Your order will be delivered within a maximum of 48 hours. If you do
          not receive it within this timeframe, please reach out to us at{" "}
          <span
            onClick={() =>
              window.open(
                "https://mail.google.com/mail/u/0/?fs=1&to=official.shopnex@gmail.com.com&tf=cm",
              )
            }
            className="cursor-pointer font-bold text-cyan-500 dark:text-orange-500"
          >
            official.shopnex@gmail.com
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default DeliveryInfo;
