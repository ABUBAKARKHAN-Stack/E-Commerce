import { Layout } from "@/components/layout/shared";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeader } from "@/components/reusable/user";
import {
  CartCards,
  CartSummary,
  EmptyCart,
} from "@/components/sections/user/cart";
import { CartMainSkeleton } from "@/components/Skeleton&Loaders/skeleton";
import { useCartContext } from "@/context/cart.context";
import { useProductContext } from "@/context/product.context";
import { QueryKeys } from "@/types/main.types";

const CartMain = () => {
  const { useBulkProducts } = useProductContext();
  const { useCartDetails } = useCartContext();

  const {
    data: cartDetails,
    isLoading: cartedProductsLoading,
    isSuccess: cartedProductsLoaded,
  } = useCartDetails();
  const totalAmount = cartDetails ? cartDetails.totalAmount : 0;
  const cartedProducts = cartDetails ? cartDetails.products : [];

  const quantityMap = new Map(
    cartedProducts.map(({ productId, quantity }) => [productId, quantity]),
  );

  const {
    data: originalProducts,
    isLoading: isProductsLoading,
    isSuccess: isProductsLoaded,
  } = useBulkProducts({
    contextKey: QueryKeys.CARTED_PRODUCTS,
    productIds: cartedProducts.map(({ productId }) => productId) ?? [],
    isIdsLoaded: !cartedProductsLoading && cartedProducts.length > 0,
  });

  const productsFromCart = originalProducts
    ? originalProducts?.map((p) => ({
        ...p,
        cartedProductQuantity: quantityMap.get(p._id) || 0,
      }))
    : [];

  const showCartSkeleton =
    cartedProductsLoading ||
    (cartedProductsLoaded && cartedProducts.length > 0 && isProductsLoading);
  const showCartedProducts = productsFromCart && productsFromCart.length > 0;

  if (
    cartedProductsLoaded &&
    (!cartDetails ||
      !cartDetails.totalAmount ||
      !cartDetails.products ||
      cartDetails.products.length === 0)
  ) {
    return <EmptyCart />;
  }

  if (
    isProductsLoaded &&
    (!productsFromCart || productsFromCart.length === 0)
  ) {
    return <EmptyCart />;
  }

  return (
    <main className="relative h-full w-full min-w-screen overflow-x-hidden border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout>
        <SectionHeader
          animateOnce
          mainHeading="Your Cart"
          subText="Review your selected items and proceed to checkout."
        />
        {showCartSkeleton && <CartMainSkeleton />}
        {showCartedProducts && (
          <>
            <section className="mt-10 w-full">
              <BlurFade
                inView
                direction="down"
                delay={0.25 * 3}
                className="relative z-10"
              >
                <CartCards products={productsFromCart} />
              </BlurFade>
            </section>
            <section className="mt-8 w-full">
              <BlurFade
                inView
                direction="down"
                delay={0.25 * 4}
                className="relative z-10"
              >
                <CartSummary
                  totalAmount={totalAmount}
                  totalProducts={productsFromCart.length}
                  products={productsFromCart}
                />
              </BlurFade>
            </section>
          </>
        )}
      </Layout>
    </main>
  );
};

export default CartMain;
