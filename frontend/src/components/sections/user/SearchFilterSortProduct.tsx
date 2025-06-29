import { Input } from '@/components/ui/input';
import { FC, useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowDown01, ArrowDownAZ, Clock } from 'lucide-react';
import { Search, Filter, SortAsc } from "lucide-react";
import { formattedCategory } from '@/utils/formatters';
import { useProductContext } from '@/context/productContext';
import { useDebounce } from '@/hooks/useDebounce';


const SearchFilterSortProduct = () => {
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);


    const { getAllProducts, setProductsData , categories } = useProductContext();
    useEffect(() => {
        const queryParams: any = {};
        if (debouncedSearch) queryParams.search = debouncedSearch;
        if (category) queryParams.category = category;
        if (sortBy) queryParams.sortBy = sortBy;
        ; (async () => {
            const products = await getAllProducts(queryParams);
            setProductsData(products)
        }
        )();
    }, [debouncedSearch, category, sortBy]);


    return (

        <div className="w-full space-y-6">
            {/* Section Title */}
            <div className="flex items-center gap-2">
                <Filter className="size-8.5 text-gray-900 dark:text-white" />
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                    Explore & Refine Products
                </h2>
            </div>

            {/* Controls: Search, Filter, Sort */}
            <div className="flex flex-wrap justify-between gap-4 w-full">
                {/* Search */}
                <div className="flex-1 min-w-[250px]">
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

                {/* Filter */}
                <div className="flex-1 min-w-[250px]">
                    <Select onValueChange={(value) => setCategory(value)}>
                        <SelectLabel clickable>
                            <Filter className="w-4 h-4" />
                            Filter by Category
                        </SelectLabel>
                        <SelectTrigger className="w-full h-11">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                <SelectItem value=''>
                                    All
                                </SelectItem>
                                {
                                    categories?.map((c: string, i) => {
                                        let title = formattedCategory(c)
                                        return (
                                            <SelectItem value={c} key={i}>
                                                {title}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Sort */}
                <div className="flex-1 min-w-[250px]">
                    <Select onValueChange={(value) => setSortBy(value)}>
                        <SelectLabel clickable>
                            <SortAsc className="w-4 stroke-[2.5px] h-4" />
                            Sort Products
                        </SelectLabel>
                        <SelectTrigger className="w-full hover:bg h-11">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
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
            </div>
        </div>

    )
}

export default SearchFilterSortProduct