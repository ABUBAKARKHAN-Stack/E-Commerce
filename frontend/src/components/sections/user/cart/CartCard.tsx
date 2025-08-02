import { MagicCard } from "@/components/magicui/magic-card";
import { ToolTip } from "@/components/reusable/shared";
import { CategoryBadge } from "@/components/reusable/user";
import { Button } from "@/components/ui/button";
import { useProductContext } from "@/context/productContext";
import { useCartQuantityHandler } from "@/hooks/useCartQuantityHandler";
import { Trash2 } from "lucide-react";
import { FC } from "react";
import { Link, useRevalidator } from "react-router-dom";
import CartQuantitySelector from "./CartQuantitySelector";
import { ICartedProduct } from "@/types/main.types";
import { useTheme } from "next-themes";

type Props = {
  products: ICartedProduct[];
};

const CartCard: FC<Props> = ({ products }) => {
  const { resolvedTheme } = useTheme();
  const { removeFromCart, updateCart } = useProductContext();
  const isDark = resolvedTheme === "dark";
  const { revalidate } = useRevalidator();
  const {
    handleIncrement,
    handleDecrement,
    handleInputChange,
    getCurrentQuantity,
    getSubtotal,
    quantityInputs,
    newAddedQuantities,
  } = useCartQuantityHandler(products);

  const handleUpdateQuantity = async (productId: string) => {
    const newAddedQty = newAddedQuantities[productId];
    await updateCart(productId, newAddedQty, revalidate);
  };

  const handleProductRemoveFromCart = async (productId: string) => {
    await removeFromCart(productId, revalidate);
  };

  return (
    <div className="!shadow-6px grid grid-cols-1 rounded shadow-black">
      {products.map((p) => (
        <MagicCard
          key={p._id}
          gradientSize={100}
          gradientColor={isDark ? "#262626" : "#ecfeff"}
          gradientFrom={isDark ? "#F15136" : "#0891b2"}
          gradientTo={isDark ? "#FBA740" : "#06b6d4"}
          className="rounded-none"
        >
          <div className="border-border flex w-full flex-col gap-4 border-b px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Desktop Layout ( > lg) */}
            <div className="hidden lg:flex lg:w-full lg:items-center lg:justify-between lg:gap-6">
              {/* Category Badge */}
              <CategoryBadge
                category={p.category}
                bagdeClass="!text-xs font-light"
                className="static w-fit"
              />

              {/* Product Thumbnail */}
              <div className="aspect-square size-24 md:size-28">
                <img
                  src={p.thumbnails[0]}
                  alt={`${p.name} Image`}
                  className="drop-shadow-2px size-full object-contain shadow-black"
                />
              </div>

              {/* Product Name with Link + Tooltip */}
              <div className="max-w-[150px]">
                <ToolTip
                  triggerValue={
                    <Link
                      to={`/products/${p._id}`}
                      className="transition-all hover:text-cyan-500 hover:underline dark:hover:text-orange-400"
                      aria-label={`View details of ${p.name}`}
                    >
                      <h2 className="truncate text-sm font-semibold uppercase">
                        {p.name}
                      </h2>
                    </Link>
                  }
                  tooltip={p.name}
                />
              </div>

              {/* Subtotal Section */}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-cyan-500 md:text-3xl dark:text-orange-500">
                  {getSubtotal(p)}$
                </h1>
                <p className="text-muted-foreground text-[11px] font-light tracking-wide">
                  Subtotal: {p.price}$ × {getCurrentQuantity(p._id)} ={" "}
                  {getSubtotal(p)}$
                </p>
                <p
                  className={`${getCurrentQuantity(p._id) >= p.quantity ? "text-destructive-foreground" : "text-muted-foreground"} text-center text-[11px] font-light tracking-wide`}
                >
                  Stock: {p.quantity} / Added: {getCurrentQuantity(p._id)}
                </p>
                {newAddedQuantities[p._id] !== 0 && (
                  <p className="text-[10px] font-medium text-cyan-600 dark:text-orange-600">
                    {newAddedQuantities[p._id] > 0 ? "+" : ""}
                    {newAddedQuantities[p._id]} from original
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <CartQuantitySelector
                quantityInputs={quantityInputs}
                newAddedQuantities={newAddedQuantities}
                product={p}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleInputChange={handleInputChange}
                handleUpdateQuantity={handleUpdateQuantity}
                getCurrentQuantity={getCurrentQuantity}
              />

              {/* Remove Button */}
              <Button
                variant="destructive"
                size="sm"
                className="flex items-center gap-x-1 px-5 font-medium shadow-md shadow-red-500/50 transition-all duration-200 ease-in-out hover:scale-105 dark:shadow-red-900/80"
                aria-label={`Remove ${p.name} from cart`}
                onClick={() => handleProductRemoveFromCart(p._id.toString())}
              >
                <Trash2 className="size-4" />
                Remove
              </Button>
            </div>

            {/* Mobile Layout (< lg) */}
            <div className="space-y-4 lg:hidden">
              {/* Category Badge - Top Right */}
              <div className="flex justify-end">
                <CategoryBadge
                  category={p.category}
                  bagdeClass="!text-xs font-light"
                  className="w-fit"
                />
              </div>

              {/* Product Image and Name Row */}
              <div className="flex items-start gap-4">
                <div className="aspect-square size-24 flex-shrink-0">
                  <img
                    src={p.thumbnails[0]}
                    alt={`${p.name} Image`}
                    className="drop-shadow-2px size-full object-contain shadow-black"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <ToolTip
                    triggerValue={
                      <Link
                        to={`/products/${p._id}`}
                        className="transition-all hover:text-cyan-500 hover:underline dark:hover:text-orange-400"
                        aria-label={`View details of ${p.name}`}
                      >
                        <h2 className="line-clamp-2 text-sm leading-tight font-semibold uppercase">
                          {p.name}
                        </h2>
                      </Link>
                    }
                    tooltip={p.name}
                  />
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex justify-center">
                <CartQuantitySelector
                  quantityInputs={quantityInputs}
                  newAddedQuantities={newAddedQuantities}
                  product={p}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleInputChange={handleInputChange}
                  handleUpdateQuantity={handleUpdateQuantity}
                  getCurrentQuantity={getCurrentQuantity}
                />
              </div>

              {/* Price and Remove Button Row */}
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-cyan-500 md:text-3xl dark:text-orange-500">
                    {getSubtotal(p)}$
                  </h1>
                  <p className="text-muted-foreground text-[11px] font-light tracking-wide">
                    Subtotal: {p.price}$ × {getCurrentQuantity(p._id)} ={" "}
                    {getSubtotal(p)}$
                  </p>
                  <p
                    className={`${getCurrentQuantity(p._id) >= p.quantity ? "text-destructive-foreground" : "text-muted-foreground"} text-[11px] font-light tracking-wide`}
                  >
                    Stock: {p.quantity} / Added: {getCurrentQuantity(p._id)}
                  </p>
                  {newAddedQuantities[p._id] !== 0 && (
                    <p className="text-[10px] font-medium text-cyan-600 dark:text-orange-600">
                      {newAddedQuantities[p._id] > 0 ? "+" : ""}
                      {newAddedQuantities[p._id]} from original
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => handleProductRemoveFromCart(p._id)}
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-x-1 px-4 py-2 font-medium shadow-md shadow-red-500/50 transition-all duration-200 ease-in-out hover:scale-105 dark:shadow-red-900/80"
                  aria-label={`Remove ${p.name} from cart`}
                >
                  <Trash2 className="size-4" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </MagicCard>
      ))}
    </div>
  );
};

export default CartCard;
