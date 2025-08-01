import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { History, Search, SearchIcon, X } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  productNames?: string[];
};

const SearchBar: FC<Props> = ({
  searchValue,
  setSearchValue,
  productNames,
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [lastSearch, setLastSearch] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const clickOutSide = (e: Event) => {
      if (inputRef.current && inputRef.current.contains(e.target as Node))
        return;
      setIsFocus(false);
    };
    document.addEventListener("click", clickOutSide);

    return () => document.removeEventListener("click", clickOutSide);
  }, [isFocus]);

  const getLastSearch = (): string[] => {
    const data = localStorage.getItem("last-search");
    return data ? JSON.parse(data) : [];
  };

  useEffect(() => {
    const lastSearchLs = getLastSearch();
    setLastSearch(lastSearchLs);
  }, []);

  const handleSearchClick = (n: string) => {
    setSearchValue(n);
    let lastSearchData = getLastSearch();
    lastSearchData = lastSearchData.filter(
      (s) => s.toLowerCase() !== n.toLowerCase(),
    );
    lastSearchData = [...lastSearchData, n];
    setLastSearch(lastSearchData);
    localStorage.setItem("last-search", JSON.stringify(lastSearchData));
  };

  const handleLastSearchRemove = (n: string) => {
    let lastSearchData = getLastSearch();
    const index = lastSearchData.findIndex(
      (s) => s.toLowerCase() === n.toLowerCase(),
    );
    if (index === -1) return;
    lastSearchData.splice(index, 1);
    setLastSearch(lastSearchData);
    localStorage.setItem("last-search", JSON.stringify(lastSearchData));
    inputRef.current?.focus();
    setIsFocus(true);
  };

  return (
    <div className="relative w-full max-w-[500px]">
      <Label
        htmlFor="search-products"
        className="mb-1 flex w-fit cursor-pointer items-center gap-2 text-[14.5px] font-medium text-gray-900 transition-opacity hover:opacity-80 dark:text-gray-300"
      >
        <Search className="h-4 w-4" />
        Search Products
      </Label>

      <div className="relative">
        <Input
          ref={inputRef}
          name="Search Products"
          id="search-products"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="What are you looking for today?"
          type="text"
          className="w-full"
          onFocus={() => setIsFocus(true)}
        />
        {searchValue.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSearchValue("");
            }}
            className="absolute top-1/2 right-4 flex size-5.5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-cyan-500 text-white transition-colors hover:bg-cyan-600/90 dark:bg-orange-500 dark:hover:bg-orange-600/90"
          >
            {" "}
            <X className="size-4.25" />{" "}
          </button>
        )}
      </div>
      {isFocus && productNames && productNames.length > 0 && (
        <div className="scrollbar-thin dark:scrollbar-thumb-orange-500 scrollbar-thumb-cyan-500 scrollbar-track-transparent bg-accent absolute z-10 mt-2 flex max-h-80 w-full flex-col gap-y-1.5 overflow-y-auto rounded-md border border-cyan-400 px-1.5 py-3 dark:border-orange-400">
          {productNames?.map((n) => {
            const last = lastSearch.some(
              (s) => s.toLowerCase() === n.toLowerCase(),
            );
            return (
              <div
                key={n}
                className="flex w-full items-center justify-between rounded px-4 text-sm font-medium text-black hover:bg-cyan-500/85 hover:text-white dark:text-white dark:hover:bg-orange-500/85"
              >
                <div
                  onClick={() => handleSearchClick(n)}
                  className="flex w-full cursor-default items-center gap-x-4 py-2"
                >
                  {last ? (
                    <History className="size-5 stroke-1" />
                  ) : (
                    <SearchIcon className="size-5 stroke-1" />
                  )}
                  <span className="line-clamp-1">{n}</span>
                </div>
                {last && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLastSearchRemove(n);
                    }}
                    className="cursor-pointer"
                  >
                    <X className="size-5 stroke-1" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
