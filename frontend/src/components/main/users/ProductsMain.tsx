import { Layout } from "@/components/layout/shared";
import { SectionHeader, WaveDivider } from "@/components/reusable/user";
import { SearchFilterSortProduct } from "@/components/sections/user";
import { useProductContext } from "@/context/productContext";
import { ProductCard } from "@/components/reusable/user";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/reusable/shared";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const ProductsMain = () => {
  const { productsData, totalProducts } = useProductContext();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1024px)");
  const isLaptop = useMediaQuery("(min-width: 1024px) and (max-width: 1366px)");
  const isDesktop = useMediaQuery("(min-width: 1366px)");
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

  const getDynamicLimit = () => {
    if (isMobile) return 4;
    if (isTablet) return 6;
    if (isLaptop) return 8;
    if (isDesktop) return 10;
    return 6;
  };
  useEffect(() => {
    const newLimit = getDynamicLimit();
    if (newLimit !== limit) {
      setLimit(Number(newLimit));
    }
  }, [isDesktop, isLaptop, isMobile, isTablet]);

  if (productsData === null) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center border-b-2 text-7xl font-bold">
        Products Not Found
      </div>
    );
  }

  return (
    <main className="relative h-full w-full min-w-screen overflow-x-hidden border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout>
        <BlurFade delay={0.1} duration={1} className="relative w-full">
          <SectionHeader
            animateOnce
            mainHeading="Our Products"
            subText="Explore our wide range of products crafted to meet your needs. Use the filters below to find exactly what you're looking for."
          />
          <WaveDivider position="bottom" svgClass="h-2" className="-z-10" />
        </BlurFade>
        <section className="mt-10 w-full">
          <BlurFade
            inView
            direction="down"
            delay={0.25 * 3}
            className="relative z-10"
          >
            <SearchFilterSortProduct
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
            />
          </BlurFade>

          <BlurFade
            inView
            direction="right"
            delay={page <= 1 ? 0.25 * 4 : 0.25}
            key={page}
            className="xxs:grid-cols-2 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4"
          >
            {productsData?.map((p, i) => (
              <BlurFade key={p._id} inView direction="up" delay={0.1 * i}>
                <ProductCard forHome={false} product={p} />
              </BlurFade>
            ))}
          </BlurFade>
          <BlurFade
            inView
            inViewMargin="-100px"
            direction="down"
            className="mt-6 w-full"
          >
            <Pagination
              limit={limit}
              page={page}
              setPage={setPage}
              totalProducts={totalProducts}
            />
          </BlurFade>
        </section>
      </Layout>
    </main>
  );
};

export default ProductsMain;
