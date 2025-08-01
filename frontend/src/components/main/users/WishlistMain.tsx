import { Layout } from "@/components/layout/shared";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  ProductCard,
  SectionHeader,
  WaveDivider,
} from "@/components/reusable/user";
import { EmptyWishlist } from "@/components/sections/user/wishlist";
import { IProduct } from "@/types/main.types";
import { useLoaderData } from "react-router-dom";

const WishlistMain = () => {
  const { wishlistedProducts }: { wishlistedProducts: IProduct[] } =
    useLoaderData();

  if (!wishlistedProducts) {
    return <EmptyWishlist />;
  }
  return (
    <main className="relative h-full w-full min-w-screen overflow-x-hidden border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout>
        <BlurFade delay={0.1} duration={1} className="relative w-full">
          <SectionHeader
            animateOnce
            mainHeading="Your Wishlist"
            subText="Here are your favorite items. Easily keep track of products you love and add them to your cart whenever you're ready."
          />

          <WaveDivider position="bottom" svgClass="h-2" className="-z-10" />
        </BlurFade>
        <section className="mt-10 w-full">
          <BlurFade
            inView
            direction="right"
            delay={0.75}
            className="xxs:grid-cols-2 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4"
          >
            {wishlistedProducts?.map((p, i) => (
              <BlurFade key={p._id} inView direction="up" delay={0.1 * i}>
                <ProductCard
                  forHome={false}
                  product={p}
                  usingLoaderData={true}
                />
              </BlurFade>
            ))}
          </BlurFade>
        </section>
      </Layout>
    </main>
  );
};

export default WishlistMain;
