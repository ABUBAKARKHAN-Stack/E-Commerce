import { Layout } from "@/components/layout/shared";
import { SectionHeaderSkeleton } from "@/components/Skeleton&Loaders/skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const ProductMainSkeleton = () => {
  return (
    <main className="bg-background relative h-full w-full min-w-screen overflow-x-hidden border-b-2 py-10">
      <Layout>
        <SectionHeaderSkeleton />

        <section className="mt-10 grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex gap-3 md:flex-col">
              {[1, 2, 3, 4].map((_, i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-between">
            <div className="w-full space-y-4 text-sm">
              <Skeleton className="h-6 w-24" /> {/* Category badge */}
              <Skeleton className="h-8 w-full max-w-60" /> {/* Product title */}
              <Skeleton className="h-5 w-full max-w-40" /> {/* Ratings */}
              <Skeleton className="h-20 w-full" /> {/* Description */}
              <Skeleton className="h-10 w-full max-w-28" /> {/* Price */}
              <div className="mt-3 flex items-center justify-between gap-x-5">
                <div className="space-y-px">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-10 w-32" /> {/* Quantity selector */}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6 flex items-center justify-center">
              <Skeleton className="h-12 w-full rounded-none" />
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default ProductMainSkeleton;
