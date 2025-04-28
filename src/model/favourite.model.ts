import mongoose, { model, Schema } from "mongoose";

const favouriteSchema = new Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt , updatedAt
  }
);

export const FavouriteModel = model("Favourites", favouriteSchema);
