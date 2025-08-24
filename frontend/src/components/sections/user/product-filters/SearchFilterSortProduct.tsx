import { Dispatch, FC, SetStateAction, useState } from "react";
import { Filter } from "lucide-react";
import { useProductContext } from "@/context/product.context";
import SearchBar from "./SearchBar";
import FilterToggleButton from "./FilterToggleButton";
import FilterPanel from "./FilterPanel";
import { IProduct, ProductFilterParams } from "@/types/main.types";

type Props = {
  productsData: IProduct[] | undefined;
  searchFiltersSort: ProductFilterParams;
  setSearchFiltersSort: Dispatch<SetStateAction<ProductFilterParams>>;
  filterCount: number;
  handleFilterRemove: () => void;
};

const SearchFilterSortProduct: FC<Props> = ({
  productsData,
  searchFiltersSort,
  setSearchFiltersSort,
  filterCount,
  handleFilterRemove,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full space-y-6">
      {/* Section Title */}
      <div className="flex items-center gap-2">
        <Filter className="size-8.5 text-gray-900 dark:text-white" />
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Explore & Refine Products
        </h2>
      </div>

      <div className="flex w-full items-center justify-between gap-x-4">
        {/* Search Component */}
        <SearchBar
          searchValue={searchFiltersSort.search}
          setSearchFiltersSort={setSearchFiltersSort}
          productNames={productsData?.map((p) => p.name)}
        />

        {/* Filter Panel Toggle Button Component */}
        <FilterToggleButton
          isOpenToggle={isOpen}
          setIsOpenToggle={setIsOpen}
          filterCount={filterCount}
        />
      </div>

      {/* Filter Panel Component */}
      <FilterPanel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchFiltersSort={searchFiltersSort}
        setSearchFiltersSort={setSearchFiltersSort}
        filterCount={filterCount}
        onFilterRemove={handleFilterRemove}
      />
    </div>
  );
};

export default SearchFilterSortProduct;
