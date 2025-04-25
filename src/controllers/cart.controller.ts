import { NextFunction, Request, Response } from "express";
import { CartModel } from "../model/cart.model";
import { CartZodType } from "../types/cart";
import { ErrorHandler } from "../utility/errorHandler";
import mongoose from "mongoose";

const createCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, ...remainigData } = req.body;

    const request: CartZodType = remainigData;

    await CartModel.create({
      ...request,
      userId: user._id,
    });

    res.status(201).json({
      message: "Cart is created successfully.",
      success: true,
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

const updateCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, ...remainigData } = req.body;
    const cartId = req.params.cartId;

    const request: CartZodType = remainigData;

    const result = await CartModel.findByIdAndUpdate(
      { _id: cartId },
      {
        ...request,
      }
    );

    if (result === null) {
      throw new ErrorHandler("Cart doesnt exists", 404);
    }

    res.status(200).json({
      message: "Cart is updated successfully.",
      success: true,
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartId = req.params.cartId;

    const result = await CartModel.findByIdAndDelete({ _id: cartId });

    if (result === null) {
      throw new ErrorHandler("Cart doesnt exists", 404);
    }

    res.status(200).json({
      message: "Cart is deleted successfully.",
      success: true,
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

const getCart = async (req: Request, res: Response, next: NextFunction) => {
  // fetch cart order nabaneko
  try {
    const user = req.body.user;

    const result = await CartModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user._id as string),
        },
      },
      {
        $lookup: {
          as: "orderDetails",
          from: "orders",
          localField: "_id",
          foreignField: "cartId",
        },
      },
      {
        $match: {
          orderDetails: { $size: 0 },
        },
      },
      {
        $project: {
          orderDetails: 0,
        },
      },
    ]);

    if (result === null) {
      throw new ErrorHandler("Cart doesnt exists", 404);
    }

    res.status(200).json({
      message: "Cart is deleted successfully.",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

export = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
};

// order document == > cart
// user one  ===> cart 1 ==> has not made order ==>

// user two ===> cart 2 ==>  order

//
