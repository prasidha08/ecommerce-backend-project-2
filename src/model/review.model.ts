import { model, Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    rating: { type: Number, default: 0 },
    comment: { type: String, default: null },
    reviewerName: { type: String, require: true },
    reviewerEmail: { type: String, require: true },
  },
  { timestamps: true }
);

export const ReviewModel = model("Reviews", reviewSchema);
