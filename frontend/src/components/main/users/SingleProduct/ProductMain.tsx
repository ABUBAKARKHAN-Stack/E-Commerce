import { Layout } from "@/components/layout/shared";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  AddReviewForm,
  AddToCartButton,
  CategoryBadge,
  ProductQuantitySelector,
  SectionHeader,
  WaveDivider,
} from "@/components/reusable/user";
import {
  ProductImagesGallery,
  ProductReviewsList,
} from "@/components/sections/user";
import { ProductMainSkeleton } from "@/components/Skeleton&Loaders/skeleton";
import { useProductContext } from "@/context/product.context";
import { IProduct } from "@/types/main.types";
import { ArrowLeft, Star } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const ProductMain = () => {
  const { productId } = useLoaderData();
  const { useProduct } = useProductContext();
  const navigate = useNavigate();
  const [quantityCount, setQuantityCount] = useState(1);

  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) return <ProductMainSkeleton />;

  return (
    !isLoading &&
    product && (
      <main className="bg-background relative h-full w-full min-w-screen overflow-x-hidden border-b-2 py-10">
        <Layout>
          <BlurFade delay={0.1} duration={1} className="relative mx-auto w-fit">
            <SectionHeader
              mainHeading={product.name}
              subText={product.description}
              animateOnce
            />
            <WaveDivider position="bottom" svgClass="h-2" className="-z-10" />
          </BlurFade>
          <section className="mt-10 grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
            <ProductImagesGallery thumbnails={product.thumbnails} />

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div className="w-full space-y-4 text-sm">
                <CategoryBadge
                  category={product.category}
                  className="static w-fit"
                />
                {/* Product Title */}
                <h2 className="line-clamp-2 text-2xl font-semibold text-gray-900 uppercase dark:text-white">
                  {product.name}
                </h2>
                {/* Ratings */}
                {product.avgRating > 0 && (
                  <div className="flex items-center gap-x-0.5">
                    {Array.from(
                      { length: Math.ceil(product.avgRating) },
                      (_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="fill-cyan-500 text-cyan-500 dark:fill-orange-500 dark:text-orange-500"
                        />
                      ),
                    )}
                    <span className="ml-1.5 text-sm font-medium text-gray-600 dark:text-gray-400">
                      ({product.totalReviews} reviews)
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className="line-clamp-3 text-lg leading-relaxed font-light tracking-wide text-gray-900 dark:text-gray-300">
                  {product.description || "No description available."}
                </p>

                {/* Price */}
                <h1 className="text-4xl font-bold text-cyan-500 dark:text-orange-500">
                  {product.price}$
                </h1>

                {/* Stock Info */}
                <div className="flex w-full items-center justify-start gap-x-2 text-base">
                  <h4 className="font-light text-nowrap text-gray-900 dark:text-gray-300">
                    Total Stock Available:
                  </h4>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {product.quantity}
                  </h3>
                </div>

                {/* Quantity Selector */}
                <div className="mt-3 flex items-center justify-between gap-x-5">
                  <div className="space-y-px text-sm font-light text-gray-900 dark:text-gray-300">
                    <p>Quantity</p>
                    <p>(Pieces)</p>
                  </div>
                  <ProductQuantitySelector
                    productQuantity={product.quantity}
                    quantityCount={quantityCount}
                    setQuantityCount={setQuantityCount}
                  />
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-6 flex items-center justify-center">
                <AddToCartButton
                  stock={product.quantity}
                  productId={product._id}
                  quantity={4}
                />
              </div>
            </div>
          </section>
        </Layout>
      </main>
    )
  );
};

export default ProductMain;
