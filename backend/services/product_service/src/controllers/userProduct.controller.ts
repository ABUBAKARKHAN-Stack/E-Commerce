import expressAsyncHandler from "express-async-handler"
import productModel from "../models/product.model"
import { Request, Response } from "express"
import { ApiError, ApiResponse, publishEvent, subscribeToTopics } from '../utils'
import redisClient from "../config/redis.config"
import mongoose from "mongoose"
import { getAllRedisProducts, getProductbyId, invalidateProductCache } from "../helper/redisProduct.helper"
import { IProduct, IReviews } from "../types/main.types"
import { sortProducts, updateTotalRatingAndReviews } from "../helper/userProduct.helper"


const getAllProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    const {
        category,
        search,
        sortBy,
        limit,
        page
    } = req.query; //* Extract query parameters from URL

    let cachedProducts: IProduct[] = await getAllRedisProducts(); //* Fetch cached products from Redis

    //? Apply Pagination
    const pagination: any = {};
    if (limit) pagination.limit = +limit.toString();
    if (page) pagination.page = +page.toString();

    //? If cached products exist, apply filtering, searching, and sorting on them
    if (cachedProducts.length > 0) {
        console.log("🚀 Fetched products from cache");
        const totalCachedProducts = cachedProducts.length;

        //* Apply search filter (case-insensitive)
        if (search) {
            const searchedWords = search.toString().toLowerCase();
            cachedProducts = cachedProducts.filter((p) =>
                p.name.toLowerCase().includes(searchedWords)
            );
        }

        //* Apply category filter
        if (category) {
            if (category === 'all') {
                cachedProducts = cachedProducts;
            } else {
                cachedProducts = cachedProducts.filter((p) => p.category === category);
            }
        }

        /*
           ? Helper function to sort products based on sortBy value
           * Apply sorting
        */
        cachedProducts = sortProducts(cachedProducts, sortBy);


        let startIndex: number;
        let endIndex: number;
        startIndex = (pagination.page - 1) * pagination.limit;
        endIndex = pagination.page * pagination.limit;

        if (startIndex || endIndex) {
            cachedProducts = cachedProducts.slice(startIndex, endIndex);
        }

        //* If no products match after filtering/sorting
        if (cachedProducts.length === 0) {
            throw new ApiError(404, "No products match your criteria");
        }

        //* Return final filtered and sorted products from cache
        res
            .status(200)
            .json(new ApiResponse(200, "Products fetched from cache", {
                products: cachedProducts,
                // totalProducts: totalCachedProducts
            }));
        return;
    }

    //* If no cache found, build MongoDB query and sort options
    const query: any = {};
    if (category) {
        category === 'all' ? {} : query.category = category;
    };
    if (search) query.name = { $regex: search, $options: 'i' }; //* Case-insensitive search

    let sortOptions: any = {};
    if (sortBy === "newest") sortOptions.createdAt = -1;
    else if (sortBy === 'price-high-to-low') sortOptions.price = -1;
    else if (sortBy === "price-low-to-high") sortOptions.price = 1;
    else if (sortBy === 'z-a') sortOptions.name = -1;
    else if (sortBy === 'a-z') sortOptions.name = 1;

    console.log(query);

    //* Fetch products from DB with applied filters and sorting
    const products = await productModel
        .find(query)
        .sort(sortOptions)
        .limit(pagination.limit)
        .skip((pagination.page - 1) * pagination.limit)

    if (products.length === 0) {
        throw new ApiError(404, "Products not found");
    }

    const totalProducts = await productModel.countDocuments(query);

    //* Store fetched products in Redis cache for future use
    await redisClient.set("products", JSON.stringify(products));
    await redisClient.expire("products", 60 * 30); //* Cache for 30 minutes

    //* Send DB products as response
    res
        .status(200)
        .json(new ApiResponse(200, "Products fetched successfully", { products }));
});


const getProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const cachedProduct = await getProductbyId(req.params.id)
    if (cachedProduct) {
        console.log("🚀 Fetched product from cache");
        res
            .status(200)
            .json(new ApiResponse(200, "Product fetched successfully from cache", cachedProduct))
        return;
    }
    const product = await productModel.findById(req.params.id)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }
    await redisClient.set(`product:${product._id}`, JSON.stringify(product));
    await redisClient.expire(`product:${product._id}`, 60 * 30);

    res
        .status(200)
        .json(new ApiResponse(200, "Product fetched successfully", product))
})

