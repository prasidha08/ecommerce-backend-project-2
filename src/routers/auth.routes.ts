import express, { NextFunction } from "express";
import controllers from "../controllers/auth.controller";
import { validateData } from "../utility/validator";
import { RegisterZodSchema } from "../types/auth";

const { register } = controllers;

const router = express.Router();

router.post("/api/register", validateData(RegisterZodSchema), register);

// role superadmin, orderadmin //
// router

export = router;
