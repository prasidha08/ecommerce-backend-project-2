import { z } from "zod";
import { ORDER_STATUS } from "../model/order.model";

export const CartProductZodSchema = z
  .object({
    _id: z.string(),
    title: z.string(),
    price: z.number(),
    quantity: z.number(),
    total: z.number(),
    discountPercentage: z.number().optional(),
    discountedTotal: z.string().optional(),
    thumbnail: z.string(),
  })
  .strict();

export const CartZodSchema = z
  .object({
    total: z.number(),
    discountedTotal: z.number().optional(),
    totalProducts: z.number(),
    totalQuantity: z.number(),
    products: z.array(CartProductZodSchema),
  })
  .strict();

export type CartZodType = z.infer<typeof CartZodSchema>;
