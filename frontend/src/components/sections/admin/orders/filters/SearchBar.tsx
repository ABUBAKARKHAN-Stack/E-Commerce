import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AdminOrderFiltersType, IOrder } from '@/types/main.types'
import { History, SearchIcon, X } from 'lucide-react'
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'

type Props = {
  setSearchOrderByCustomerName: Dispatch<SetStateAction<AdminOrderFiltersType>>;
  searchOrderByCustomerName: string;
  orders: IOrder[];
}

const SearchBar: FC<Props> = ({
  setSearchOrderByCustomerName,
  searchOrderByCustomerName,
  orders
}) => {

  const [uniqueFullNames, setUniqueFullNames] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [lastSearch, setLastSearch] = useState<string[]>([]);


  useEffect(() => {
    const clickOutSide = (e: Event) => {
      if (inputRef.current && inputRef.current.contains(e.target as Node))
        return;
      setIsFocus(false);
    };
    document.addEventListener("click", clickOutSide);

    return () => document.removeEventListener("click", clickOutSide);
  }, [isFocus]);



  useEffect(() => {
    setUniqueFullNames([...new Set(orders.map(({ shippingAddress }) => {
      return shippingAddress?.fullName;
    }).filter((name): name is string => !!name && name.trim() !== ""))])
  }, [
    orders
  ])

  const getLastSearch = (): string[] => {
    const data = localStorage.getItem("admin-last-search");
    return data ? JSON.parse(data) : [];
  };

  useEffect(() => {
    const lastSearchLs = getLastSearch();
    setLastSearch(lastSearchLs);
  }, []);

  const handleSearchClick = (n: string) => {
    setSearchOrderByCustomerName((prev) => ({ ...prev, searchOrderByCustomerName: n }));
    let lastSearchData = getLastSearch();
    lastSearchData = lastSearchData.filter(
      (s) => s.toLowerCase() !== n.toLowerCase(),
    );
    lastSearchData = [...lastSearchData, n];
    setLastSearch(lastSearchData);
    localStorage.setItem("admin-last-search", JSON.stringify(lastSearchData));
  };


  const handleLastSearchRemove = (n: string) => {
    let lastSearchData = getLastSearch();
    const index = lastSearchData.findIndex(
      (s) => s.toLowerCase() === n.toLowerCase(),
    );
    if (index === -1) return;
    lastSearchData.splice(index, 1);
    setLastSearch(lastSearchData);
    localStorage.setItem("admin-last-search", JSON.stringify(lastSearchData));
    inputRef.current?.focus();
    setIsFocus(true);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchOrderByCustomerName((prev) => ({ ...prev, searchOrderByCustomerName: value }));
  };
  


  return (
    <div className='max-w-lg relative w-full'>
      <Label
        htmlFor='search-orders'
        className="mb-1 flex w-fit cursor-pointer items-center gap-2 text-[14.5px] font-medium text-gray-900 transition-opacity hover:opacity-80 dark:text-gray-300"
      >
        <SearchIcon className='size-4.5' />
        Search Orders
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id='search-orders'
          placeholder='Search Orders By Customer Name'
          className='w-full'
          value={searchOrderByCustomerName}
          onChange={handleSearchChange}
          onFocus={() => setIsFocus(true)}
        />
        {searchOrderByCustomerName.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSearchOrderByCustomerName((prev) => {
                const newFilters = { ...prev, searchOrderByCustomerName: "" };
                const stored = localStorage.getItem("adminOrdersFilter/Sort");
                if (stored) {
                  const parsed = JSON.parse(stored);
                  delete parsed.customerName;
                  localStorage.setItem("adminOrdersFilter/Sort", JSON.stringify(parsed));
                }

                const event = new CustomEvent("clearCustomerSearch");
                window.dispatchEvent(event);

                return newFilters;
              });
            }}
            className="absolute top-1/2 right-4 flex size-5.5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-cyan-500 text-white transition-colors hover:bg-cyan-600/90 dark:bg-orange-500 dark:hover:bg-orange-600/90"
          >
            <X className="size-4.25" />
          </button>
        )}


      </div>
      {
        isFocus && <div className="scrollbar-thin w-full dark:scrollbar-thumb-orange-500 scrollbar-thumb-cyan-500 scrollbar-track-transparent dark:bg-[#18181b] backdrop-blur-xl shadow-xl bg-[#f8f7f7] absolute z-10 mt-2 flex max-h-80 flex-col gap-y-1.5 overflow-y-auto rounded-md border  px-1.5 py-3">
          {
            uniqueFullNames.length > 0 ? (uniqueFullNames.map((name) => {
              const isLast = lastSearch.some((s) => s === name);

              return (
                <button
                  key={name}
                  onClick={() => handleSearchClick(name)}
                  className="flex w-full items-center justify-between rounded px-4 text-sm font-medium text-black hover:bg-cyan-500/85 hover:text-white dark:text-white dark:hover:bg-orange-500/85"
                >
                  <div
                    className="flex w-full justify-between cursor-default items-center gap-x-4 py-2"
                  >

                    <div className='flex items-center gap-x-4'>
                      {isLast ? <History className="size-5 stroke-1" /> : <SearchIcon className="size-5 stroke-1" />}
                      <span className="line-clamp-1">{name}</span>
                    </div>
                    {isLast && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLastSearchRemove(name)
                        }}
                        className="cursor-pointer"
                      >
                        <X className="size-5 stroke-1" />
                      </button>
                    )}
                  </div>
                </button>
              )
            }
            )) : <div className="flex w-full flex-col items-center justify-center gap-y-2 py-6 text-center   text-sm text-gray-600 dark:text-gray-300">
              <SearchIcon className="size-6 opacity-60" />
              <span>No Customers Found</span>
              {searchOrderByCustomerName && (
                <p className="text-xs italic text-muted-foreground">
                  Searched for: <span className="font-medium text-black dark:text-white">{searchOrderByCustomerName}</span>
                </p>
              )}
            </div>

          }
        </div>
      }
    </div>
  )
}

export default SearchBar