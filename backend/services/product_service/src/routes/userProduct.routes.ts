import { Router } from "express"
import { getAllProducts, getProduct } from '../controllers/userProduct.controller'
import { userAuth } from "../middlewares/auth.middlewares"

const router = Router()

router.get("/all", getAllProducts)
router.get("/:id", userAuth, getProduct)

export default router