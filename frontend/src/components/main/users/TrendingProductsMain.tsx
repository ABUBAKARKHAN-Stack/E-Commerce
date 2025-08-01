import { Layout } from "@/components/layout/shared";
import { SectionHeader } from "@/components/reusable/user";
import { TrendingProductsCard } from "@/components/sections/user";

const TrendingProductsMain = () => {
  return (
    <main className="h-auto w-full min-w-screen border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout>
        <SectionHeader
          mainHeading="Trending Products"
          subText="Browse our most popular picks — handpicked for quality, performance, and unbeatable value."
        />

        {/* Trending Products Cards */}
        <section className="mt-10 flex w-full flex-row flex-nowrap items-center gap-2 overflow-x-auto lg:grid lg:grid-cols-5 lg:place-items-center">
          <TrendingProductsCard />
        </section>
      </Layout>
    </main>
  );
};

export default TrendingProductsMain;
