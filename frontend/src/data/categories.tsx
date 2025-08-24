import { JSX } from "react";
import {
  LaptopIcon,
  MonitorIcon,
  KeyboardIcon,
  MouseIcon,
  SmartphoneIcon,
  TabletIcon,
  WatchIcon,
  HeadphonesIcon,
  EarIcon,
  SpeakerIcon,
  CpuIcon,
  MemoryStickIcon,
  HardDriveIcon,
  BatteryChargingIcon,
  NetworkIcon,
  PrinterIcon,
  BoxIcon,
  ShoppingCartIcon,
  GamepadIcon,
  CameraIcon,
  TvIcon,
  CircuitBoardIcon,
  PuzzleIcon,
  BoxesIcon,
  ServerIcon,
} from "lucide-react";

// ==============================
// Static Categories (Homepage)
// ==============================

interface StaticCategory {
  icon: JSX.Element;
  title: string;
  category: string;
}

const staticCategoriesData: StaticCategory[] = [
  { icon: <LaptopIcon size={50} />, title: "Laptops", category: "laptops" },
  {
    icon: <SmartphoneIcon size={50} />,
    title: "Smartphones",
    category: "smartphones",
  },
  { icon: <TvIcon size={50} />, title: "Televisions", category: "televisions" },
  {
    icon: <WatchIcon size={50} />,
    title: "Smartwatches",
    category: "smartwatches",
  },
  { icon: <GamepadIcon size={50} />, title: "Gaming", category: "gaming" },
  { icon: <CameraIcon size={50} />, title: "Cameras", category: "cameras" },
];

// ==============================
// Category Icon Map (Dynamic)
// ==============================

const categoriesIconMap: Record<string, JSX.Element> = {
  // Computing
  laptops: <LaptopIcon size={50} />,
  desktops: <MonitorIcon size={50} />,
  monitors: <MonitorIcon size={50} />,
  keyboards: <KeyboardIcon size={50} />,
  mice: <MouseIcon size={50} />,

  // Mobiles & Tablets
  smartphones: <SmartphoneIcon size={50} />,
  tablets: <TabletIcon size={50} />,
  smartwatches: <WatchIcon size={50} />,
  "mobile-accessories": <BoxIcon size={50} />,

  // Audio
  headphones: <HeadphonesIcon size={50} />,
  earbuds: <EarIcon size={50} />,
  speakers: <SpeakerIcon size={50} />,
  soundbars: <SpeakerIcon size={50} />,

  // Components
  processors: <CpuIcon size={50} />,
  "graphic-cards": <PuzzleIcon size={50} />,
  motherboards: <CircuitBoardIcon size={50} />,
  ram: <MemoryStickIcon size={50} />,
  storage: <HardDriveIcon size={50} />,
  "power-supply": <BatteryChargingIcon size={50} />,

  // Others
  networking: <NetworkIcon size={50} />,
  printers: <PrinterIcon size={50} />,
  uncategorized: <BoxIcon size={50} />,

  // Fallback
  default: <ShoppingCartIcon size={50} />,
};

// ==============================
// Category Options (Filter UI)
// ==============================

const categoryOptions = [
  {
    label: (
      <div className="flex items-center gap-x-1">
        <LaptopIcon className="size-4.5" />
        <span className="font-semibold">Computing</span>
      </div>
    ),
    options: [
      { value: "laptops", label: "Laptops", group: "computing" },
      { value: "desktops", label: "Desktops", group: "computing" },
      { value: "monitors", label: "Monitors", group: "computing" },
      { value: "keyboards", label: "Keyboards", group: "computing" },
      { value: "mice", label: "Mice", group: "computing" },
    ],
  },
  {
    label: (
      <div className="flex items-center gap-x-1">
        <SmartphoneIcon className="size-4.5" />
        <span className="font-semibold">Mobiles & Tablets</span>
      </div>
    ),
    options: [
      { value: "smartphones", label: "Smartphones", group: "mobiles" },
      { value: "tablets", label: "Tablets", group: "mobiles" },
      { value: "smartwatches", label: "Smartwatches", group: "mobiles" },
      {
        value: "mobile-accessories",
        label: "Mobile Accessories",
        group: "mobiles",
      },
    ],
  },
  {
    label: (
      <div className="flex items-center gap-x-1">
        <HeadphonesIcon className="size-4.5" />
        <span className="font-semibold">Audio</span>
      </div>
    ),
    options: [
      { value: "headphones", label: "Headphones", group: "audio" },
      { value: "earbuds", label: "Earbuds", group: "audio" },
      { value: "speakers", label: "Speakers", group: "audio" },
      { value: "soundbars", label: "Soundbars", group: "audio" },
    ],
  },
  {
    label: (
      <div className="flex items-center gap-x-1">
        <ServerIcon className="size-4.5" />
        <span className="font-semibold">Components</span>
      </div>
    ),
    options: [
      { value: "processors", label: "Processors", group: "components" },
      { value: "graphic-cards", label: "Graphic Cards", group: "components" },
      { value: "motherboards", label: "Motherboards", group: "components" },
      { value: "ram", label: "RAM", group: "components" },
      { value: "storage", label: "Storage (SSD/HDD)", group: "components" },
      {
        value: "power-supply",
        label: "Power Supply Units",
        group: "components",
      },
    ],
  },
  {
    label: (
      <div className="flex items-center gap-x-1">
        <BoxesIcon className="size-4.5" />
        <span className="font-semibold">Others</span>
      </div>
    ),
    options: [
      {
        value: "networking",
        label: "Networking Devices",
        group: "others",
      },
      { value: "printers", label: "Printers & Scanners", group: "others" },
      { value: "uncategorized", label: "Uncategorized", group: "others" },
    ],
  },
];

export { staticCategoriesData, categoriesIconMap, categoryOptions };
