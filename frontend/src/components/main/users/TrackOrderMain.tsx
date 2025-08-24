import { Layout } from "@/components/layout/shared";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeader } from "@/components/reusable/user";
import {
  TrackOrder,
  TrackOrderReceipt,
} from "@/components/sections/user/TrackOrder";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth.context";
import { ArrowLeft, ArrowLeftCircle } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router-dom";

const TrackOrderMain = () => {
  const { user } = useAuthContext();
  const orderData = useLoaderData();
  const navigate = useNavigate();

  if (!orderData) return <TrackOrder />;

  return (
    <main className="h-full w-full min-w-screen overflow-x-hidden border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout className="relative">
        <BlurFade className="absolute z-50" direction="right">
          <Button
            onClick={() => navigate(-1)}
            className="hidden size-10 rounded-full transition-all duration-300 hover:-translate-x-2 hover:scale-95 md:flex"
          >
            <ArrowLeft className="size-7 text-cyan-100 dark:text-orange-200" />
          </Button>
        </BlurFade>
        <SectionHeader
          animateOnce
          mainHeading="Here's Your Order"
          subText={`Hey ${user?.username}, here are the latest updates for your order. Track every step of your delivery journey.`}
        />

        <section className="mt-10 w-full space-y-8">
          <BlurFade
            inView
            direction="down"
            delay={0.25 * 3}
            className="relative z-10"
          >
            <TrackOrderReceipt order={orderData} />
          </BlurFade>
          <Button
            onClick={() => navigate(-1)}
            className="flex w-full md:hidden"
          >
            <ArrowLeftCircle /> Go Back
          </Button>
        </section>
      </Layout>
    </main>
  );
};

export default TrackOrderMain;
