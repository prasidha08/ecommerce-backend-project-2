import { z } from "zod";

export const RegisterZodSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().length(6),
  })
  .strict();

export type RegisterZodType = z.infer<typeof RegisterZodSchema>;
