"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginZodSchema = exports.RegisterZodSchema = void 0;
const zod_1 = require("zod");
exports.RegisterZodSchema = zod_1.z
    .object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    phoneNumber: zod_1.z.string().optional(),
})
    .strict();
exports.LoginZodSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
})
    .strict();
