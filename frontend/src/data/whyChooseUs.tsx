import {
  Layers,
  ShieldCheck,
  BadgeDollarSign,
  HelpCircle,
  ShoppingCart,
  Headphones,
} from "lucide-react";

import { JSX } from "react";

interface WhyChooseUsItem {
  heading: string;
  text: string;
  icon: JSX.Element;
}

const whyChooseUsData: WhyChooseUsItem[] = [
  {
    heading: "Wide Selection",
    text: "Choose from a wide range of gadgets including smartphones, laptops, accessories, and more — all in one place.",
    icon: <Layers className="size-7 text-cyan-100 dark:text-orange-200" />,
  },
  {
    heading: "Quality Assurance",
    text: "All products go through strict quality checks to ensure you receive the best performance and reliability.",
    icon: <ShieldCheck className="size-7 text-cyan-100 dark:text-orange-200" />,
  },
  {
    heading: "Competitive Prices",
    text: "Get top-notch tech at unbeatable prices without compromising on quality or value.",
    icon: (
      <BadgeDollarSign className="size-7 text-cyan-100 dark:text-orange-200" />
    ),
  },
  {
    heading: "Expert Guidance",
    text: "Need help choosing? Our experts are here to guide you toward the right product for your needs.",
    icon: <HelpCircle className="size-7 text-cyan-100 dark:text-orange-200" />,
  },
  {
    heading: "Convenient Shopping",
    text: "Enjoy a smooth shopping experience with easy navigation, secure checkout, and fast delivery.",
    icon: (
      <ShoppingCart className="size-7 text-cyan-100 dark:text-orange-200" />
    ),
  },
  {
    heading: "Excellent Service",
    text: "We’re committed to your satisfaction with quick support, responsive service, and helpful assistance.",
    icon: <Headphones className="size-7 text-cyan-100 dark:text-orange-200" />,
  },
];

export { whyChooseUsData };
