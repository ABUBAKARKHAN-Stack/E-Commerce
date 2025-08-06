import { Router } from "express";
import { adminAuth } from "../middlewares/auth.middleware";
import {
    cancelOrder,
    getAllOrder,
    getSingleOrder,
    markOrderAsDelivered,
    markOrderAsProcessing,
    markOrderAsShipped
} from "../controllers/adminOrder.controller";

const router = Router();

router.get('/orders', adminAuth, getAllOrder)
router.get('/orders/:orderId', adminAuth, getSingleOrder)
router.get('/mark-as/processing/:orderId', adminAuth, markOrderAsProcessing)
router.get('/mark-as/shipped/:orderId', adminAuth, markOrderAsShipped)
router.get('/mark-as/delivered/:orderId', adminAuth, markOrderAsDelivered);
router.post('/cancel-order', adminAuth, cancelOrder)

export default router;
