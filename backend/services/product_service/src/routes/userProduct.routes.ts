import { Router } from "express"
import {
    addToCart,
    categoryWithProduct,
    createReview,
    deleteReview,
    getAllProducts,
    getAllReviews,
    getCategories,
    getProduct,
    removeFromCart,
    topCategories,
    topProducts,
    updateCart,
    updateReview
} from '../controllers/userProduct.controller'
import { userAuth } from "../middlewares/auth.middlewares"

const router = Router()

// ✅ Product Routes
router.get("/all", getAllProducts);                 // Get all products
router.get("/categories", getCategories);           // Get all categories
router.get("/top-rated", topProducts);              
router.get('/top-categories', topCategories)            // Get top-rated products
router.get("/category/:name", categoryWithProduct); // Get products by category
router.get("/:id", getProduct);                     // Get single product by ID

// 🛒 Cart Routes (User Protected)
router.post("/add-to-cart/:id", userAuth, addToCart);               // Add to cart
router.put("/update-cart/:id", userAuth, updateCart);              // Update cart
router.delete("/remove-from-cart/:id", userAuth, removeFromCart);  // Remove from cart

// ✍️ Review Routes (User Protected)
router.post("/:productId/reviews", userAuth, createReview);        // Create review
router.put("/:productId/reviews", userAuth, updateReview);         // Update review
router.delete("/:productId/reviews", userAuth, deleteReview);      // Delete review
router.get("/:productId/reviews", getAllReviews);                  // Get all reviews


export default router