import { Router } from "express"
import { getAllProducts, getProduct, addToCart, removeFromCart, updateCart } from '../controllers/userProduct.controller'
import { adminAuth, userAuth } from "../middlewares/auth.middlewares"

const router = Router()

router.get("/all", getAllProducts)
router.get("/:id", getProduct)
router.post("/add-to-cart/:id", userAuth, addToCart)
router.put("/update-cart/:id", userAuth, updateCart)
router.delete("/remove-from-cart/:id", userAuth, removeFromCart)


export default router