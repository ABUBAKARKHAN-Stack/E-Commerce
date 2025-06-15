import { Router } from "express"
import { getAllProducts, getProduct, addToCart, removeFromCart, updateCart, getCategories } from '../controllers/userProduct.controller'
import { userAuth } from "../middlewares/auth.middlewares"

const router = Router()

router.get("/all", getAllProducts)
router.get('/category', getCategories);
router.get("/:id", getProduct)
router.post("/add-to-cart/:id", userAuth, addToCart)
router.put("/update-cart/:id", userAuth, updateCart)
router.delete("/remove-from-cart/:id", userAuth, removeFromCart)


export default router