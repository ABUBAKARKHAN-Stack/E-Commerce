import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, FC, SetStateAction } from "react";
import CategoryFilter from "./CategoryFilter";
import PriceRange from "./PriceRange";
import SortSelector from "./SortSelector";
import { ProductFilterParams } from "@/types/main.types";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setSearchFiltersSort: Dispatch<SetStateAction<ProductFilterParams>>;
  searchFiltersSort: ProductFilterParams;
  filterCount: number;
  onFilterRemove: () => void;
};

const FilterPanel: FC<Props> = ({
  isOpen,
  setIsOpen,
  searchFiltersSort,
  setSearchFiltersSort,
  filterCount,
  onFilterRemove,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute right-0 z-50 h-auto w-full max-w-120 overflow-hidden rounded-lg bg-transparent">
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{
              y: "-400px",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -400,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="bg-accent scrollbar-thin md:scrollbar scrollbar-corner-white dark:scrollbar-thumb-orange-500 scrollbar-thumb-cyan-500 scrollbar-track-transparent scrollbar-custom h-full max-h-96 w-full space-y-4 overflow-y-scroll rounded-lg border-2 border-cyan-500 px-4 py-6 dark:border-orange-500"
          >
            <div className="flex items-center justify-between text-gray-950 dark:text-white">
              <h2 className="text-lg font-bold tracking-wide">
                Filter/Sort Products
              </h2>
              <Button onClick={() => setIsOpen(false)} size={"icon"}>
                <X className="size-6" />
              </Button>
            </div>
            <Separator className="bg-accent-foreground/10" />

            <CategoryFilter
              categoryValue={searchFiltersSort.category}
              setCategoryValue={setSearchFiltersSort}
            />
            <Separator className="bg-accent-foreground/10" />

            <PriceRange
              minPriceValue={searchFiltersSort.minPrice}
              setMinPriceValue={setSearchFiltersSort}
              maxPriceValue={searchFiltersSort.maxPrice}
              setMaxPriceValue={setSearchFiltersSort}
            />
            <Separator className="bg-accent-foreground/10" />

            <SortSelector
              sortByValue={searchFiltersSort.sortBy}
              setSortByValue={setSearchFiltersSort}
            />

            <Button
              onClick={onFilterRemove}
              disabled={filterCount <= 0}
              className="rounded-none px-4 py-5 text-base transition-colors ease-linear"
            >
              Remove All Filters
              {filterCount > 0 && (
                <span className="flex size-6 items-center justify-center rounded-full bg-cyan-200 font-bold text-cyan-600 dark:bg-orange-200 dark:text-orange-600">
                  {filterCount}
                </span>
              )}
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;
