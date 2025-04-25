import { NextFunction, Request, Response } from "express";
import { CartModel } from "../model/cart.model";
import { ErrorHandler } from "../utility/errorHandler";
import { ORDER_STATUS, OrderModel } from "../model/order.model";
import { OrderZodType } from "../types/order";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, ...remainigData } = req.body;

    const request: OrderZodType = remainigData;

    await OrderModel.create({
      ...request,
      userId: user._id,
    });

    res.status(201).json({
      message: "Order is created successfully.",
      success: true,
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

const cancelOrderByCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, ...remainigData } = req.body;

    const orderId = req.params.orderId;

    const request: any = remainigData;

    // update order pending

    const order = await OrderModel.findById({ _id: orderId });

    if (order === null) {
      throw new ErrorHandler("Order doesnot exits", 404);
    }

    if (order.status === ORDER_STATUS.PENDING) {
      await OrderModel.findByIdAndUpdate(
        { _id: orderId },
        {
          status: request.status,
        }
      );
    }

    res.status(200).json({
      message: "Order is cancelled successfully.",
      success: true,
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.user;
    const cartId = req.params.cartId;

    res.status(200).json({
      message: "Cart is deleted successfully.",
      success: true,
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

export = {
  createOrder,
  cancelCartByCustomer: cancelOrderByCustomer,
};

// order document == > cart
// user one  ===> cart 1 ==> has not made order ==>

// user two ===> cart 2 ==>  order

//
