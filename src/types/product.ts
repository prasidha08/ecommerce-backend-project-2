import { z } from "zod";

//  title: { type: String, require: true },
//     description: { type: String, default: null },
//     categoryId: { type: mongoose.Types.ObjectId, ref: "Categories" },
//     price: { type: Number, require: true },
//     discountPercentage: { type: Number, default: null },
//     rating: { type: Number, default: 0 },
//     stock: { type: Number, default: 0 },
//     tags: [{ type: String }],
//     // brand: {},
//     sku: { type: String },
//     weight: { type: Number },
//     dimensions: [
//       {
//         width: { type: Number },
//         height: { type: Number },
//         depth: { type: Number },
//       },
//     ],
//     reviews: [{ type: mongoose.Types.ObjectId, ref: "Reviews" }],
//     thumbnail: { type: String, require: true },
//     images: [{ type: String }],
//     returnPolicy: { type: String, default: null },
//     minimumOrderQuantity: { type: Number, default: null },

const DimensionSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});
export const ProductZodSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    categoryId: z.string(),
    price: z.number(),
    discountPercentage: z.number().nullable().default(null),
    stock: z.number(),
    tags: z.array(z.string()),
    sku: z.string().optional(),
    weight: z.number(),
    dimensions: z.array(DimensionSchema),
    thumbnail: z.string(),
    images: z.array(z.string()),
    returnPolicy: z.string(),
    minimumOrderQuantity: z.number().nullable().default(null),
  })
  .strict();

export type ProductZodType = z.infer<typeof ProductZodSchema>;
