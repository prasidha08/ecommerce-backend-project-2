import express, { NextFunction, Request, Response } from "express";
import AuthRouter from "./src/routers/auth.routes";
import AuthCategory from "./src/routers/category.routes";
import ProductRouter from "./src/routers/product.routes";
import ReviewRouter from "./src/routers/reviews.routes";
import CartRouter from "./src/routers/cart.routes";
import OrderRouter from "./src/routers/order.routes";
import FavRouter from "./src/routers/favourite.routes";

import cors from "cors";

const app = express();

app.use(
  cors({
    // Allow all origins (not recommended for production)
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use("/check", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Api is already to go",
    success: true,
  });
});

app.use(AuthRouter);

app.use(AuthCategory);

app.use(ProductRouter);

app.use(ReviewRouter);

app.use(CartRouter);

app.use(OrderRouter);

app.use(FavRouter);

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    message: "Route not found.",
    success: false,
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode ?? 500).json({
    message: err.message ?? "Some thing went wrong.",
    success: false,
  });
});

export = app;

// response == { message:"" ,data:[] , success:true}
