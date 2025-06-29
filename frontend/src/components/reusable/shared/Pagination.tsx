import React, { useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useAdminProductContext } from '@/context/adminProductContext'

const PaginationReusable = () => {
    // const { getAllProducts, productsData } = useAdminProductContext();
    // const [pages, setPages] = useState<number | null>(null);
    // const [limit, setLimit] = useState<number | null>(null);

    

    return (
        <Pagination className="mt-10">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>)
}

export default PaginationReusable