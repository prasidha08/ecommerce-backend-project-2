import mongoose from "mongoose";

const { Schema, model } = mongoose;

export enum ROLE {
  CUSTOMER = "CUSTOMER",
  SUPERADMIN = "SUPER_ADMIN",
  ORDERADMIN = "ORDER_ADMIN",
}

const users = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  isVerified: { type: Boolean, default: false },
  phoneNumber: { type: String, default: null },
  password: { type: String, require: true },
  additionalPhoneNumber: { type: String, default: null },
  role: {
    type: String,
    enum: [ROLE.CUSTOMER, ROLE.ORDERADMIN, ROLE.SUPERADMIN],
  },
  shippingAddress: [
    {
      street: { type: String, default: null },
      city: { type: String, default: null },
      state: { type: String, default: null },
      zip: { type: String, default: null },
      country: { type: String, default: null },
      landmark: { type: String, default: null },
      area: { type: String, default: null },
      id: { type: String, default: null },
    },
  ],
});

export const UserModel = model("Users", users);
