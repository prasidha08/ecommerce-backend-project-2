import { z } from "zod";

export const RegisterZodSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().length(6),
    phoneNumber: z.string().optional(),
  })
  .strict();

export const LoginZodSchema = z
  .object({
    email: z.string().email(),
    password: z.string().length(6),
  })
  .strict();

export type RegisterZodType = z.infer<typeof RegisterZodSchema>;

export type LoginZodType = z.infer<typeof LoginZodSchema>;
