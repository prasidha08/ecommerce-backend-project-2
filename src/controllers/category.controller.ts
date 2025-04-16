import { NextFunction, Request, Response } from "express";
import { CategoryZodType } from "../types/category";
import { CategoryModel } from "../model/category.model";
import { ErrorHandler } from "../utility/errorHandler";

type ParamType = {
  page: number;
  pageLimit: number;
  search?: string;
};

// aggregate pipeline

function fetchCategories({ page, pageLimit, search }: ParamType) {
  let query = {};

  if (search) {
    query = { name: search };
  }

  return CategoryModel.find({
    ...query,
  }).limit(pageLimit);
}

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, ...remainigData } = req.body;

    const request: CategoryZodType = remainigData;

    // check name in db to make name unique

    const category = await CategoryModel.find({
      name: request.name,
    }).countDocuments();

    if (category > 0) {
      throw new ErrorHandler("Category with this name already exists.", 409);
    }
    await CategoryModel.create({
      ...request,
    });

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
    const { limit = 10, page = 0, search } = req.query as unknown as any; //

    const categories = await fetchCategories({
      pageLimit: Number(limit),
      page: Number(page),
      search,
    });

    res.status(201).json({
      message: "Fetched category successfully.",
      success: true,
      data: categories,
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
    const { limit = 10, page = 0, search } = req.query as unknown as any; //

    const categories = await fetchCategories({
      pageLimit: Number(limit),
      page: Number(page),
      search,
    });

    res.status(201).json({
      message: "Fetched category successfully.",
      success: true,
      data: categories,
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
