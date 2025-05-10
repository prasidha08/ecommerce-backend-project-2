"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryZodSchema = void 0;
const zod_1 = require("zod");
exports.CategoryZodSchema = zod_1.z
    .object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    showInHomescreen: zod_1.z.boolean().optional(),
})
    .strict();
