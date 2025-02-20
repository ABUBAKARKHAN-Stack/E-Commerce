import { Router } from "express";
import { getOrder,  } from "../controllers/order.controller";
import authCheck from "../middlewares/auth.middleware";


const  router = Router();
router.get("/", authCheck, getOrder);
export default router;