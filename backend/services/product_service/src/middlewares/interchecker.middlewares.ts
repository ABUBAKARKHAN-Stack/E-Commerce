import { Request, Response, NextFunction } from "express";
import isOnline from "is-online";
import { ApiError } from "../utils";

 const internetCheck = async(req: Request, res: Response, next: NextFunction) => {
 
    const online = await isOnline();
    if (!online) { 
      return next(new ApiError(503,"Internet connection is lost. Please try again later."));
    }
    next();
  
}

export {
    internetCheck
}
