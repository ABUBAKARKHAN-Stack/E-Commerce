import { Layout } from "@/components/layout/shared";
import { SectionHeader, WaveDivider } from "@/components/reusable/user";
import { SearchFilterSortProduct } from "@/components/sections/user";
import { useProductContext } from "@/context/product.context";
import { ProductCard } from "@/components/reusable/user";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pagination } from "@/components/reusable/shared";
import { ProductCardSkeleton } from "@/components/Skeleton&Loaders/skeleton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PackageX, Loader2, AlertCircle } from "lucide-react";
import ShoppingCartLoader from "@/components/Skeleton&Loaders/loaders/ShoppingCartLoader";
import { Button } from "@/components/ui/button";
import { ProductFilterParams } from "@/types/main.types";
import { useDebounce } from "@/hooks/useDebounce";
import { getQueryParams } from "@/utils/getQueryParams";

const ProductsMain = () => {
  const { useAllProducts } = useProductContext();

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1024px)");
  const isLaptop = useMediaQuery("(min-width: 1024px) and (max-width: 1366px)");
  const isDesktop = useMediaQuery("(min-width: 1366px)");

  const [filterCount, setFilterCount] = useState<number>(0);
  const [searchFiltersSort, setSearchFiltersSort] =
    useState<ProductFilterParams>({
      category: "all",
      maxPrice: "",
      minPrice: "",
      sortBy: "",
      search: "",
    });
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(
    searchFiltersSort.search,
    isInitialized ? 500 : 0,
  );
  const debouncedMinPrice = useDebounce(
    searchFiltersSort.minPrice,
    isInitialized ? 500 : 0,
  );
  const debouncedMaxPrice = useDebounce(
    searchFiltersSort.maxPrice,
    isInitialized ? 500 : 0,
  );

  const getDynamicLimit = useCallback(() => {
    if (isMobile) return 4;
    if (isTablet) return 6;
    if (isLaptop) return 8;
    if (isDesktop) return 10;
    return 6;
  }, [isMobile, isTablet, isDesktop, isLaptop]);
  const [limit, setLimit] = useState(() => getDynamicLimit());

  useEffect(() => {
    const newLimit = getDynamicLimit();
    if (newLimit !== limit) {
      setLimit(newLimit);
      setPage(1);
    }
  }, [getDynamicLimit, limit]);

  const handleFilterRemove = useCallback(() => {
    console.log("calling it");

    localStorage.removeItem("filter/sort");
    setFilterCount(0);
    setSearchFiltersSort({
      category: "all",
      sortBy: "",
      maxPrice: "",
      minPrice: "",
      search: "",
    });
    setPage(1);
  }, []);

  const getActiveFiltersCount = useCallback(() => {
    let count = 0;
    if (debouncedSearch && debouncedSearch.trim()) count++;
    if (searchFiltersSort.category && searchFiltersSort.category !== "all")
      count++;
    if (searchFiltersSort.sortBy) count++;
    if (debouncedMinPrice && debouncedMaxPrice) {
      count++;
    } else if (debouncedMinPrice) {
      count++;
    } else if (debouncedMaxPrice) {
      count++;
    }
    return count;
  }, [
    debouncedSearch,
    searchFiltersSort.category,
    searchFiltersSort.sortBy,
    debouncedMinPrice,
    debouncedMaxPrice,
  ]);

  useEffect(() => {
    const queryParamsLs = localStorage.getItem("filter/sort");
    const parsedQueryParamsLs = queryParamsLs ? JSON.parse(queryParamsLs) : {};

    if (Object.keys(parsedQueryParamsLs).length > 0) {
      setSearchFiltersSort({
        search: parsedQueryParamsLs.search || "",
        category: parsedQueryParamsLs.category || "all",
        sortBy: parsedQueryParamsLs.sortBy || "",
        minPrice: parsedQueryParamsLs.minPrice || "",
        maxPrice: parsedQueryParamsLs.maxPrice || "",
      });
    }

    setPage(1);

    setTimeout(() => setIsInitialized(true), 10);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const count = getActiveFiltersCount();
    setFilterCount(count);

    const filterData = {
      search: debouncedSearch,
      category:
        searchFiltersSort.category === "all" ? "" : searchFiltersSort.category,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice,
      sortBy: searchFiltersSort.sortBy,
    };

    const cleanFilterData = Object.fromEntries(
      Object.entries(filterData).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined,
      ),
    );

    setPage(1);

    localStorage.setItem("filter/sort", JSON.stringify(cleanFilterData));
  }, [
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    searchFiltersSort.category,
    searchFiltersSort.sortBy,
    isInitialized,
    getActiveFiltersCount,
  ]);

  const completeQueryParams = useMemo(() => {
    return {
      ...getQueryParams({
        search: debouncedSearch,
        category: searchFiltersSort.category,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
        sortBy: searchFiltersSort.sortBy,
      }),
      page,
      limit,
    };
  }, [
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    searchFiltersSort.category,
    searchFiltersSort.sortBy,
    page,
    limit,
  ]);

  const { data, isLoading, isError, isFetching, error } =
    useAllProducts(completeQueryParams);

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
          {/* Search & Filter Section */}
          <BlurFade
            inView
            direction="down"
            delay={0.25 * 3}
            className="relative z-10"
          >
            <SearchFilterSortProduct
              productsData={data?.products}
              filterCount={filterCount}
              handleFilterRemove={handleFilterRemove}
              searchFiltersSort={searchFiltersSort}
              setSearchFiltersSort={setSearchFiltersSort}
            />
          </BlurFade>

          <div className="relative mt-6">
            {isLoading ? (
              <BlurFade
                inView
                direction="up"
                delay={0.25}
                className="xxs:grid-cols-2 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </BlurFade>
            ) : (
              <BlurFade
                inView
                direction="right"
                delay={0.25}
                key={page}
                className="xxs:grid-cols-2 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4"
              >
                {data?.products && data.products?.length > 0 ? (
                  data.products.map((p, i) => (
                    <BlurFade key={p._id} inView direction="up" delay={0.1 * i}>
                      <ProductCard forHome={false} product={p} />
                    </BlurFade>
                  ))
                ) : (
                  <div className="text-muted-foreground col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <PackageX className="mb-4 h-16 w-16 opacity-50" />
                    <h1 className="mb-2 text-2xl font-bold">
                      No Products Found
                    </h1>
                    <p className="max-w-sm text-base">
                      We couldn't find any products matching your filters. Try
                      adjusting your search or filter criteria.
                    </p>
                  </div>
                )}
              </BlurFade>
            )}
          </div>

          {!isLoading && !isError && data?.products && (
            <div
              className={`transition-all duration-300 ${
                isFetching ? "pointer-events-none opacity-50" : "opacity-100"
              }`}
            >
              <BlurFade
                inView
                inViewMargin="-100px"
                direction="down"
                className="mt-6 w-full"
              >
                <Pagination
                  page={data?.page || page}
                  setPage={setPage}
                  limit={data?.limit || limit}
                  totalProducts={data?.totalProducts || 0}
                  totalPages={data?.totalPages || 1}
                />
              </BlurFade>
            </div>
          )}
        </section>
      </Layout>
    </main>
  );
};

export default ProductsMain;
