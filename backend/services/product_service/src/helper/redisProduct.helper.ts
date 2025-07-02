import redisClient from "../config/redis.config";

/*
 * Add a new product to Redis (push to existing array)
 */
export const addProduct = async (product: any) => {
    try {
        const products = await redisClient.get("products");
        const parsedProducts = products ? JSON.parse(products) : [];

        // Add new product
        parsedProducts.push(product);

        await redisClient.set("products", JSON.stringify(parsedProducts));
        console.log("Product added to Redis");
    } catch (error) {
        console.error("Error adding product to Redis:", error);
        throw error;
    }
};

/*
 * Remove a product from Redis by ID
 */
export const removeProduct = async (productId: string) => {
    try {
        const products = await redisClient.get("products");
        if (!products) return;

        const parsedProducts = JSON.parse(products);
        const updatedProducts = parsedProducts.filter(
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
export const updateProduct = async (productId: string, updatedProduct: any) => {

    try {
        const products = await redisClient.get("products");
        if (!products) return;

        let parsedProducts = JSON.parse(products);
        parsedProducts = parsedProducts.filter((product: any) => product._id !== productId)
        parsedProducts.push(updatedProduct)
        await redisClient.set("products", JSON.stringify(parsedProducts));
    } catch (error) {
        console.error("Error updating product in Redis:", error);
        throw error;
    }
};

/*
 * Get all products from Redis
 */
export const getAllRedisProducts = async () => {
    if (!redisClient || redisClient.status !== 'ready') {
        console.log("⚠️ Redis not ready. Skipping getAllRedisProducts.");
        return [];
    }
    try {
        const products = await redisClient?.get("products");
        return products ? JSON.parse(products) : [];
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
        const product = await redisClient.get(`product:${productId}`);
        if (!product) return;
        const parsedProduct = JSON.parse(product);
        return parsedProduct;
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