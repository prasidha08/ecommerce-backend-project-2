import { NextFunction, Request, Response } from "express";
import { CategoryZodType } from "../types/category";
import { CategoryModel } from "../model/category.model";
import { ErrorHandler } from "../utility/errorHandler";

type ParamType = {
  skipCalculation: number;
  pageLimit: number;
  search?: string;
};

// aggregate pipeline

function fetchCategories({ skipCalculation, pageLimit, search }: ParamType) {
  let query = {};

  if (search) {
    query = { name: search };
  }

  return CategoryModel.find({
    ...query,
  })
    .limit(pageLimit)
    .skip(skipCalculation);
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
    const { limit = 10, page = 1, search } = req.query as unknown as any; //

    const pageLimit = Number(limit);
    const pageNumber = Number(page);

    // 10 , page 1 ==> 0 ==> 1 to 10 // fetched
    //  page 2 ===> 11 to 20
    //page 3 ==> 21 to 30

    // 98 , 10
    // 98/10 , 9.... ,

    const skipCalculation = (pageNumber - 1) * limit;

    const [categories, totalCategories] = await Promise.all([
      fetchCategories({
        pageLimit,
        skipCalculation,
        search,
      }),
      CategoryModel.find().countDocuments(),
    ]);

    const totalPage = Math.ceil(totalCategories / limit);

    res.status(201).json({
      message: "Fetched category successfully.",
      success: true,
      data: {
        data: categories,
        pagination: {
          limit: pageLimit,
          page: pageNumber,
          firsPage: pageNumber === 1,
          lastPage: totalPage === pageNumber,
          totalPage: totalPage,
        },
      },
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
    const { limit = 10, page = 1, search } = req.query as unknown as any; //

    const pageLimit = Number(limit);
    const pageNumber = Number(page);

    const skipCalculation = (pageNumber - 1) * limit;

    const [categories, totalCategories] = await Promise.all([
      fetchCategories({
        pageLimit,
        skipCalculation,
        search,
      }),
      CategoryModel.find().countDocuments(),
    ]);

    const totalPage = Math.ceil(totalCategories / limit);

    res.status(201).json({
      message: "Fetched category successfully.",
      success: true,
      data: {
        data: categories,
        pagination: {
          limit: pageLimit,
          page: pageNumber,
          firsPage: pageNumber === 1,
          lastPage: totalPage === pageNumber,
          totalPage: totalPage,
        },
      },
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
