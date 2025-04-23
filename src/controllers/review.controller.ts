import { NextFunction, Request, Response } from "express";
import { ReviewModel } from "../model/review.model";
import mongoose from "mongoose";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, ...remainigReviews } = req.body;

  try {
    const isReviewExists = await ReviewModel.find({
      userId: user._id,
      productId: remainigReviews.productId,
    }).exec();

    const [review] = isReviewExists;

    if (review?._id) {
      await ReviewModel.findByIdAndUpdate(
        {
          _id: review._id,
        },
        {
          rating: remainigReviews.rating,
        }
      );
    } else {
      await ReviewModel.create({
        ...remainigReviews,
        reviewerEmail: user.email,
        userId: user._id,
      });
    }

    res.status(201).json({
      message: "Review is created successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reviewId } = req.params;

  try {
    await ReviewModel.findByIdAndDelete({
      _id: reviewId,
    });

    res.status(200).json({
      message: "Review is deleted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export = {
  createReview,
  deleteReview,
};
