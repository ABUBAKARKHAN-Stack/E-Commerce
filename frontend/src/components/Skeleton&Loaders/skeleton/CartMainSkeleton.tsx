import CartCardSkeleton from "./CartCardSkeleton";
import CartSummarySkeleton from "./CartSummarySkeleton";

const CartMainSkeleton = () => {
  return (
    <>
      <div className="shadow-6px mt-10 grid grid-cols-1 rounded shadow-black">
        {Array.from({ length: 4 }).map((_, i) => (
          <CartCardSkeleton key={i} />
        ))}
      </div>
      <div className="mt-8">
        <CartSummarySkeleton />
      </div>
    </>
  );
};

export default CartMainSkeleton;
