import { Router} from "express";
import { completeCheckout,  getConfirmedOrder,  getPendingOrder } from "../controllers/order.controller";
import authCheck from "../middlewares/auth.middleware";


const  router = Router();
router.get("/pending", authCheck, getPendingOrder);
router.get("/confirmed", authCheck, getConfirmedOrder);
router.post('/complete-checkout', authCheck, completeCheckout);
export default router;