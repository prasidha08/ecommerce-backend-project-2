import { z } from "zod";

export const FavouriteZodSchema = z
  .object({
    productId: z.string(),
  })
  .strict();

export type FavouriteZodType = z.infer<typeof FavouriteZodSchema>;
