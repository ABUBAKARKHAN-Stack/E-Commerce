import { Layout } from "@/components/layout/shared";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeader } from "@/components/reusable/user";
import { ContactForm } from "@/components/sections/user/contact";

const ContactMain = () => {
  return (
    <main className="relative h-full w-full min-w-screen overflow-x-hidden border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout>
        <SectionHeader
          mainHeading="Get in Touch"
          subText="We’d love to hear from you! Whether you have a question about products, orders, or anything else, our team is here to help."
        />
        <section className="mt-10 w-full">
          <BlurFade
            inView
            direction="down"
            once={false}
            delay={0.25 * 3}
            className="relative z-10"
          >
            <ContactForm />
          </BlurFade>
        </section>
      </Layout>
    </main>
  );
};

export default ContactMain;
