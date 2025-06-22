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


export {
    updateTotalRatingAndReviews
};