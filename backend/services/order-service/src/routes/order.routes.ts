import { Router } from "express";
import { cancelOrder, completeCheckout, getConfirmedOrder, getPendingOrder, getUserOrders } from "../controllers/order.controller";
import authCheck from "../middlewares/auth.middleware";


const router = Router();
router.get("/pending", authCheck, getPendingOrder);
router.get("/confirmed", authCheck, getConfirmedOrder);
router.post('/complete-checkout', authCheck, completeCheckout);
router.get('/all-orders', authCheck, getUserOrders);
router.post('/cancel', authCheck, cancelOrder)
export default router;