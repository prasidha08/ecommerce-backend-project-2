// getAllProductsByAdmin // data

import { NextFunction, Request, Response } from "express";
import { defaultLimit } from "../utility/contant";
import { ProductModel } from "../model/product.model";
import { ProductZodType } from "../types/product";

//getAllProductsByCustomer // selective field

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user: _userData, ...remainigProduct } = req.body;
    const product: ProductZodType = remainigProduct;

    await ProductModel.create({
      ...product,
    });
    res.status(201).json({
      message: "Product is created successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProductsByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = defaultLimit, page = 1, search } = req.query;

    const pageLimit = Number(limit);
    const pageNumber = Number(page);
    const skipCalculation = (pageNumber - 1) * pageLimit;

    const aggregatedData = await ProductModel.aggregate([
      { $match: search ? { name: search } : {} },
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skipCalculation },
            { $limit: pageLimit },
          ], // one pipeline
          totalCount: [{ $count: "count" }], // second pipeline
        },
      },
    ]);

    const categories = aggregatedData[0].data;
    const totalCategories = aggregatedData[0].totalCount[0].count;

    const totalPage = Math.ceil(totalCategories / pageLimit);

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
    next(error);
  }
};

const getAllProductsByPublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = defaultLimit, page = 1, search } = req.query;

    const pageLimit = Number(limit);
    const pageNumber = Number(page);

    const skipCalculation = (pageNumber - 1) * pageLimit;

    const aggregatedData = await ProductModel.aggregate([
      { $match: search ? { name: search } : {} },
      {
        $project: {
          _id: 1,
          title: 1,
          price: 1,
          discountPercentage: 1,
        },
      },
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skipCalculation },
            { $limit: pageLimit },
          ], // one pipeline
          totalCount: [{ $count: "count" }], // second pipeline
        },
      },
    ]);

    const products = aggregatedData[0].data;
    const totalProducts = aggregatedData[0].totalCount[0].count;

    const totalPage = Math.ceil(totalProducts / pageLimit);

    res.status(201).json({
      message: "Fetched category successfully.",
      success: true,
      data: {
        data: products,
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
    next(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    await ProductModel.findByIdAndDelete({ _id: productId });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    const { user: _userData, ...remainigProduct } = req.body;
    await ProductModel.findByIdAndUpdate(
      { _id: productId },
      { ...remainigProduct }
    );
  } catch (error) {
    next(error);
  }
};

export = {
  createProduct,
  getAllProductsByAdmin,
  getAllProductsByPublic,
  deleteProduct,
  updateProduct,
};
