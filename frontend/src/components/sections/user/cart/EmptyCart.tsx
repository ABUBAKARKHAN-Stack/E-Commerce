import { Layout } from "@/components/layout/shared";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <main className="relative flex h-full min-h-[75vh] w-full min-w-screen items-center justify-center overflow-x-hidden border-b-2 bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] py-10 backdrop-blur-xl dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
      <Layout className="flex flex-col items-center justify-center space-y-6">
        <BlurFade inView delay={0.1} duration={0.25} direction="down">
          <div className="relative">
            <div className="animate-spin-slow absolute top-1/2 left-1/2 -z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-3 bg-white/10 shadow-md shadow-cyan-500/40 dark:bg-white/10 dark:shadow-orange-400/40"></div>
            <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-200/40 bg-cyan-500 dark:border-orange-400/50 dark:bg-orange-500">
              <ShoppingBag className="size-10 text-cyan-100 drop-shadow-md dark:text-orange-200" />
            </div>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.35} direction="down">
          <div className="mx-auto space-y-4 px-4 text-center">
            <h1 className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-4xl leading-tight font-black tracking-tight text-transparent md:text-5xl dark:from-orange-500 dark:to-orange-600">
              Your Cart is Empty
            </h1>
            <p className="mx-auto w-full text-lg leading-relaxed font-medium text-gray-900 sm:w-3/4 md:text-xl dark:text-gray-300">
              It looks like you haven’t added anything to your cart yet. Start
              shopping to see your items here!
            </p>
            <p className="text-muted-foreground text-sm font-light">
              Explore our collection and add products to your cart to get
              started.
            </p>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.75} direction="down">
          <Link
            to={"/products"}
            className="flex transform items-center gap-3 rounded-xl border-0 bg-gradient-to-r from-cyan-500 to-cyan-600 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-cyan-600 hover:to-cyan-700 hover:shadow-xl hover:shadow-cyan-500/40 dark:from-orange-500 dark:to-orange-600 dark:shadow-orange-500/30 dark:hover:from-orange-600 dark:hover:to-orange-700 dark:hover:shadow-orange-500/40"
          >
            <ShoppingCart className="size-7" />
            Start Shopping
          </Link>
        </BlurFade>
      </Layout>
    </main>
  );
};

export default EmptyCart;
