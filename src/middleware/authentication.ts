import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utility/auth.utility";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("Unauthorized user"); // unauthorized user 401
  }

  const isUserLoggedIn = verifyToken(token);

  if (!isUserLoggedIn) {
    throw new Error("Token is expired"); // 403 forbidden
  }

  if (!req.body) {
    req.body = {};
  }
  req.body.user = isUserLoggedIn;

  console.log("hello");

  return next();
};
