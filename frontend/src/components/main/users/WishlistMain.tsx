import { Layout } from "@/components/layout/shared";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  ProductCard,
  SectionHeader,
  WaveDivider,
} from "@/components/reusable/user";
import { ProductCardSkeleton } from "@/components/Skeleton&Loaders/skeleton";
import { EmptyWishlist } from "@/components/sections/user/wishlist";
import { useProductContext } from "@/context/product.context";
import { QueryKeys } from "@/types/main.types";
import { useEffect, useState } from "react";
import { useWishlistContext } from "@/context/wishlist.context";

const WishlistMain = () => {
  const { setWishlist, useWishlist } = useWishlistContext();
  const { useBulkProducts } = useProductContext();

  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

  const {
    data: productIds,
    isSuccess: isIdsLoaded,
    isLoading: isLoadingIds,
  } = useWishlist();

  useEffect(() => {
    if (isIdsLoaded && productIds) {
      setWishlist(productIds);
    }
  }, [productIds, isIdsLoaded, setWishlist]);

  const {
    data: wishlistedProducts,
    isLoading: isLoadingProducts,
    isSuccess: isProductsLoaded,
  } = useBulkProducts({
    contextKey: QueryKeys.WISHLIST_PRODUCTS,
    productIds: productIds || [],
    isIdsLoaded: isIdsLoaded && !!productIds && productIds.length > 0,
  });

  useEffect(() => {
    if (isProductsLoaded && wishlistedProducts && !hasInitiallyLoaded) {
      setHasInitiallyLoaded(true);
    }
  }, [isProductsLoaded, wishlistedProducts, hasInitiallyLoaded]);

  useEffect(() => {
    setWishlist(productIds || []);
  }, [productIds, isIdsLoaded, setWishlist]);

  //* Show Empty Wishlisted Products If (use wishlist) loaded successfull and No Product IDS are received
  if (isIdsLoaded && (!productIds || productIds.length === 0)) {
    return <EmptyWishlist />;
  }

  //* Show empty wishlist if products are loaded but empty
  if (
    isProductsLoaded &&
    (!wishlistedProducts || wishlistedProducts.length === 0)
  ) {
    return <EmptyWishlist />;
  }

  const showSkeleton =
    !hasInitiallyLoaded &&
    (isLoadingIds ||
      (isIdsLoaded && productIds!.length > 0 && isLoadingProducts));

  const showWishlistedProducts =
    wishlistedProducts && wishlistedProducts?.length > 0;

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
            {showSkeleton &&
              [1, 2, 3, 4].map((_, i) => <ProductCardSkeleton key={i} />)}
            {showWishlistedProducts &&
              wishlistedProducts?.map((p, i) => (
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
