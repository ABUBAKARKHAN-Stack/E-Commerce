import { Layout } from "@/components/layout/shared";
import { SectionHeader } from "@/components/reusable/user";
import { useAuthContext } from "@/context/authContext";
import React from "react";
import TrackOrderForm from "./TrackOrderForm";
import { BlurFade } from "@/components/magicui/blur-fade";

const TrackOrder = () => {
  const { user, userLoading } = useAuthContext();
  return (
    <main className="relative h-full w-full min-w-screen overflow-x-hidden border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout>
        <SectionHeader
          animateOnce
          mainHeading="Track Your Order"
          subText={`Hey ${userLoading ? "..." : user?.username ?? "Guest"}, stay updated with your order status and delivery progress.`}
        />
        <section className="mt-10 w-full">
          <BlurFade
            inView
            direction="down"
            delay={0.25 * 3}
            className="relative z-10"
          >
            <TrackOrderForm />
          </BlurFade>
        </section>
      </Layout>
    </main>
  );
};

export default TrackOrder;
