import { ToolTip } from "@/components/reusable/shared";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { FC } from "react";

type Props = {
  isOpenToggle: boolean;
  setIsOpenToggle: (isOpen: boolean) => void;
  filterCount: number;
};
const FilterToggleButton: FC<Props> = ({
  isOpenToggle,
  setIsOpenToggle,
  filterCount,
}) => {
  return (
    <ToolTip
      triggerValue={
        <Button
          onClick={() => setIsOpenToggle(!isOpenToggle)}
          className="relative mt-6.5 size-12"
        >
          <div className="absolute -top-2 -right-2 size-4.5 rounded-full border-0 bg-red-600">
            <span className="flex size-full items-center justify-center rounded-full text-[11px] font-bold">
              {filterCount}
            </span>
          </div>
          <Filter className="size-6" />
        </Button>
      }
      tooltip={"Click to filter or sort products"}
    />
  );
};

export default FilterToggleButton;
