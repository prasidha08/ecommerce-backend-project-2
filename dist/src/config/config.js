"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.configDotenv();
exports.configuration = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080,
    MONGODB_URL: (_b = process.env.MONGODB_URL) !== null && _b !== void 0 ? _b : "",
    SALT_ROUD: (_c = process.env.SALT_ROUD) !== null && _c !== void 0 ? _c : 9,
    HASH_PASSWORD: (_d = process.env.HASH_PASSWORD) !== null && _d !== void 0 ? _d : "",
    JWT_TOKEN: (_e = process.env.JWT_TOKEN) !== null && _e !== void 0 ? _e : "",
};
