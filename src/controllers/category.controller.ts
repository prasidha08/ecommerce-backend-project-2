import { NextFunction, Request, Response } from "express";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json({
      message: "Category is created successfully.",
      success: true,
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

const getAllCategoriesByPublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json({
      message: "Fetched category successfully.",
      success: true,
      data: [],
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

const getAllCategoriesByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // fetch
    res.status(201).json({
      message: "Fetched category successfully.",
      success: true,
      data: [],
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

export = {
  createCategory,
  getAllCategoriesByPublic,
  getAllCategoriesByAdmin,
};
