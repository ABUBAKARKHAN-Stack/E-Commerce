import { IProduct } from "../types/main.types";
import redisClient from "../config/redis.config";

/*
 * Add a new product to Redis (push to existing array)
 */
export const addProduct = async (product: IProduct) => {

    try {
        const products: IProduct[] | null = await redisClient.get("products");
        const updatedProducts = products ? [...products, product] : [product];
        await redisClient.set("products", updatedProducts);
        console.log("✅ Product added to Redis");
    } catch (error) {
        console.error("❌ Error adding product to Redis:", error);
        throw error;
    }
};

/*
 * Remove a product from Redis by ID
 */
export const removeProduct = async (productId: string) => {
    try {
        const products: IProduct[] | null = await redisClient.get("products");
        if (!products) return;

        const updatedProducts = products.filter(
            (product: any) => product._id !== productId
        );

        await redisClient.set("products", JSON.stringify(updatedProducts));
        console.log("Product removed from Redis");
    } catch (error) {
        console.error("Error removing product from Redis:", error);
        throw error;
    }
};

/*
 * Update a product in Redis by ID
 */
export const updateProduct = async (productId: string, updatedProduct: IProduct) => {
    try {
        let products: IProduct[] | null = await redisClient.get("products");
        if (!products) return;

        products = products.filter((product) => product._id !== productId);
        products.push(updatedProduct);

        await redisClient.set("products", products);
        console.log("✅ Product updated in Redis");
    } catch (error) {
        console.error("❌ Error updating product in Redis:", error);
        throw error;
    }
};


/*
 * Get all products from Redis
 */
export const getAllRedisProducts = async () => {

    if (!redisClient) {
        console.log("⚠️ Redis not ready. Skipping getAllRedisProducts.");
        return [];
    }
    try {
        const products:IProduct[] | null = await redisClient?.get("products");
        if (!products) return [];
        return products;
    } catch (error) {
        console.error("Error fetching products from Redis:", error);
        throw error;
    }
};

/*
 * Get a product from Redis by ID
 * @param productId
 */
export const getProductbyId = async (productId: string) => {
    try {
        const product: IProduct | null = await redisClient.get(`product:${productId}`);
        if (!product) return;
        return product;
    } catch (error) {
        console.error("Error fetching product from Redis:", error);
        throw error;
    }
}


/*
 * Invalidate product from Redis by ID
 * @param productId
 */
export const invalidateProductCache = async (productId: string) => {
    await redisClient.del("products");
    await redisClient.del('top-products');
    await redisClient.del(`product:${productId}`);
};