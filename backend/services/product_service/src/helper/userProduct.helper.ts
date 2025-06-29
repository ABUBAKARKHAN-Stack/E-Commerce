import { IProduct } from "../types/main.types";

function updateTotalRatingAndReviews(product: IProduct) {
    if (product.reviews.length > 0) {
        product.totalReviews = product.reviews.length;
        product.avgRating = product.reviews.reduce((acc, r) => (acc + r.rating), 0) / product.totalReviews;
        product.avgRating = Number(product.avgRating.toFixed(1));
        return;
    }
    product.totalReviews = 0;
    product.avgRating = 0;
}

const sortProducts = (products: IProduct[], sortBy: any) => {
    switch (sortBy) {
        case 'a-z': return [...products.sort((a, b) => a.name.localeCompare(b.name))]; //* Sort by name (ascending)
        case 'z-a': return [...products.sort((a, b) => b.name.localeCompare(a.name))]; //* Sort by name (descending)
        case 'newest': return [...products.sort((a, b) => {
            const aDate = new Date(a.createdAt ?? 0).getTime();
            const bDate = new Date(b.createdAt ?? 0).getTime();
            return bDate - aDate; //* Newest first
        })];
        case 'price-high-to-low': return [...products.sort((a, b) => b.price - a.price)];
        case 'price-low-to-high': return [...products.sort((a, b) => a.price - b.price)];
        default: return [...products]; //* No sorting
    }
};


export {
    updateTotalRatingAndReviews,
    sortProducts
};