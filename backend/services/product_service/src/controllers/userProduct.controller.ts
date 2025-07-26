import expressAsyncHandler from "express-async-handler"
import productModel from "../models/product.model"
import { Request, Response } from "express"
import { ApiError, ApiResponse, publishEvent, subscribeToTopics } from '../utils'
import redisClient from "../config/redis.config"
import mongoose from "mongoose"
import { getAllRedisProducts, getProductbyId, invalidateProductCache } from "../helper/redisProduct.helper"
import { ActivityType, IProduct, IReviews, JwtUpdatedPayload } from "../types/main.types"
import { sortProducts, updateTotalRatingAndReviews } from "../helper/userProduct.helper"
import jwt from 'jsonwebtoken';
import { env } from "../config/env"



const getAllProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    const {
        category,
        search,
        minPrice,
        maxPrice,
        sortBy,
        limit,
        page
    } = req.query; //* Extract query parameters from URL

    let cachedProducts: IProduct[] = await getAllRedisProducts(); //* Fetch cached products from Redis

    //? Apply Pagination
    const pagination: any = {};
    if (limit) pagination.limit = +limit.toString();
    if (page) pagination.page = +page.toString();

    //? Make priceRange obj with type conversion into numbers
    const priceRange: any = {};
    if (minPrice) priceRange.minPrice = +minPrice;
    if (maxPrice) priceRange.maxPrice = +maxPrice;



    //? If cached products exist, apply filtering, searching, and sorting on them
    if (cachedProducts.length > 0) {
        console.log("🚀 Fetched products from cache");

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

        //* Apply Price Range Filter
        const { minPrice, maxPrice } = priceRange;

        if (minPrice && maxPrice) {
            cachedProducts = cachedProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
        } else if (minPrice) {
            cachedProducts = cachedProducts.filter(p => p.price >= minPrice)
        } else if (maxPrice) {
            cachedProducts = cachedProducts.filter(p => p.price <= maxPrice)
        }

        /*
           ? Helper function to sort products based on sortBy value
           * Apply sorting
        */
        cachedProducts = sortProducts(cachedProducts, sortBy);


        //* If no products match after filtering/sorting
        if (cachedProducts.length === 0) {
            throw new ApiError(404, "No products match your criteria");
        }
        let startIndex;
        let endIndex;
        if (pagination.page && pagination.limit) {
            startIndex = (pagination.page - 1) * pagination.limit
            endIndex = pagination.page * pagination.limit;
        }

        const paginatedProducts = cachedProducts.slice(startIndex, endIndex);

        console.log(paginatedProducts, startIndex, endIndex);



        //* Return final filtered and sorted products from cache
        res
            .status(200)
            .json(new ApiResponse(200, "Products fetched from cache", {
                products: paginatedProducts,
                totalProducts: cachedProducts.length
            }));
        return;
    }

    //* If no cache found, build MongoDB query and sort options
    const query: any = {};
    if (category) {
        category === 'all' ? {} : query.category = category;
    };
    if (search) query.name = { $regex: search, $options: 'i' }; //* Case-insensitive search

    if (priceRange.minPrice && priceRange.maxPrice) {
        query.price = { $gte: priceRange.minPrice, $lte: priceRange.maxPrice };
    } else if (priceRange.minPrice) {
        query.price = { $gte: priceRange.minPrice };
    } else if (priceRange.maxPrice) {
        query.price = { $lte: priceRange.maxPrice };
    }

    let sortOptions: any = {};
    if (sortBy === "newest") sortOptions.createdAt = -1;
    else if (sortBy === 'price-high-to-low') sortOptions.price = -1;
    else if (sortBy === "price-low-to-high") sortOptions.price = 1;
    else if (sortBy === 'z-a') sortOptions.name = -1;
    else if (sortBy === 'a-z') sortOptions.name = 1;


    //* Fetch products from DB with applied filters and sorting
    const products = await productModel
        .find(query)
        .sort(sortOptions)
        .limit(pagination.limit)
        .skip((pagination.page - 1) * pagination.limit);

    const totalProducts = await productModel.countDocuments(query)

    if (products.length === 0) {
        throw new ApiError(404, "Products not found");
    }


    //* Store fetched products in Redis cache for future use
    if (redisClient?.status === 'ready') {
        const fullFilteredProducts = await productModel
            .find(query)
            .sort(sortOptions)
        await redisClient?.set("products", JSON.stringify(fullFilteredProducts));
        await redisClient?.expire("products", 60 * 30); //* Cache for 30 minutes
    }

    //* Send DB products as response
    res
        .status(200)
        .json(new ApiResponse(200, "Products fetched successfully", {
            products,
            totalProducts
        }));
});


const getProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const cachedProduct = await getProductbyId(req.params.id);
    const token = req.cookies.userToken;
    let userId;


    if (token) {
        const decodedToken = jwt.verify(token, env.JWT_SECRET!) as JwtUpdatedPayload;
        userId = decodedToken.userId;
    }

    if (cachedProduct) {
        if (userId) {
            await publishEvent('activity.user.product.view', ActivityType.VIEW_PRODUCT, {
                userId: userId,
                activityType: ActivityType.VIEW_PRODUCT,
                activityDescription: `${cachedProduct.name} was viewed.`
            });
        }
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
    if (userId) {
        await publishEvent('activity.user.product.view', ActivityType.VIEW_PRODUCT, {
            userId: userId,
            activityType: ActivityType.VIEW_PRODUCT,
            activityDescription: `${product.name} was viewed.`
        });
    }

    res
        .status(200)
        .json(new ApiResponse(200, "Product fetched successfully", product))
})

const bulkProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    const { bulk_ids }: { bulk_ids: string[] } = req.body;

    if (!Array.isArray(bulk_ids) || bulk_ids.length === 0) {
        throw new ApiError(400, "Bulk Product IDs must be a non-empty array");
    }

    let cachedProducts: IProduct[] = await getAllRedisProducts();
    if (cachedProducts.length > 0) {
        cachedProducts = bulk_ids
            .map(id => cachedProducts.filter(p => p._id === id)).map((([p]) => p));
        if (cachedProducts.length > 0) {
            res
                .status(200)
                .json(new ApiResponse(200, "Bulk Products From cache", cachedProducts));
        }
        return;
    }
    const product = await productModel.find({
        _id: {
            $in: bulk_ids
        }
    }).lean()
    if (!product) {
        throw new ApiError(404, 'Products not found')
    }
    if (product.length === 0) {
        throw new ApiError(200, 'Products not available')

    }
    res
        .status(200)
        .json(new ApiResponse(200, "Bulk Products fetched", product))

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

    const product = await productModel.findById(productId).select("price quantity name");

    if (!product) {
        throw new ApiError(400, "Product not found or insufficient stock");
    }

    const cartedProductsPayload = {
        product: {
            productId: (product._id as mongoose.Types.ObjectId).toString(),
            price: product.price,
            quantity: +quantity,
        },
        userId,
    };

    try {
        await publishEvent("cart.create", "created_cart", cartedProductsPayload);
        await publishEvent('activity.user.cart.add', ActivityType.ADD_TO_CART, {
            userId: userId,
            activityType: ActivityType.ADD_TO_CART,
            activityDescription: `${product.name} was added to the cart.`,
            metaData: {
                productName: product.name,
                quantity
            }
        })
        console.log("Event published successfully", cartedProductsPayload)
    } catch (error) {
        console.error('Error publishing product created event:', error)
    }

    res
        .status(200)
        .json(new ApiResponse(200, `${product.name} added to your cart successfully!`,
            cartedProductsPayload
        ));

});

