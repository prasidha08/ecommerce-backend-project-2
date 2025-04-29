import express from "express";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";
import { ROLE } from "../model/user.model";
const router = express.Router();
import controllers from "../controllers/review.controller";
import { validateData } from "../utility/validator";
import { ReviewZodSchema } from "../types/review";

const { createReview, deleteReview } = controllers;

// create review
// delete review

router.post(
  "/api/reviews",
  authentication,
  authorization([ROLE.CUSTOMER]),
  //req.body validation
  validateData(ReviewZodSchema),
  createReview
);

router.delete(
  "/api/reviews/:reviewId",
  authentication,
  authorization([ROLE.CUSTOMER]),
  deleteReview
);

export = router;
