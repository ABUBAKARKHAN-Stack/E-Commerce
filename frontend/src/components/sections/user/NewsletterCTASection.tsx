import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { newsLetterSchema } from "@/schemas/news-letterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewsletterCTASection = () => {
  const form = useForm({
    resolver: zodResolver(newsLetterSchema),
    defaultValues: {
      "news-letter": "",
    },
  });

  const isSm = useMediaQuery("(max-width: 640px)");
  const onSubmit = (data: z.infer<typeof newsLetterSchema>) => {};

  return (
    <div className="relative flex w-full flex-col-reverse justify-between gap-x-10 sm:flex-row">
      {/* Newsletter Block */}
      <BlurFade inView direction="right" delay={0.2} once={false}>
        <div className="py-8">
          <div className="space-y-2">
            <h2 className="xsm:text-xl text-center text-lg font-bold text-gray-950 md:text-2xl xl:text-3xl dark:text-white">
              Join the{" "}
              <span className="font-extrabold text-cyan-500 dark:text-orange-500">
                ShopNex
              </span>{" "}
              Newsletter
            </h2>
            <p className="mb-6 text-center text-xs text-wrap text-gray-900 md:text-sm xl:text-base dark:text-gray-300">
              Be the first to know about new arrivals, exclusive deals, and
              insider tech updates.
            </p>
          </div>
          <div className="mt-2 w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="z-50">
                <div className="relative mx-auto w-full sm:w-[90%] lg:w-3/4">
                  <FormField
                    control={form.control}
                    name="news-letter"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="absolute top-[0.5px] right-[0.5px] h-[43px] rounded-l-none rounded-r-md py-0 sm:px-2 md:px-4 lg:px-8"
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </BlurFade>

      {/* Separator */}
      <BlurFade inView delay={0.3} once={false} direction="up">
        <Separator
          orientation={isSm ? "horizontal" : "vertical"}
          className="absolute top-1/2 left-[50%] h-full -translate-x-1/2 -translate-y-1/2 transform rounded-full border-l-3 border-black opacity-20 dark:border-white"
        />
      </BlurFade>

      {/* CTA Block */}
      <BlurFade
        inView
        direction={isSm ? "right" : "left"}
        delay={0.4}
        once={false}
      >
        <div className="py-8">
          <div className="space-y-2">
            <h2 className="xsm:text-xl text-center text-lg font-bold text-gray-950 md:text-2xl xl:text-3xl dark:text-white">
              Ready to Shop with Us?
            </h2>
            <p className="mb-6 text-center text-xs text-wrap text-gray-900 md:text-sm xl:text-base dark:text-gray-300">
              Discover trending gadgets, top-rated picks, and fresh tech drops
              waiting for you.
            </p>
          </div>
          <div className="mx-auto mt-2 w-full sm:w-[90%] lg:w-3/4">
            <Button
              type="button"
              variant={"default"}
              className="w-full rounded-none py-5 text-lg font-semibold transition-all duration-300 ease-linear hover:scale-105"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </BlurFade>
    </div>
  );
};

export default NewsletterCTASection;
