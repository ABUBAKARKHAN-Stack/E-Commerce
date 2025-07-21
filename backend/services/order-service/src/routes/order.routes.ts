import { Router} from "express";
import { completeCheckout,  getPendingOrder } from "../controllers/order.controller";
import authCheck from "../middlewares/auth.middleware";


const  router = Router();
router.get("/pending", authCheck, getPendingOrder);
router.post('/complete-checkout', authCheck, completeCheckout);
export default router;