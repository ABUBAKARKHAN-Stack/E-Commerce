import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import authCheck from "../middlewares/auth.middleware";
import { createActivity } from "../controllers/activity.controller";

const router =  Router();

router.post('/create', authCheck , createActivity)

export default router