import { Router } from "express";
import { getCartDetails, proceedToCheckout } from "../controllers/cart.controller";
import authCheck from "../middlewares/auth.middleware";

const router = Router();

router.get("/cart/details", authCheck, getCartDetails);
router.get("/cart/checkout", authCheck, proceedToCheckout);

export default router;