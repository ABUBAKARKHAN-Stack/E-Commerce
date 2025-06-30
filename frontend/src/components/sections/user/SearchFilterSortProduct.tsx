import { Input } from '@/components/ui/input';
import { FC, useEffect, useId, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowDown01, ArrowDownAZ, Clock, DollarSign, X } from 'lucide-react';
import { Search, Filter, SortAsc } from "lucide-react";
import { formattedCategory } from '@/utils/formatters';
import { useProductContext } from '@/context/productContext';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import { ToolTip } from '@/components/reusable/shared';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { AnimatePresence, motion } from 'motion/react'
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


const SearchFilterSortProduct = () => {
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);
    const [category, setCategory] = useState<string>("all");
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState<string>("");
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { getAllProducts, setProductsData, categories } = useProductContext();

    const filterSort = async (params: any) => {
        const products = await getAllProducts(params);
        setProductsData(products)
    }

    useEffect(() => {
        console.log('hit1');

        const queryParamsLs = localStorage.getItem('filter/sort');
        const parsedQueryParamsLs = queryParamsLs ? JSON.parse(queryParamsLs) : {};
        if (Object.keys(parsedQueryParamsLs).length > 0) {
            filterSort(parsedQueryParamsLs);
            setSearch(parsedQueryParamsLs.search || '');
            setCategory(parsedQueryParamsLs.category || '');
            setSortBy(parsedQueryParamsLs.sortBy || '');
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        console.log('hit2');

        const queryParams: any = {};
        if (debouncedSearch) queryParams.search = debouncedSearch;
        if (category && category !== 'all') queryParams.category = category;
        if (sortBy) queryParams.sortBy = sortBy;

        localStorage.setItem('filter/sort', JSON.stringify(queryParams));
        filterSort(queryParams);

    }, [debouncedSearch, category, sortBy, isInitialized]);

    const getActiveFiltersCount = () => {
        let count = 0;
        if (debouncedSearch && debouncedSearch.trim()) count++;
        if (category && category !== 'all') count++;
        if (sortBy) count++;

        return count;
    }

    return (

        <div className="w-full space-y-6 bg-ornge-800">
            {/* Section Title */}
            <div className="flex items-center gap-2">
                <Filter className="size-8.5 text-gray-900 dark:text-white" />
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                    Explore & Refine Products
                </h2>
            </div>

            {/* Controls: Search, Filter, Sort */}
            <div className="flex  items-center justify-between gap-x-4 w-full">
                {/* Search */}
                <div className="w-full max-w-[500px]">
                    <label htmlFor='search-products' className="flex items-center gap-2 text-[14.5px] font-medium text-gray-900 dark:text-gray-300 mb-1 cursor-pointer hover:opacity-80 transition-opacity">
                        <Search className="w-4 h-4" />
                        Search Products
                    </label>
                    <Input
                        name="Search Products"
                        id='search-products'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="What are you looking for today?"
                        type="text"
                        className="w-full"
                    />
                </div>
                <ToolTip
                    triggerValue={
                        <Button onClick={() => setIsOpen(!isOpen)} className='size-14 relative mt-6.5'>
                            <div className='absolute top-0.5 border-0 right-0.5 size-5 bg-red-500  rounded-full'>
                                <span className='size-full text-[11px] font-bold text-center my-auto rounded-full'>{getActiveFiltersCount()}</span>
                            </div>
                            <Filter className='size-8' />
                        </Button>
                    }
                    tooltip={"Click to filter or sort products"}
                />
            </div>

            <AnimatePresence>
                {
                    isOpen && (
                        <div
                            className='max-w-100 rounded-lg overflow-hidden absolute right-0 z-50  w-full h-auto bg-transparent'
                        >
                            <motion.div
                                initial={{
                                    y: '-400px',
                                    opacity: 0
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1
                                }}
                                exit={{
                                    y: -400,
                                    opacity: 0
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}
                                className='h-full w-full max-h-96 overflow-y-scroll border-2 dark:border-orange-500 border-cyan-500 rounded-lg space-y-4 px-4 py-6 dark:bg-[#18181b]/90 bg-[#FAFAFA]/90 backdrop-blur-2xl  scrollbar-thin md:scrollbar scrollbar-corner-white dark:scrollbar-thumb-orange-500 scrollbar-thumb-cyan-500 scrollbar-track-transparent scrollbar-custom'>

                                <div className='flex justify-between dark:text-white text-gray-950 items-center'>
                                    <h2 className='tracking-wide font-bold text-lg'>Filter/Sort Products</h2>
                                    <Button
                                        onClick={() => setIsOpen(false)}
                                        variant={'outline'}>
                                        <X className='size-6' />
                                    </Button>
                                </div>
                                <Separator />

                                <div className='w-full space-y-3'>
                                    <div className='w-full space-y-1'>
                                        <h3 className='tracking-wide font-semibold text-base dark:text-white text-gray-950'>Filter By Category:</h3>
                                        <Separator className='w-full' />
                                    </div>
                                    <RadioGroup
                                        className="flex dark:text-gray-300 text-gray-900 gap-y-2 gap-x-2 flex-wrap"
                                        defaultValue={category || "all"}
                                        onValueChange={(value) => setCategory(value)}
                                    >
                                        {categories?.map((c: string, i: number) => {
                                            const title = formattedCategory(c);
                                            const id = `checkbox-${i}`;

                                            return (
                                                <div
                                                    key={id} className="flex items-center gap-x-2">
                                                    <label htmlFor={id} className="text-sm font-semibold">
                                                        {title}
                                                    </label>
                                                    <RadioGroupItem id={id} value={c} >
                                                        {title}
                                                    </RadioGroupItem>
                                                    {i < categories.length - 1 && (
                                                        <Separator orientation="vertical" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>
                                </div>
                                <Separator />

                                <div className='w-full space-y-3'>
                                    <div className='w-full space-y-1'>
                                        <h3 className='tracking-wide font-semibold text-base dark:text-white text-gray-950 flex items-center gap-x-2'>
                                            <DollarSign className="size-5 stroke-2" />
                                            Price Range
                                        </h3>
                                        <Separator className='w-full' />
                                    </div>

                                    <div className="w-full space-y-3">
                                        <div className='grid grid-cols-2 gap-x-3'>
                                            <div className="space-y-1">
                                                <Label
                                                    htmlFor='min-price'
                                                    className="text-sm font-medium dark:text-gray-300 text-gray-900">
                                                    Min Price
                                                </Label>
                                                <Input
                                                    id='min-price'
                                                    placeholder='0'
                                                    type='number'
                                                    min={0}
                                                    onChange={(e) => setMinPrice(e.target.value)}
                                                    value={minPrice}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label
                                                    htmlFor='max-price'
                                                    className="text-sm font-medium dark:text-gray-300 text-gray-900">
                                                    Max Price
                                                </Label>
                                                <Input
                                                    id='max-price'
                                                    placeholder="5000"
                                                    type='number'
                                                    min={0}
                                                    onChange={(e) => setMaxPrice(e.target.value)}
                                                    value={maxPrice}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-wrap">
                                            {
                                                [
                                                    { label: "Under $100", min: 0, max: 100 },
                                                    { label: "$100 - $500", min: 100, max: 500 },
                                                    { label: "$500 - $1000", min: 500, max: 1000 },
                                                    { label: "$1000+", min: 1000, max: null }
                                                ].map((preset, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => {
                                                            setMinPrice(preset.min + "");
                                                            setMaxPrice(preset.max + "");
                                                        }}
                                                        className="px-3 py-1.5 text-xs font-medium rounded-full border dark:border-orange-500/50 border-cyan-500/50 dark:text-orange-400 text-cyan-600 hover:dark:bg-orange-500/10 hover:bg-cyan-500/10 transition-colors"

                                                    >
                                                        {preset.label}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Separator />

                                <div className='w-full space-y-3'>
                                    <div className='w-full space-y-1'>
                                        <div className='tracking-wide font-semibold text-base flex items-center gap-x-2 dark:text-white text-gray-950'>
                                            <SortAsc className="size-5 stroke-2" />
                                            <span>Sort Products:</span>
                                        </div>
                                        <Separator className='w-full' />
                                    </div>
                                    <Select onValueChange={(value) => setSortBy(value)}>
                                        <SelectTrigger className="w-full h-11">
                                            <SelectValue placeholder={sortBy.toUpperCase() || 'Sort by'} />
                                        </SelectTrigger>
                                        <SelectContent className='relative'>
                                            {/* Newest */}
                                            <SelectGroup>
                                                <SelectLabel className="flex gap-x-1 items-center">
                                                    <Clock className="size-4 stroke-3" />
                                                    Date
                                                </SelectLabel>
                                                <SelectItem value="newest">Newest Arrivals</SelectItem>
                                            </SelectGroup>

                                            {/* Price */}
                                            <SelectGroup>
                                                <SelectLabel className="flex gap-x-1 items-center">
                                                    <ArrowDown01 className="size-4 stroke-3" />
                                                    Price
                                                </SelectLabel>
                                                <SelectItem value="price-low-to-high">Low to High</SelectItem>
                                                <SelectItem value="price-high-to-low">High to Low</SelectItem>
                                            </SelectGroup>

                                            {/* Name */}
                                            <SelectGroup>
                                                <SelectLabel className="flex gap-x-1 items-center">
                                                    <ArrowDownAZ className="size-4 stroke-3" />
                                                    Name
                                                </SelectLabel>
                                                <SelectItem value="a-z">A to Z</SelectItem>
                                                <SelectItem value="z-a">Z to A</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button className='rounded-none w-full'>
                                    Remove All Filters
                                </Button>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >
        </div >

    )
}

export default SearchFilterSortProduct