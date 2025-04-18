import express, { NextFunction, request, Request, Response } from "express";
import AuthRouter from "./src/routers/auth.routes";
import AuthCategory from "./src/routers/category.routes";

const app = express();

// router ...

app.use(express.json());

app.use(AuthRouter);

app.use(AuthCategory);

app.use((req: Request, res: Response, next: NextFunction) => {
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
