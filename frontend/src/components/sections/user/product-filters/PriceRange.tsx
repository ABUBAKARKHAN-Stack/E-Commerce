import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ProductFilterParams } from "@/types/main.types";
import { DollarSign } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  minPriceValue: string;
  setMinPriceValue: Dispatch<SetStateAction<ProductFilterParams>>;
  maxPriceValue: string;
  setMaxPriceValue: Dispatch<SetStateAction<ProductFilterParams>>;
};

const PriceRange: FC<Props> = ({
  minPriceValue,
  setMinPriceValue,
  maxPriceValue,
  setMaxPriceValue,
}) => {
  return (
    <div className="w-full space-y-3">
      <div className="w-full space-y-1">
        <h3 className="flex items-center gap-x-2 text-base font-semibold tracking-wide text-gray-950 dark:text-white">
          <DollarSign className="size-5 stroke-2" />
          Price Range
        </h3>
        <Separator className="bg-accent-foreground/10 w-full" />
      </div>

      <div className="w-full space-y-3">
        <div className="grid grid-cols-2 gap-x-3">
          <div className="space-y-1">
            <Label
              htmlFor="min-price"
              className="text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Min Price
            </Label>
            <Input
              id="min-price"
              placeholder="0"
              type="number"
              min={0}
              onChange={(e) =>
                setMinPriceValue((prev) => ({
                  ...prev,
                  minPrice: e.target.value,
                }))
              }
              value={minPriceValue}
            />
          </div>
          <div className="space-y-1">
            <Label
              htmlFor="max-price"
              className="text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Max Price
            </Label>
            <Input
              id="max-price"
              placeholder="5000"
              type="number"
              min={0}
              onChange={(e) =>
                setMaxPriceValue((prev) => ({
                  ...prev,
                  maxPrice: e.target.value,
                }))
              }
              value={maxPriceValue}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Under $50", min: 0, max: 50 },
            { label: "$50 - $250", min: 50, max: 250 },
            { label: "$250 - $500", min: 250, max: 500 },
            { label: "$500 - $1000", min: 500, max: 1000 },
            { label: "$1000+", min: 1000, max: null },
          ].map((preset, i) => (
            <button
              key={i}
              onClick={() => {
                setMinPriceValue((prev) => ({
                  ...prev,
                  minPrice: preset.min + "",
                }));
                setMaxPriceValue((prev) => ({
                  ...prev,
                  maxPrice: preset.max + "",
                }));
              }}
              className="rounded-full border border-cyan-500/50 px-3 py-1.5 text-xs font-medium text-cyan-600 transition-colors hover:bg-cyan-500/10 dark:border-orange-500/50 dark:text-orange-400 hover:dark:bg-orange-500/10"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
