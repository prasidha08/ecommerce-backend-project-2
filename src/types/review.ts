import { z } from "zod";

export const ReviewZodSchema = z
  .object({
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
    productId: z.string(),
  })
  .strict();

export type ReviewZodType = z.infer<typeof ReviewZodSchema>;
