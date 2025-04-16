import { z } from "zod";

export const CategoryZodSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    showInHomescreen: z.boolean().optional(),
  })
  .strict();

export type CategoryZodType = z.infer<typeof CategoryZodSchema>;
