import { Router } from "express";
import { cancelOrder, completeCheckout, downloadOrderInvoice, getConfirmedOrder, getPendingOrder, getUserOrders, getUserSingleOrder } from "../controllers/order.controller";
import {
    userAuth
} from "../middlewares/auth.middleware";


const router = Router();
router.get("/pending", userAuth, getPendingOrder);
router.get("/confirmed", userAuth, getConfirmedOrder);
router.post('/complete-checkout', userAuth, completeCheckout);
router.get('/all-orders', userAuth, getUserOrders);
router.get('/:orderId', userAuth, getUserSingleOrder)
router.post('/cancel', userAuth, cancelOrder)
router.post('/invoice/download', downloadOrderInvoice)
export default router;