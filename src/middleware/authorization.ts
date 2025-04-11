import { NextFunction, Request, Response } from "express";
import { ROLE } from "../model/user.model";

export const authorization = (roles: ROLE[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    console.log("🚀 ~ return ~ user:", user);

    if (roles.includes(user.role)) return next();

    throw new Error("403, cannot access the api.");
  };
};
