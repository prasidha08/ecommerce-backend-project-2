import express from "express";
import controllers from "../controllers/category.controller";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";
import { ROLE } from "../model/user.model";
import { CategoryZodSchema } from "../types/category";
import { validateData } from "../utility/validator";
const { createCategory, getAllCategoriesByAdmin, getAllCategoriesByPublic } =
  controllers;
const router = express.Router();

// admin ==> logged in ==> role ==> admin

// logged in ==> authentication
// authorization ==> authorized ==> api access ==>

// user login >> logged in >>> superAdmin
router.post(
  "/api/categories",
  authentication,
  authorization([ROLE.SUPERADMIN]),
  validateData(CategoryZodSchema),
  // midleware
  createCategory
);

// admin euta route [ dasboard]
router.get(
  "/api/admin/categories",
  authentication,
  authorization([ROLE.SUPERADMIN]),
  getAllCategoriesByAdmin
);

// customer app

router.get("/api/category", getAllCategoriesByPublic); // public access

export = router;
