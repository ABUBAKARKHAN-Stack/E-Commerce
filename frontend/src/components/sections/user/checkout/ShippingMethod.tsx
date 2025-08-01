import {
  CheckoutTabsType,
  ShippingMethod as ShippingMethodEnum,
} from "@/types/main.types";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { shippingMethodSchema } from "@/schemas/checkoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck } from "lucide-react";
import { handleScrollToSection } from "@/utils/HandleScrollToSection";

type Props = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<CheckoutTabsType>>;
  setShippingMethod: Dispatch<SetStateAction<string>>;
  totalAmount: number;
};

const ShippingMethod: FC<Props> = ({
  activeTab,
  setActiveTab,
  setShippingMethod,
  totalAmount,
}) => {
  const form = useForm<z.infer<typeof shippingMethodSchema>>({
    resolver: zodResolver(shippingMethodSchema),
    defaultValues: {
      shippingMethod: ShippingMethodEnum.STANDARD,
    },
  });

  const onSubmit = (data: z.infer<typeof shippingMethodSchema>) => {
    setShippingMethod(data.shippingMethod);
    handleScrollToSection("checkout-summary-section");
    setActiveTab("checkout-summary");
  };

  useEffect(() => {
    if (totalAmount >= 1000) {
      form.setValue("shippingMethod", ShippingMethodEnum.FREE);
    }
  }, [totalAmount]);
  return activeTab === "shipping-method" ? (
    <div className="bg-background rounded-2xl">
      <div className="rounded-t-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 dark:from-orange-500 dark:to-orange-600">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
          <Truck className="h-6 w-6" />
          Choose Shipping Method
        </h2>
        <p className="mt-2 text-cyan-50 dark:text-orange-100">
          Select a delivery option that suits your needs
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
          <div className="w-fit">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-950 dark:text-gray-300">
              <Truck className="h-6 w-6" />
              Select One Delivery Option
            </h3>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="shippingMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {totalAmount >= 1000 ? (
                          <FormItem className="flex items-center justify-between">
                            <div className="flex items-center gap-x-2">
                              <FormControl>
                                <RadioGroupItem
                                  value={ShippingMethodEnum.FREE}
                                  className="size-4.5"
                                />
                              </FormControl>
                              <FormLabel className="text-base font-semibold">
                                FREE
                              </FormLabel>
                            </div>
                            <span className="block text-xl font-semibold">
                              0$
                            </span>
                          </FormItem>
                        ) : (
                          <>
                            <FormItem className="flex items-center justify-between">
                              <div className="flex items-center gap-x-2">
                                <FormControl>
                                  <RadioGroupItem
                                    value={ShippingMethodEnum.STANDARD}
                                    className="size-4.5"
                                  />
                                </FormControl>
                                <FormLabel className="text-base font-semibold">
                                  Standard
                                </FormLabel>
                              </div>
                              <span className="block text-xl font-semibold">
                                6.99$
                              </span>
                            </FormItem>
                            <FormItem className="flex items-center justify-between">
                              <div className="flex items-center gap-x-2">
                                <FormControl>
                                  <RadioGroupItem
                                    value={ShippingMethodEnum.EXPRESS}
                                    className="size-4.5"
                                  />
                                </FormControl>
                                <FormLabel className="text-base font-semibold">
                                  Express
                                </FormLabel>
                              </div>
                              <span className="block text-xl font-semibold">
                                9.99$
                              </span>
                            </FormItem>
                          </>
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" size={"lg"}>
            Confirm Shipping
          </Button>
        </form>
      </Form>
    </div>
  ) : null;
};

export default ShippingMethod;
