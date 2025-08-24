import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductContext } from "@/context/product.context";
import { ProductFilterParams } from "@/types/main.types";
import { formattedCategory } from "@/utils/formatters";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  categoryValue: string;
  setCategoryValue: Dispatch<SetStateAction<ProductFilterParams>>;
};
const CategoryFilter: FC<Props> = ({ categoryValue, setCategoryValue }) => {
  const { useCategories } = useProductContext();

  const {
    data: categories,
    isLoading,
    isError,
    refetch,
    isRefetching,
    error,
  } = useCategories();

  if (isLoading) {
    return (
      <div className="relative z-10 w-full space-y-3">
        <div className="w-full space-y-1">
          <Skeleton className="h-4 w-36 !bg-gray-950 dark:!bg-gray-300/50" />{" "}
          {/* Heading */}
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="flex items-center gap-x-2">
              <Skeleton className="h-4 w-20 !bg-gray-950 dark:!bg-gray-300/50" />{" "}
              {/* Label */}
              <Skeleton className="size-4 rounded-full !bg-gray-950 dark:!bg-gray-300/50" />{" "}
              {/* Radio */}
              {i < 4 && (
                <Separator
                  orientation="vertical"
                  className="bg-accent-foreground/10"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    const errMsg = error.response?.data.message || "Failed to load categories.";
    return (
      <>
        <div className="w-full space-y-1">
          <h3 className="text-base font-semibold tracking-wide text-gray-950 dark:text-white">
            Filter By Category:
          </h3>
          <Separator className="bg-accent-foreground/10 w-full" />
        </div>
        <div className="text-destructive-foreground flex flex-col items-center gap-3 p-4 text-center">
          <div className="rounded-full bg-red-100 p-1.5 dark:bg-red-900/20">
            <AlertTriangle className="text-destructive-foreground size-5" />
          </div>
          <p className="mx-auto max-w-[70%] text-sm font-medium">{errMsg}</p>
          <Button
            size="sm"
            disabled={isRefetching}
            variant="outline"
            onClick={() => refetch()}
            className="text-xs text-black dark:text-white"
          >
            <RefreshCcw
              className={`${isRefetching ? "animate-spin" : "animate-none"}`}
            />
            {isRefetching ? "Retrying..." : "Retry"}
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="w-full space-y-3">
      <div className="w-full space-y-1">
        <h3 className="text-base font-semibold tracking-wide text-gray-950 dark:text-white">
          Filter By Category:
        </h3>
        <Separator className="bg-accent-foreground/10 w-full" />
      </div>
      <RadioGroup
        className="flex flex-wrap gap-x-2 gap-y-2 text-gray-900 dark:text-gray-300"
        value={categoryValue || "all"}
        onValueChange={(value) =>
          setCategoryValue((prev) => ({ ...prev, category: value }))
        }
      >
        {categories?.map((c: string, i: number) => {
          const title = formattedCategory(c);
          const id = `radio-${i}`;

          return (
            <div key={id} className="flex items-center gap-x-2">
              <label htmlFor={id} className="text-sm font-semibold">
                {title}
              </label>
              <RadioGroupItem
                id={id}
                value={c}
                className="border-accent-foreground/10"
              >
                {title}
              </RadioGroupItem>
              {i < categories.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="bg-accent-foreground/10"
                />
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default CategoryFilter;
