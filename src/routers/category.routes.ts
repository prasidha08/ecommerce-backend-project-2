import express from "express";
import controllers from "../controllers/category.controller";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";
import { ROLE } from "../model/user.model";
const { createCategory, getAllCategoriesByAdmin, getAllCategoriesByPublic } =
  controllers;
const router = express.Router();

// admin ==> logged in ==> role ==> admin

// logged in ==> authentication
// authorization ==> authorized ==> api access ==>

router.post(
  "/api/category",
  authentication,
  authorization([ROLE.SUPERADMIN]),
  createCategory
);

// admin euta route [ dasboard]
router.get(
  "/api/admin/category",
  authentication,
  authorization([ROLE.SUPERADMIN]),
  getAllCategoriesByAdmin
);

// customer app

router.get("/api/category", getAllCategoriesByPublic); // public access

export = router;
