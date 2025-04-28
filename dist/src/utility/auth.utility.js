"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashedPassword = hashedPassword;
exports.comparePassword = comparePassword;
exports.jwtToken = jwtToken;
exports.verifyToken = verifyToken;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function hashedPassword(password) {
    const salt = bcryptjs_1.default.genSaltSync(Number(config_1.configuration.SALT_ROUD));
    return bcryptjs_1.default.hashSync(password, salt);
}
function comparePassword(password, hashedPassword) {
    return bcryptjs_1.default.compare(password, hashedPassword);
}
function jwtToken({ payload, expiresIn, }) {
    return jsonwebtoken_1.default.sign(payload, config_1.configuration.JWT_TOKEN, { expiresIn });
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.configuration.JWT_TOKEN);
}
