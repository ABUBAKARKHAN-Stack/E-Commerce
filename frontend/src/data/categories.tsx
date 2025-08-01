import {
  Camera,
  Gamepad,
  Laptop,
  ShoppingCart,
  Smartphone,
  Tv,
  Watch,
} from "lucide-react";
import { JSX } from "react";

interface StaticCategory {
  icon: JSX.Element;
  title: string;
  category: string;
}

const staticCategoriesData: StaticCategory[] = [
  { icon: <Laptop size={50} />, title: "Laptops", category: "laptops" },
  {
    icon: <Smartphone size={50} />,
    title: "Smartphones",
    category: "smartphones",
  },
  { icon: <Tv size={50} />, title: "Televisions", category: "televisions" },
  {
    icon: <Watch size={50} />,
    title: "Smartwatches",
    category: "smartwatches",
  },
  { icon: <Gamepad size={50} />, title: "Gaming", category: "gaming" },
  { icon: <Camera size={50} />, title: "Cameras", category: "cameras" },
];

const categoriesIconMap: Record<string, JSX.Element> = {
  laptops: <Laptop size={50} />,
  smartphones: <Smartphone size={50} />,
  televisions: <Tv size={50} />,
  smartwatches: <Watch size={50} />,
  gaming: <Gamepad size={50} />,
  cameras: <Camera size={50} />,
  default: <ShoppingCart size={50} />,
};

export { staticCategoriesData, categoriesIconMap };
