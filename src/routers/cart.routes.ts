// create cart
// get cart
// delete
// update

import express from "express";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";
import { ROLE } from "../model/user.model";
import { validateData } from "../utility/validator";
import controllers from "../controllers/cart.controller";
import { CartZodSchema } from "../types/cart";

const { createCart, updateCart, deleteCart, getCart } = controllers;

const router = express.Router();

// logged in user , access => customer

router.post(
  "/api/carts",
  authentication,
  authorization([ROLE.CUSTOMER]),
  validateData(CartZodSchema),
  createCart
);

router.put(
  "/api/carts/:cartId",
  authentication,
  authorization([ROLE.CUSTOMER]),
  validateData(CartZodSchema),
  updateCart
);

router.delete(
  "/api/carts/:cartId",
  authentication,
  authorization([ROLE.CUSTOMER]),
  deleteCart
);

router.get(
  "/api/carts",
  authentication,
  authorization([ROLE.CUSTOMER]),
  getCart
);

export = router;
