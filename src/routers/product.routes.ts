import express from "express";
import controllers from "../controllers/product.controller";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";
import { ROLE } from "../model/user.model";
import { validateData } from "../utility/validator";
import { ProductZodSchema } from "../types/product";
const {
  createProduct,
  getAllProductsByAdmin,
  getAllProductsByPublic,
  deleteProduct,
  updateProduct,
} = controllers;
const router = express.Router();

//created by admin
router.post(
  "/api/admin/products",
  authentication,
  authorization([ROLE.SUPERADMIN]),
  validateData(ProductZodSchema),
  createProduct
);

// admin euta route [ dasboard]
router.get(
  "/api/admin/products",
  authentication,
  authorization([ROLE.SUPERADMIN]),
  getAllProductsByAdmin
);

// customer app
router.get("/api/products", getAllProductsByPublic); // public access

router.delete(
  "/api/admin/products/:productId",
  authentication,
  authorization([ROLE.SUPERADMIN]),
  deleteProduct
);

// productIds:[] //

router.put(
  "/api/admin/products/:productId",
  authentication,
  authorization([ROLE.SUPERADMIN]),
  // check request body
  updateProduct
);
export = router;
