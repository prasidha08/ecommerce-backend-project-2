"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.ROLE = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
var ROLE;
(function (ROLE) {
    ROLE["CUSTOMER"] = "CUSTOMER";
    ROLE["SUPERADMIN"] = "SUPER_ADMIN";
    ROLE["ORDERADMIN"] = "ORDER_ADMIN";
})(ROLE || (exports.ROLE = ROLE = {}));
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
}, { timestamps: true });
exports.UserModel = model("Users", users);
