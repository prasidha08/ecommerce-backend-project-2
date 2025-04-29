// userId: { type: Types.ObjectId, ref: 'Users', required: true },
// products: [cartProductSchema],
// total: { type: Number, required: true },
// discountedTotal: { type: Number, default: null },
// totalQuantity: { type: Number, required: true },
// totalProducts: { type: Number, required: true },
// status: {
//   type: String,
//   enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
//   default: 'pending',
// },
// paymentMethod: { type: String, default: 'card' }, // optional
// shippingAddress: {
//   street: String,
//   city: String,
//   zip: String,
//   country: String,
// }, // optional
// }

// PENDING: "pending",
// SHIPPED: "shipped",
// DELIVERED: "delivered",
// CANCELLED: "cancelled",

export const ORDER_STATUS = {
  PENDING: "pending",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

import mongoose, { model, Schema } from "mongoose";
import { cartProductSchema } from "./cart.model";

const orderSchema = new Schema({
  total: { type: Number, require: true },
  discountedTotal: { type: Number, default: null },
  orderReadableId: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  cartId: { type: mongoose.Types.ObjectId, ref: "Carts", required: true },
  totalProducts: { type: Number },
  totalQuantity: { type: Number },
  products: [cartProductSchema],
  // cart

  // new
  deliveryCharge: { type: Number, default: null },
  promoCode: { type: String, default: null },
  paymentMethod: { type: String, enum: ["cash"], default: "cash" },
  status: {
    type: String,
    enum: [
      ORDER_STATUS.CANCELLED,
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.PENDING,
      ORDER_STATUS.SHIPPED,
    ],
    default: ORDER_STATUS.PENDING,
  },
  shippingAddress: {
    street: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zip: { type: String, default: null },
    country: { type: String, default: null },
    landmark: { type: String, default: null },
    area: { type: String, default: null },
    _id: { type: String, default: null },
  },
});

export const OrderModel = model("Orders", orderSchema);
