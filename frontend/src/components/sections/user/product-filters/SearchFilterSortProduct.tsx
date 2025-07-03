import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Filter, } from "lucide-react";
import { useProductContext } from '@/context/productContext';
import { useDebounce } from '@/hooks/useDebounce';
import { getQueryParams } from '@/utils/getQueryParams';
import SearchBar from './SearchBar';
import FilterToggleButton from './FilterToggleButton';
import FilterPanel from './FilterPanel';
import { Pagination } from '@/components/reusable/shared';

type Props = {
    limit: number;
    setLimit: Dispatch<SetStateAction<number>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;

}

const SearchFilterSortProduct: FC<Props> = ({
    limit,
    setLimit,
    page,
    setPage
}) => {
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("all");
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState<string>("");
    const [filterCount, setFilterCount] = useState<number>(0);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const debouncedSearch = useDebounce(search, 500);
    const debouncedMinPrice = useDebounce(minPrice, 500);
    const debouncedMaxPrice = useDebounce(maxPrice, 500);


    const { getAllProducts, setProductsData, categories, productsData } = useProductContext();

    const filterSort = async (params: any) => {
        const products = await getAllProducts(params);
        setProductsData(products);
    }

    const handleFilterRemove = () => {
        localStorage.removeItem('filter/sort');
        setFilterCount(0);
        setCategory("all");
        setSortBy("");
        setMinPrice("");
        setMaxPrice("");
    }

    useEffect(() => {
        const queryParamsLs = localStorage.getItem('filter/sort');
        const parsedQueryParamsLs = queryParamsLs ? JSON.parse(queryParamsLs) : {};
        if (Object.keys(parsedQueryParamsLs).length > 0) {
            filterSort(parsedQueryParamsLs);
            setSearch(parsedQueryParamsLs.search || '');
            setCategory(parsedQueryParamsLs.category || '');
            setSortBy(parsedQueryParamsLs.sortBy || '');
            setMinPrice(parsedQueryParamsLs.minPrice || 0);
            setMaxPrice(parsedQueryParamsLs.maxPrice || 0)
        }
        setIsInitialized(true);
    }, []);

    const queryParams = useMemo(() => {
        return getQueryParams({
            search: debouncedSearch,
            category,
            minPrice: debouncedMinPrice,
            maxPrice: debouncedMaxPrice,
            sortBy,
            limit,
            page
        });
    }, [
        debouncedSearch,
        debouncedMinPrice,
        debouncedMaxPrice,
        category,
        sortBy,
        page
    ])



    useEffect(() => {
        if (!isInitialized) return;
        getActiveFiltersCount();
        localStorage.setItem('filter/sort', JSON.stringify({
            search: queryParams.search,
            category: queryParams.category,
            minPrice: queryParams.minPrice,
            maxPrice: queryParams.maxPrice,
            sortBy: queryParams.sortBy
        }));
        filterSort(queryParams);
    }, [
        debouncedSearch,
        debouncedMinPrice,
        debouncedMaxPrice,
        category,
        sortBy,
        page,
        isInitialized
    ]);

    const getActiveFiltersCount = () => {
        let count = 0;
        if (debouncedSearch && debouncedSearch.trim()) count++;
        if (category && category !== 'all') count++;
        if (sortBy) count++;
        if (debouncedMinPrice && debouncedMaxPrice) {
            count++;
        } else if (debouncedMinPrice) {
            count++;
        } else if (debouncedMaxPrice) {
            count++;
        }
        setFilterCount(count);
    }

    return (
        <div className="w-full space-y-6">

            {/* Section Title */}
            <div className="flex items-center gap-2">
                <Filter className="size-8.5 text-gray-900 dark:text-white" />
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                    Explore & Refine Products
                </h2>
            </div>

            <div className="flex items-center justify-between gap-x-4 w-full">

                {/* Search Component */}
                <SearchBar
                    searchValue={search}
                    setSearchValue={setSearch}
                    productNames={productsData?.map(p => p.name)}
                />

                {/* Filter Panel Toggle Button Component */}
                <FilterToggleButton
                    isOpenToggle={isOpen}
                    setIsOpenToggle={setIsOpen}
                    filterCount={filterCount}
                />
            </div>

            {/* Filter Panel Component */}
            <FilterPanel
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                categories={categories}
                category={category}
                setCategory={setCategory}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filterCount={filterCount}
                onFilterRemove={handleFilterRemove}
            />

        </div >

    )
}

export default SearchFilterSortProduct