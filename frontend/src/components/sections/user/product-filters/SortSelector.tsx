import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowDown01, ArrowDownAZ, Clock, SortAsc } from "lucide-react";
import { FC } from "react";

type Props = {
  sortByValue: string;
  setSortByValue: (value: string) => void;
};
const SortSelector: FC<Props> = ({ sortByValue, setSortByValue }) => {
  const selectOptions = [
    {
      label: (
        <div className="flex items-center gap-x-1">
          <Clock className="size-4.5 stroke-3" />
          <span>Date</span>
        </div>
      ),
      options: [{ value: "newest", label: "Newest Arrival", group: "date" }],
    },
    {
      label: (
        <div className="flex items-center gap-x-1">
          <ArrowDown01 className="size-4.5 stroke-3" />
          <span>Price</span>
        </div>
      ),
      options: [
        { value: "price-low-to-high", label: "Low to High", group: "price" },
        { value: "price-high-to-low", label: "High to Low", group: "price" },
      ],
    },
    {
      label: (
        <div className="flex items-center gap-x-1">
          <ArrowDownAZ className="size-4.5 stroke-3" />
          <span>Name</span>
        </div>
      ),
      options: [
        { value: "a-z", label: "A-Z", group: "name" },
        { value: "z-a", label: "Z-A", group: "name" },
      ],
    },
  ];

  return (
    <div className="w-full space-y-3">
      <div className="w-full space-y-1">
        <div className="flex items-center gap-x-2 text-base font-semibold tracking-wide text-gray-950 dark:text-white">
          <SortAsc className="size-5 stroke-2" />
          <span>Sort Products:</span>
        </div>
        <Separator className="bg-accent-foreground/10 w-full" />
      </div>
      <Select
        options={selectOptions}
        value={sortByValue}
        onChange={setSortByValue}
        placeholder="Sort By"
      />
    </div>
  );
};

export default SortSelector;
