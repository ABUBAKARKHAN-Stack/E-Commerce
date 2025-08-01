import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProductContext } from "@/context/productContext";
import { IProduct } from "@/types/main.types";
import { ArrowRightCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {
  AddToCartButton,
  CategoryBadge,
  ProductImageSelector,
  ProductQuantitySelector,
} from "@/components/reusable/user";

type Props = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  productId: string;
};

const ViewProduct: FC<Props> = ({ isOpen, onOpenChange, productId }) => {
  const { getProduct } = useProductContext();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [currentImageSrc, setCurrentImageSrc] = useState("");
  const [quantityCount, setQuantityCount] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProduct(productId);
        setProduct(res);
        if (res) setCurrentImageSrc(res.thumbnails[0]);
      } catch (error) {
        setProduct(null);
      }
    })();
  }, [productId]);

  if (!product) return null;

  const avgRating = product.avgRating || 0;
  const totalReviews = product.totalReviews || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="h-[95%] max-h-[550px] w-full overflow-auto sm:!max-w-[610px] md:!max-w-2xl lg:!max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950 dark:text-white">
            Product Details
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed font-light text-gray-600 dark:text-gray-400">
            Explore complete product information including specifications,
            pricing, stock availability, and customer reviews to make an
            informed purchase decision.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative space-y-4">
            <div className="relative h-64 w-full">
              <CategoryBadge
                category={product.category}
                className="absolute top-2 left-2 z-10 w-fit"
              />
              <div className="absolute top-1/2 left-1/2 flex h-full w-[99.5%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-gray-200 p-4 dark:bg-[#2c2c2e]">
                <img
                  src={currentImageSrc}
                  alt={product.name + " Image"}
                  className="drop-shadow-8px size-52 object-contain shadow-black"
                />
              </div>
            </div>
            <ProductImageSelector
              thumbnails={product.thumbnails}
              currentImageSrc={currentImageSrc}
              setCurrentImageSrc={setCurrentImageSrc}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div className="w-full space-y-4 text-sm">
              {/* Product Title */}
              <h2 className="line-clamp-2 text-lg font-semibold text-gray-900 uppercase dark:text-white">
                {product.name}
              </h2>

              {/* Ratings */}
              {avgRating > 0 && (
                <div className="flex items-center gap-x-0.5">
                  {Array.from({ length: Math.ceil(avgRating) }, (_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-cyan-500 text-cyan-500 dark:fill-orange-500 dark:text-orange-500"
                    />
                  ))}
                  <span className="ml-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                    ({totalReviews} reviews)
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="line-clamp-3 text-sm leading-relaxed font-light tracking-wide text-gray-900 dark:text-gray-300">
                {product.description || "No description available."}
              </p>

              {/* Price */}
              <h1 className="text-4xl font-bold text-cyan-500 dark:text-orange-500">
                {product.price}$
              </h1>

              {/* Stock Info */}
              <div className="flex w-full items-center justify-start gap-x-2">
                <h4 className="font-light text-nowrap text-gray-900 dark:text-gray-300">
                  Total Stock Available:
                </h4>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {product.quantity}
                </h3>
              </div>

              {/* Quantity Selector */}
              <div className="mt-3 flex items-center justify-between gap-x-5">
                <div className="space-y-px text-xs font-light text-gray-900 dark:text-gray-300">
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
                quantity={quantityCount}
              />
            </div>
          </div>
        </div>

        {/* View Full Page */}
        <div className="mt-6 flex justify-end">
          <Link
            to={`/products/${product._id}`}
            className="flex transform items-center gap-x-1 text-sm font-semibold text-cyan-600 transition-all duration-200 ease-linear hover:-translate-x-2 hover:scale-110 hover:underline dark:text-orange-400"
          >
            View Full Page <ArrowRightCircle className="size-5" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProduct;
