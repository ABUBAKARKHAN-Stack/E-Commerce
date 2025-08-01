import { Layout } from "@/components/layout/shared";
import { SectionHeader } from "@/components/reusable/user";
import { NewsletterCTASection } from "@/components/sections/user";

const NewsletterCTASectionMain = () => {
  return (
    <main className="h-auto w-full border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout>
        <SectionHeader
          mainHeading="Stay Ahead & Save Big"
          subText="Subscribe for exclusive deals or jump right in and explore our latest tech drops."
        />
        <section className="mt-10">
          <NewsletterCTASection />
        </section>
      </Layout>
    </main>
  );
};

export default NewsletterCTASectionMain;
