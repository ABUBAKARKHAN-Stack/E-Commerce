import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { History, Search, SearchIcon, Timer, X } from 'lucide-react';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

type Props = {
    searchValue: string;
    setSearchValue: (value: string) => void;
    productNames?: string[];
}

const SearchBar: FC<Props> = ({
    searchValue,
    setSearchValue,
    productNames
}) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [lastSearch, setLastSearch] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const clickOutSide = (e: Event) => {
            if (inputRef.current && inputRef.current.contains(e.target as Node)) return;
            setIsFocus(false);
        }
        document.addEventListener("click", clickOutSide)

        return () => document.removeEventListener('click', clickOutSide)
    }, [isFocus])

    const getLastSearch = (): string[] => {
        const data = localStorage.getItem("last-search");
        return data ? JSON.parse(data) : [];
    };

    useEffect(() => {
        const lastSearchLs = getLastSearch();
        setLastSearch(lastSearchLs);
    }, []);



    const handleSearchClick = (n: string) => {
        setSearchValue(n)
        let lastSearchData = getLastSearch();
        lastSearchData = lastSearchData.filter((s) => s.toLowerCase() !== n.toLowerCase())
        lastSearchData = [...lastSearchData, n]
        setLastSearch(lastSearchData)
        localStorage.setItem('last-search', JSON.stringify(lastSearchData))
    }

    const handleLastSearchRemove = (n: string) => {
        let lastSearchData = getLastSearch();
        const index = lastSearchData.findIndex((s) => s.toLowerCase() === n.toLowerCase());
        if (index === -1) return;
        lastSearchData.splice(index, 1);
        setLastSearch(lastSearchData);
        localStorage.setItem('last-search', JSON.stringify(lastSearchData));
        inputRef.current?.focus();
        setIsFocus(true)
    }

    return (
        <div
            className="w-full max-w-[500px] relative">
            <Label htmlFor='search-products' className="flex items-center gap-2 text-[14.5px] font-medium text-gray-900 dark:text-gray-300 w-fit mb-1 cursor-pointer hover:opacity-80 transition-opacity">
                <Search className="w-4 h-4" />
                Search Products
            </Label>

            <div className='relative'>
                <Input
                    ref={inputRef}
                    name="Search Products"
                    id='search-products'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="What are you looking for today?"
                    type="text"
                    className="w-full"
                    onFocus={() => setIsFocus(true)}
                />
                {searchValue.length > 0 && <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setSearchValue("");
                    }}
                    className='absolute right-4 top-1/2 -translate-y-1/2 transition-colors size-5.5 dark:bg-orange-500 text-white dark:hover:bg-orange-600/90 bg-cyan-500 hover:bg-cyan-600/90 rounded-full cursor-pointer flex justify-center items-center '> <X className='size-4.25 ' /> </button>}

            </div>
            {isFocus && productNames && productNames.length > 0 && <div className='flex mt-2 absolute w-full max-h-80 overflow-y-auto scrollbar-thin dark:scrollbar-thumb-orange-500 scrollbar-thumb-cyan-500 scrollbar-track-transparent bg-accent z-10 flex-col gap-y-1.5 py-3 px-1.5 border dark:border-orange-400 border-cyan-400 rounded-md'>
                {
                    productNames?.map(((n) => {
                        const last = lastSearch.some((s) => s.toLowerCase() === n.toLowerCase());
                        return (
                            <div key={n}
                                className='dark:hover:bg-orange-500/85 hover:bg-cyan-500/85 font-medium dark:text-white text-black flex items-center justify-between w-full hover:text-white px-4  text-sm rounded'>
                                <div onClick={() => handleSearchClick(n)}
                                    className='flex cursor-default w-full py-2 items-center gap-x-4'>
                                    {last ? <History className='size-5 stroke-1' /> : <SearchIcon className='size-5 stroke-1' />}
                                    <span>{n}</span>
                                </div>
                                {last && <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLastSearchRemove(n)
                                    }}
                                    className='cursor-pointer'>
                                    <X

                                        className='size-5 stroke-1' />
                                </div>}
                            </div>
                        )
                    }))
                }

            </div>}

        </div>
    )
}

export default SearchBar