//? Category Controller Functions

//* Get All Categories
const getCategories = expressAsyncHandler(async (req: Request, res: Response) => {
    const cachedProducts = await getAllRedisProducts();
    if (cachedProducts.length > 0) {
        const categories = [...new Set(cachedProducts.map((p: IProduct) => p.category))];
        categories.unshift('all');
        res
            .status(200)
            .json(new ApiResponse(200, "Categories Fetched from cache", categories));
        console.log("Categories Fetched from cache");
        return;
    }

    const products = await productModel
        .find()
        .lean();
    if (products.length === 0) {
        res
            .status(400)
            .json(new ApiResponse(400, 'failed to fetch categories',))
        return;
    }
    let categories = [...new Set(products.map((p) => p.category))]
    categories.unshift('all')


    res
        .status(200)
        .json(new ApiResponse(200, "Categories Fetched", categories))
})

//* Category with Products
const categoryWithProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const { name } = req.params;
    if (!name) {
        throw new ApiError(400, "Category name is required");
    }
    const products = await productModel.find({
        category: name
    })

    if (products.length === 0) {
        throw new ApiError(400, "No Products Available in this category");
    }
    res
        .status(200)
        .json(new ApiResponse(200, "Category with products fetched", products))
})

//* Top Categories
const topCategories = expressAsyncHandler(async (req: Request, res: Response) => {

    const products = await productModel
        .find({
            avgRating: { $gte: 4 }
        })
        .lean()

    if (products.length === 0) {
        res
            .status(200)
            .json(new ApiResponse(200, "No Top Categories Available"));
        return;
    }

    const categories = [...new Set(products.map((p) => p.category))];

    res
        .status(200)
        .json(new ApiResponse(200, "Top Categories Fetched", categories))

})


//? Cart Controller Functions

//* Add to cart
const addToCart = expressAsyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { userId } = res.locals.user;
    const { quantity } = req.body;

    if (quantity <= 0) {
        throw new ApiError(400, "Quantity must be greater than 0");
    }

    const product = await productModel.findOneAndUpdate(
        { _id: productId, quantity: { $gte: quantity } },
        { $inc: { quantity: -quantity } },
        { new: true }
    ).select("name price quantity thumbnails");

    if (!product) {
        throw new ApiError(400, "Product not found or insufficient stock");
    }

    const cartedProducts = {
        product: {
            productId: (product._id as mongoose.Types.ObjectId).toString(),
            name: product.name,
            price: product.price,
            quantity,
            thumbnail: product.thumbnails[0],
        },
        userId,
    };

    // ✅ Send response before publishing event
    res.status(200).json(new ApiResponse(200, "Product added to cart successfully", cartedProducts));

    publishEvent("cart-creation", "created_cart", cartedProducts)
        .then(() => console.log("Event published successfully", cartedProducts))
        .catch((error) => console.error('Error publishing product created event:', error));
});

//* Remove from cart
const removeFromCart = expressAsyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { userId } = res.locals.user;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const cartedProducts = { productId, userId };

    try {
        // Publish event to Kafka
        await publishEvent("product-removal", "removed_product", cartedProducts);
        console.log("✅ Event published successfully", cartedProducts);

        // Respond immediately (error handling is done asynchronously)
        res
            .status(202)
            .json(new ApiResponse(202, "Product removal request sent"));
    } catch (error) {
        console.error("🚨 Error in product removal:", error);
        throw new ApiError(500, "Error processing removal request")
    }
});

//* Update Cart
const updateCart = expressAsyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { userId } = res.locals.user;
    const { quantity } = req.body;

    if (quantity <= 0) {
        throw new ApiError(400, "Quantity must be greater than 0");
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }
    const product = await productModel.findOneAndUpdate(
        { _id: productId, quantity: { $gte: quantity } },
        { $inc: { quantity: -quantity } },
        { new: true }
    ).select("name price quantity thumbnails");

    if (!product) {
        throw new ApiError(400, "Product not found or insufficient stock");
    }

    const cartedProducts = {
        product: {
            productId: (product._id as mongoose.Types.ObjectId).toString(),
            name: product.name,
            price: product.price,
            quantity,
            thumbnail: product.thumbnails[0],
        },
        userId,
    };

    await publishEvent("cart-update", "updated_cart", cartedProducts)
        .then(() => console.log("✅ Event published successfully", cartedProducts))
        .catch((error) => console.error('Error publishing product created event:', error));

    res
        .status(200)
        .json(new ApiResponse(200, "Product updated successfully", product))
})

