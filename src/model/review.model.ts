import mongoose, { model, Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    rating: { type: Number, default: 0 },
    comment: { type: String, default: null },
    reviewerEmail: { type: String, required: true },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    userId: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  },
  { timestamps: true }
);

export const ReviewModel = model("Reviews", reviewSchema);

// ram@gmail.com , product 1 ==> 5 // same
// ram@gmail.com product 1 ==> 4
