import { Layout } from "@/components/layout/shared";
import { SectionHeader } from "@/components/reusable/user";
import { FeaturedCategoriesCard } from "@/components/sections/user";
import React from "react";

const FeaturedCategoriesMain = () => {
  return (
    <main className="h-auto w-full border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout>
        <SectionHeader
          mainHeading="Explore Our Top Categories"
          subText="Find the perfect gadget faster — browse by category and explore what fits your needs."
        />

        {/* Featured Categories Cards */}
        <section className="xxs:grid-cols-2 xsm:grid-cols-3 mt-10 grid w-full grid-cols-1 place-items-center gap-y-4 md:grid-cols-4 lg:grid-cols-6">
          <FeaturedCategoriesCard />
        </section>
      </Layout>
    </main>
  );
};

export default FeaturedCategoriesMain;
