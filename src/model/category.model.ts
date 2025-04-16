import { model, Schema } from "mongoose";

// type category = {
//     id:string,
//     name:string,
//     description:string,
//     showInHomescreen:boolean,
//     createdAt:Date,
//     updatedAt:Date
//     }

const categorySchema = new Schema(
  {
    name: { type: String, require: true },
    description: {
      type: String,
    },
    showInHomescreen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const CategoryModel = model("Categories", categorySchema);
