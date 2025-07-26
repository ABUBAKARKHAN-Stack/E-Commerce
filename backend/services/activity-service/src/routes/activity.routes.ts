import { Request, Response, Router } from "express";
import authCheck from "../middlewares/auth.middleware";
import { getRecentActivity } from "../controllers/activity.controller";

const router = Router();

router.get('/recent', authCheck, getRecentActivity)

export default router