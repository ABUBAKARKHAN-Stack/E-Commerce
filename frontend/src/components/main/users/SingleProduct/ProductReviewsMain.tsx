import { Layout } from "@/components/layout/shared";
import { AddReviewForm, SectionHeader } from "@/components/reusable/user";
import { ProductReviewsList } from "@/components/sections/user";
import { FC } from "react";

type Props = {
  productId: string;
};

const ProductReviewsMain: FC<Props> = ({ productId }) => {
  return (
    <main className="relative h-full w-full min-w-screen overflow-x-hidden border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout>
        <section className="mt-10 w-full">
          {/* Section Header */}

          <SectionHeader
            mainHeading="Customer Reviews"
            subText="Read what others are saying about this product."
          />

          {/* Add Review Form */}

          <AddReviewForm productId={productId} />
          {/* Divider */}
          <div className="border-border border-t border-dashed" />

          {/* All Reviews List */}
          <ProductReviewsList reviews={[]} />
        </section>
      </Layout>
    </main>
  );
};

export default ProductReviewsMain;
