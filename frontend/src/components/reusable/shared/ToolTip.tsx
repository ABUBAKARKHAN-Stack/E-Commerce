import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FC, ReactNode } from "react";

type Props = {
  tooltip: string;
  triggerValue: ReactNode;
};

const ToolTip: FC<Props> = ({ tooltip, triggerValue }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{triggerValue}</TooltipTrigger>
        <TooltipContent className="max-w-60 text-center text-wrap">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
