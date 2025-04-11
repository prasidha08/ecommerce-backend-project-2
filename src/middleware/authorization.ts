import { NextFunction, Request, Response } from "express";
import { ROLE } from "../model/user.model";
import { ErrorHandler } from "../utility/errorHandler";

export const authorization = (roles: ROLE[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;

    if (roles.includes(user.role)) return next();

    throw new ErrorHandler("403, cannot access the api.", 403);
  };
};
