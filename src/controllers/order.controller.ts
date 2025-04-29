import { NextFunction, Request, Response } from "express";
import { CartModel } from "../model/cart.model";
import { ErrorHandler } from "../utility/errorHandler";
import { ORDER_STATUS, OrderModel } from "../model/order.model";
import { OrderZodType, UpdateStatusZodType } from "../types/order";
import { defaultLimit } from "../utility/contant";
import mongoose from "mongoose";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, ...remainigData } = req.body;

    const request: OrderZodType = remainigData;

    const orderReadableId = `#ORD-${new Date()}`;

    await OrderModel.create({
      ...request,
      userId: user._id,
      orderReadableId,
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

const updateOrderByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, ...remainigData } = req.body;

    const orderId = req.params.orderId;

    const request: UpdateStatusZodType = remainigData;

    // update order pending

    const order = await OrderModel.findById({ _id: orderId });

    if (order === null) {
      throw new ErrorHandler("Order doesnot exits", 404);
    }

    await OrderModel.findByIdAndUpdate(
      { _id: orderId },
      {
        status: request.status,
      }
    );

    res.status(200).json({
      message: "Order is cancelled successfully.",
      success: true,
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

//TODO: use zod schema's type
type Query = {
  orderId?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
};

const getOrdersByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user = req.body.user;
    // const cartId = req.params.cartId;
    const {
      orderId,
      status,
      search,
      page = 1,
      limit = defaultLimit,
    } = req.query as Query;

    //pagination ,collection join
    const pageLimit = Number(limit);
    const pageNumber = Number(page);

    const skipCalculation = (pageNumber - 1) * pageLimit;

    let query = {};

    if (orderId) {
      query = {
        orderId,
      };
    }

    if (search) {
      //email, firstName, lastName
      query = {
        ...query,
        $or: [
          {
            "userDetail.email": {
              $regex: search, //pra
              $options: "i", // case insentive ,Prasidha , pRasidha
            },
          },
          {
            "userDetail.firstName": {
              $regex: search, //pra
              $options: "i", // case insentive ,Prasidha , pRasidha
            },
          },
          {
            "userDetail.lastName": {
              $regex: search, //pra
              $options: "i", // case insentive ,Prasidha , pRasidha
            },
          },
        ],
      };
    }

    if (status) {
      query = {
        ...query,
        status,
      };
    }

    const result = await OrderModel.aggregate([
      {
        $lookup: {
          as: "userDetail",
          from: "users",
          localField: "userId", // Field from the input documents
          foreignField: "_id", // Field from the documents of the "from" collection
        },
      },
      {
        $unwind: "$userDetail",
      },
      {
        $match: {
          ...query,
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

    const orders = result[0]?.data;
    const totalProducts = result[0]?.totalCount[0]?.count;

    const totalPage = Math.ceil(totalProducts / pageLimit);

    res.status(200).json({
      message: "Cart is deleted successfully.",
      success: true,
      data: {
        data: orders,
        pagination: {
          limit: pageLimit,
          page: pageNumber,
          firsPage: pageNumber === 1,
          lastPage: totalPage === pageNumber,
          totalPage: totalPage || 0,
        },
      },
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

const getOrdersByCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user = req.body.user;
    // const cartId = req.params.cartId;
    const {
      orderId,
      status,
      page = 1,
      limit = defaultLimit,
    } = req.query as Query;

    const user = req.body.user;

    //pagination ,collection join
    const pageLimit = Number(limit);
    const pageNumber = Number(page);

    const skipCalculation = (pageNumber - 1) * pageLimit;

    let query = {};

    if (orderId) {
      query = {
        orderId,
      };
    }

    if (status) {
      query = {
        ...query,
        status,
      };
    }

    const result = await OrderModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user._id as string),
          ...query,
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

    const orders = result[0]?.data;
    const totalProducts = result[0]?.totalCount[0]?.count;

    const totalPage = Math.ceil(totalProducts / pageLimit);

    res.status(200).json({
      message: "Cart is deleted successfully.",
      success: true,
      data: {
        data: orders,
        pagination: {
          limit: pageLimit,
          page: pageNumber,
          firsPage: pageNumber === 1,
          lastPage: totalPage === pageNumber,
          totalPage: totalPage || 0,
        },
      },
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

const getOrdersCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await OrderModel.aggregate([
      {
        $facet: {
          totalOrders: [{ $count: "count" }], // second pipeline
          activeOrders: [
            {
              $match: {
                status: ORDER_STATUS.PENDING,
              },
            },
            { $count: "count" },
          ], // one pipeline
          completedOrders: [
            {
              $match: {
                status: ORDER_STATUS.DELIVERED,
              },
            },
            { $count: "count" },
          ], // one pipeline
          canceledOrders: [
            {
              $match: {
                status: ORDER_STATUS.CANCELLED,
              },
            },
            { $count: "count" },
          ], // one pipeline
        },
      },
    ]);

    const [aggregate] = result;

    const { totalOrders, activeOrders, completedOrders, canceledOrders } =
      aggregate;

    res.status(200).json({
      message: "",
      success: true,
      data: {
        totalOrders: totalOrders?.[0]?.count ?? 0,
        activeOrders: activeOrders?.[0]?.count ?? 0,
        completedOrders: completedOrders?.[0]?.count ?? 0,
        canceledOrders: canceledOrders?.[0]?.count ?? 0,
      },
    });
  } catch (error) {
    next(error); // skip // error middle >> response
  }
};

export = {
  createOrder,
  cancelOrderByCustomer,
  getOrdersByAdmin,
  getOrdersByCustomer,
  getOrdersCount,
  updateOrderByAdmin,
};

// order document == > cart
// user one  ===> cart 1 ==> has not made order ==>

// user two ===> cart 2 ==>  order

//