//? Review/Rating Controller Functions

//* Create Review
const createReview = expressAsyncHandler(async (req: Request, res: Response) => {
    const { rating, review } = req.body;
    const { productId } = req.params;


    if (!rating) {
        throw new ApiError(400, "Please provide a rating to submit your review.");
    }

    const { user } = res.locals;
    const userId = user.userId;
    const product = await productModel.findById(productId);


    if (!product) {
        throw new ApiError(404, "Product not found");
    };

    const alreadyReviewed = product.reviews.find((r) => r.userId === userId);

    if (alreadyReviewed) {
        res
            .status(400)
            .json(new ApiError(400, "You have already reviewed this product."));
        return;
    }

    product.reviews.push({
        userId,
        review: review,
        rating
    } as IReviews)


    updateTotalRatingAndReviews(product);
    await product.save();

    invalidateProductCache(productId);

    res
        .status(200)
        .json(new ApiResponse(200, "Review Added Successfully", {
            total_reviews: product.totalReviews,
            avg_rating: product.avgRating
        }))
})

//* Update Review
const updateReview = expressAsyncHandler(async (req: Request, res: Response) => {
    const { updatedReview, updatedRating } = req.body;
    const { productId } = req.params;

    if (!updatedRating) {
        throw new ApiError(400, "Rating is required to update the review.");
    }

    const { user } = res.locals;
    const userId = user.userId;

    const product = await productModel.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    const reviewToBeUpdate = product.reviews.find((r) => r.userId === userId);

    if (!reviewToBeUpdate) {
        throw new ApiError(404, "You have not submitted a review for this product.");
    }

    reviewToBeUpdate.review = updatedReview;
    reviewToBeUpdate.rating = updatedRating;

    updateTotalRatingAndReviews(product);

    await product.save();

    invalidateProductCache(productId);

    res
        .status(200)
        .json(new ApiResponse(200, "Review updated successfully.", {
            total_reviews: product.totalReviews,
            avg_rating: product.avgRating
        }));
});

//* Delete Review
const deleteReview = expressAsyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { user } = res.locals;
    const userId = user.userId;

    const product = await productModel.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const reviewIndex = product.reviews.findIndex((r) => r.userId === userId);
    if (reviewIndex === -1) {
        throw new ApiError(400, "You have not submitted a review for this product yet.");
    }

    product.reviews.splice(reviewIndex, 1);
    updateTotalRatingAndReviews(product);
    await product.save();

    invalidateProductCache(productId);

    res
        .status(200)
        .json(new ApiResponse(200, "Review deleted successfully", {
            total_reviews: product.totalReviews,
            avg_rating: product.avgRating
        }));

})

//* Get Reviews
const getAllReviews = expressAsyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const reviews = product.reviews.map((r) => {
        return {
            review: r.review,
            rating: r.rating
        }
    })

    if (reviews.length === 0) {
        res
            .status(200)
            .json(new ApiResponse(200, "No reviews yet for this product.", []));
        return;
    }

    res
        .status(200)
        .json(new ApiResponse(200, "Reviews Fetched", reviews))

})

//* Get Top Ratted Products 
const topProducts = expressAsyncHandler(async (req: Request, res: Response) => {

    const cacheKey = "top-products";
    const cached = await redisClient.get(cacheKey);

    if (cached) {
        console.log("🚀 Top products fetched from cache");

        const products = JSON.parse(cached);
        res
            .status(200)
            .json(new ApiResponse(200, "Top Rated Products (from cache)", products));
        return;


    }

    const products = await productModel
        .find({
            avgRating: { $gte: 4 }
        })
        .sort({
            avgRating: -1
        })
        .limit(5)
        .lean();

    if (products.length === 0) {
        res
            .status(200)
            .json(new ApiResponse(200, "Currently No Products Available"));
        return;
    }

    await redisClient.set(cacheKey, JSON.stringify(products));
    await redisClient.expire(cacheKey, 60 * 15)

    res
        .status(200)
        .json(new ApiResponse(200, "Top Rated Products", products));

})



export {
    getAllProducts,
    getProduct,
    addToCart,
    updateCart,
    removeFromCart,
    getCategories,
    categoryWithProduct,
    topCategories,
    createReview,
    updateReview,
    deleteReview,
    getAllReviews,
    topProducts,
}