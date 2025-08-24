import { ToolTip } from "@/components/reusable/shared";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  setIsFilterPanelOpen: Dispatch<SetStateAction<boolean>>;
  filterCount: number;
};

const FilterPanelTriggerButton: FC<Props> = ({
  setIsFilterPanelOpen,
  filterCount,
}) => {
  return (
    <div className="relative">
      <ToolTip
        triggerValue={
          <Button
            onClick={() => setIsFilterPanelOpen((prev) => !prev)}
            className="!size-12"
          >
            <FilterIcon className="size-8" />
          </Button>
        }
        tooltip="Click to filter or sort orders"
      />
      <span className="bg-destructive-foreground absolute inset-y-0 -top-2 -right-1 block size-4 rounded-full text-center text-xs font-semibold text-white">
        {filterCount}
      </span>
    </div>
  );
};

export default FilterPanelTriggerButton;
