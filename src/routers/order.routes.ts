// create cart
// get cart
// delete
// update

import express from "express";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";
import { ROLE } from "../model/user.model";
import { validateData } from "../utility/validator";
import controllers from "../controllers/order.controller";
import { CartZodSchema } from "../types/cart";
import { OrderZodSchema, UpdateStatusZodSchema } from "../types/order";

const {
  cancelOrderByCustomer,
  createOrder,
  getOrdersByAdmin,
  getOrdersByCustomer,
  getOrdersCount,
  updateOrderByAdmin,
} = controllers;

const router = express.Router();

// logged in user , access => customer

router.post(
  "/api/orders",
  authentication,
  authorization([ROLE.CUSTOMER]),
  validateData(OrderZodSchema),
  createOrder
);

// status ==> pending

router.put(
  "/api/admin/orders/:orderId",
  authentication,
  authorization([ROLE.ORDERADMIN, ROLE.SUPERADMIN]),
  validateData(UpdateStatusZodSchema),
  updateOrderByAdmin
  //   updateCart
);

router.put(
  "/api/orders/:orderId",
  authentication,
  authorization([ROLE.CUSTOMER]),
  validateData(CartZodSchema),
  cancelOrderByCustomer
);

router.get(
  "/api/orders",
  authentication,
  authorization([ROLE.CUSTOMER]),
  getOrdersByCustomer
);

router.get(
  "/api/admin/orders",
  authentication,
  authorization([ROLE.SUPERADMIN, ROLE.ORDERADMIN]),
  getOrdersByAdmin
);

router.get(
  "/api/admin/order-counts",
  authentication,
  authorization([ROLE.SUPERADMIN, ROLE.ORDERADMIN]),
  getOrdersCount
);
export = router;

// order , customer , self order

// superAdmin , orderAdmin , all users' order
