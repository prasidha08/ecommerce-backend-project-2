//     "id": 1,
//     "products": [
//       {
//         "id": 144,
//         "title": "Cricket Helmet",
//         "price": 44.99,
//         "quantity": 4,
//         "total": 179.96,
//         "discountPercentage": 11.47,
//         "discountedTotal": 159.32,
//         "thumbnail": "https://cdn.dummyjson.com/products/images/sports-accessories/Cricket%20Helmet/thumbnail.png"
//       },
//       {...}
//       // more products
//     ],
//     "total": 4794.8,
//     "discountedTotal": 4288.95,
//     "userId": 142,
//     "totalProducts": 5,
//     "totalQuantity": 20
//   },

import mongoose, { model, Schema, Types } from "mongoose";

export const cartProductSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    discountPercentage: { type: Number, default: null },
    discountedTotal: { type: Number, default: null },
    thumbnail: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const cartSchema = new Schema({
  total: { type: Number, required: true },
  discountedTotal: { type: Number, default: null },
  userId: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  totalProducts: { type: Number },
  totalQuantity: { type: Number },
  products: [cartProductSchema],
});

export const CartModel = model("Carts", cartSchema);
