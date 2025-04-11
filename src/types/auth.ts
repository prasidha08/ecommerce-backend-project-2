import { z } from "zod";

export const RegisterZodSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
    phoneNumber: z.string().optional(),
  })
  .strict();

export const LoginZodSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export type RegisterZodType = z.infer<typeof RegisterZodSchema>;

export type LoginZodType = z.infer<typeof LoginZodSchema>;
