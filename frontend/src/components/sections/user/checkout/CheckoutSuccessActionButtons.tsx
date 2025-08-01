import { FC, Ref } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  buttonsRef: Ref<HTMLDivElement>;
  orderId: string;
};

const CheckoutSuccessActionButtons: FC<Props> = ({ buttonsRef, orderId }) => {
  const navigate = useNavigate();
  return (
    <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4">
      <button
        onClick={() => navigate(`/track-order?orderId=${orderId}`)}
        className="flex transform items-center gap-3 rounded-xl border-0 bg-gradient-to-r from-cyan-500 to-cyan-600 px-12 py-3 text-lg font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer hover:from-cyan-600 hover:to-cyan-700 hover:shadow-xl hover:shadow-cyan-500/40 dark:from-orange-500 dark:to-orange-600 dark:shadow-orange-500/30 dark:hover:from-orange-600 dark:hover:to-orange-700 dark:hover:shadow-orange-500/40"
      >
        Track Order
      </button>
      <button
        onClick={() => navigate("/products")}
        className="flex transform items-center gap-3 rounded-xl border-2 bg-white px-12 py-3 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer dark:bg-transparent dark:text-white"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default CheckoutSuccessActionButtons;
