import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { FC } from 'react'
import CategoryFilter from './CategoryFilter'
import PriceRange from './PriceRange'
import SortSelector from './SortSelector'

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    categories: string[] | null;
    category: string;
    setCategory: (val: string) => void;
    minPrice: string;
    setMinPrice: (price: string) => void;
    maxPrice: string;
    setMaxPrice: (price: string) => void;
    sortBy: string;
    setSortBy: (val: string) => void;
    filterCount: number;
    onFilterRemove: () => void;
}

const FilterPanel: FC<Props> = ({
    isOpen,
    setIsOpen,
    categories,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    filterCount,
    onFilterRemove
}) => {
    return (
        <AnimatePresence>
            {
                isOpen && (
                    <div
                        className='max-w-120 rounded-lg overflow-hidden absolute right-0 z-50  w-full h-auto bg-transparent'
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
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
                                duration: 0.35,
                                ease: "easeInOut",
                            }}
                            className='h-full w-full max-h-96 overflow-y-scroll border-2 dark:border-orange-500 border-cyan-500 rounded-lg space-y-4 px-4 py-6 bg-accent scrollbar-thin md:scrollbar scrollbar-corner-white dark:scrollbar-thumb-orange-500 scrollbar-thumb-cyan-500 scrollbar-track-transparent scrollbar-custom'>

                            <div className='flex justify-between dark:text-white text-gray-950 items-center'>
                                <h2 className='tracking-wide font-bold text-lg'>Filter/Sort Products</h2>
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    size={"icon"}
                                >
                                    <X className='size-6' />
                                </Button>
                            </div>
                            <Separator
                                className='bg-accent-foreground/10'
                            />

                            <CategoryFilter
                                categories={categories}
                                categoryValue={category}
                                setCategoryValue={setCategory}
                            />
                            <Separator
                                className='bg-accent-foreground/10'
                            />

                            <PriceRange
                                minPriceValue={minPrice}
                                setMinPriceValue={setMinPrice}
                                maxPriceValue={maxPrice}
                                setMaxPriceValue={setMaxPrice}
                            />
                            <Separator
                                className='bg-accent-foreground/10'
                            />


                            <SortSelector
                                sortByValue={sortBy}
                                setSortByValue={setSortBy}
                            />

                            <Button
                                onClick={onFilterRemove}
                                className='rounded-none transition-colors ease-linear text-base px-4 py-5'>
                                Remove All Filters{filterCount > 0 && <span className='size-6 flex justify-center items-center dark:bg-orange-200 dark:text-orange-600 bg-cyan-200 text-cyan-600 font-bold  rounded-full'>{filterCount}</span>}
                            </Button>
                        </motion.div>
                    </div>
                )
            }
        </AnimatePresence>
    )
}

export default FilterPanel