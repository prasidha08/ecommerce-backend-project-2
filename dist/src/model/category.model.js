"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
// type category = {
//     id:string,
//     name:string,
//     description:string,
//     showInHomescreen:boolean,
//     createdAt:Date,
//     updatedAt:Date
//     }
const categorySchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    description: {
        type: String,
    },
    showInHomescreen: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.CategoryModel = (0, mongoose_1.model)("Categories", categorySchema);