//* Remove from cart
const removeFromCart = expressAsyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { userId } = res.locals.user;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await productModel.findById(productId).select("name");

    if (!product) {
        throw new ApiError(400, "Product not found");
    }


    const cartedProducts = { productId, userId };

    try {
        await publishEvent("cart.remove.product", "removed_product", cartedProducts);
        await publishEvent('activity.user.cart.remove', ActivityType.REMOVE_FROM_CART, {
            userId: userId,
            activityType: ActivityType.REMOVE_FROM_CART,
            activityDescription: `${product.name} was removed from the cart.`,
        })
        console.log("✅ Event published successfully", cartedProducts);

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

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }
    const product = await productModel.findById(productId).select("name price quantity");

    if (!product) {
        throw new ApiError(400, "Product not found or insufficient stock");
    }


    const cartedProductsPayload = {
        product: {
            productId: (product._id as mongoose.Types.ObjectId).toString(),
            price: product.price,
            quantity: +quantity,
        },
        userId,
    };


    await publishEvent("cart.update", "updated_cart", cartedProductsPayload)
        .then(() => console.log("✅ Event published successfully", cartedProductsPayload))
        .catch((error) => console.error('Error publishing product created event:', error));

    res
        .status(200)
        .json(new ApiResponse(200, `${product.name} Quantity Updated Successfully`, product))
})

//? Review/Rating Controller Functions

//* Create Review
const createReview = expressAsyncHandler(async (req: Request, res: Response) => {
    const { rating, review } = req.body;
    const { productId } = req.params;


    if (!rating || !review) {
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
        review,
        rating
    } as IReviews)


    updateTotalRatingAndReviews(product);
    await product.save();

    invalidateProductCache(productId);

    await publishEvent('activity.user.review.write', ActivityType.WRITE_REVIEW, {
        userId,
        activityType: ActivityType.WRITE_REVIEW,
        activityDescription: `You wrote a review on ${product.name}.`
    })


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

    if (!updatedRating || !updatedReview) {
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

    await publishEvent('activity.user.review.delete', ActivityType.DELETE_REVIEW, {
        userId,
        activityType: ActivityType.DELETE_REVIEW,
        activityDescription: `You deleted your review on ${product.name}.`
    });

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
            rating: r.rating,
            createdAt: r.createdAt
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

//? Wishlist Controller Functions

//* Add Product into Wishlist 
const addToWishList = expressAsyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.body;
    const { user } = res.locals;


    if (!productId) {
        throw new ApiError(404, "Product ID is required.")
    }
    const userId = user.userId;

    if (!userId) {
        throw new ApiError(404, "User ID is required.")
    }

    const product = await productModel.findById(productId);

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    const wishlistPayload = {
        userId,
        productId
    }

    try {
        await publishEvent('add-to-wishlist', 'added-in-wishlist', wishlistPayload);
        await publishEvent('activity.user.wishlist.add', ActivityType.ADD_TO_WISHLIST, {
            userId: userId,
            activityType: ActivityType.ADD_TO_WISHLIST,
            activityDescription: `${product.name} was added to your wishlist.`
        })
        console.log('Add to Wishlist Event Send...');
    } catch (error) {
        throw new ApiError(402, "Failed to sent wishlist event.")
    }

    res
        .status(200)
        .json(new ApiResponse(200, "Product Added into wishlist", wishlistPayload));

})

//* Remove Product from Wishlist

const removeFromWishList = expressAsyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { user } = res.locals;


    if (!productId) {
        throw new ApiError(404, "Product ID is required.")
    }

    const product = await productModel.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found.");
    }
    const userId = user.userId;

    if (!userId) {
        throw new ApiError(404, "User ID is required.")
    }


    const wishlistPayload = {
        productId,
        userId
    }

    try {
        await publishEvent('remove-from-wishlist', 'removed-from-wishlist', wishlistPayload);
        await publishEvent('activity.user.wishlist.remove', ActivityType.REMOVE_FROM_WISHLIST, {
            userId: userId,
            activityType: ActivityType.REMOVE_FROM_WISHLIST,
            activityDescription: `${product.name} was removed from the wishlist.`
        })
        console.log('Remove from Wishlist Event Send...');
    } catch (error) {
        throw new ApiError(402, "Failed to sent wishlist event.")
    }

    res
        .status(200)
        .json(new ApiResponse(200, "Product Removed from wishlist", wishlistPayload));
})


export {
    getAllProducts,
    getProduct,
    bulkProducts,
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
    addToWishList,
    removeFromWishList
}