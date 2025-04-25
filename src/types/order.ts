import { z } from "zod";
import { ORDER_STATUS } from "../model/order.model";
import { CartProductZodSchema } from "./cart";

const ShippingAddressZodSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  landmark: z.string(),
  area: z.string(),
  // _id: z.string(),
});

export const OrderZodSchema = z.object({
  deliveryCharge: z.number().nullable(),
  promoCode: z.string().nullable(),
  paymentMethod: z.string().default("cash"),
  status: z.nativeEnum(ORDER_STATUS),
  shippingAddress: ShippingAddressZodSchema,
  cartId: z.string(),
  products: z.array(CartProductZodSchema),
});

export type OrderZodType = z.infer<typeof OrderZodSchema>;
