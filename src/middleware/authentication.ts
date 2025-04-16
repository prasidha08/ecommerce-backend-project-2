import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utility/auth.utility";
import { ErrorHandler } from "../utility/errorHandler";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ErrorHandler("Unauthorized user", 401); // unauthorized user 401
  }

  const isUserLoggedIn = verifyToken(token);
  console.log("🚀 ~ isUserLoggedIn:", isUserLoggedIn);

  if (!isUserLoggedIn) {
    throw new ErrorHandler("Token is expired", 403); // 403 forbidden
  }

  if (!req.body) {
    req.body = {};
  }
  req.body.user = isUserLoggedIn;

  console.log("hello");

  return next();
};
