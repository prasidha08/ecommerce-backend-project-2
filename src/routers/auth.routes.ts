import express from "express";
import controllers from "../controllers/auth.controller";
import { validateData } from "../utility/validator";
import { LoginZodSchema, RegisterZodSchema } from "../types/auth";

const { register, login } = controllers;

const router = express.Router();

router.post("/api/register", validateData(RegisterZodSchema), register);
router.post("/api/login", validateData(LoginZodSchema), login);

// role superadmin, orderadmin //
// router

export = router;
