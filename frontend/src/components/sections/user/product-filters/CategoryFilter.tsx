import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { formattedCategory } from "@/utils/formatters";
import { FC } from "react";

type Props = {
  categoryValue: string;
  setCategoryValue: (value: string) => void;
  categories: string[] | null;
};
const CategoryFilter: FC<Props> = ({
  categoryValue,
  setCategoryValue,
  categories,
}) => {
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
        onValueChange={(value) => setCategoryValue(value)}
      >
        {categories?.map((c: string, i: number) => {
          const title = formattedCategory(c);
          const id = `checkbox-${i}`;

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
