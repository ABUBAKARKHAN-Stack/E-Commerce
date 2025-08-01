import React from "react";
import { WhyChooseUs } from "@/components/sections/user";
import { Layout } from "@/components/layout/shared";
import { SectionHeader } from "@/components/reusable/user";

const WhyChooseUsMain = () => {
  return (
    <main className="why-choose-us h-auto w-full border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout>
        <SectionHeader
          mainHeading="Why Choose ShopNex?"
          subText="We go beyond just selling tech — enjoy fast delivery, secure payments, and 24/7 support for a smooth shopping experience."
        />
        <section className="relative mx-auto mt-10 grid w-full grid-cols-1 gap-x-0 gap-y-5 md:grid-cols-3 md:gap-x-8 md:gap-y-0 xl:gap-x-16">
          <WhyChooseUs />
        </section>
      </Layout>
    </main>
  );
};

export default WhyChooseUsMain;
