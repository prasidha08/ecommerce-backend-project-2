"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogin = createLogin;
const user_model_1 = require("../model/user.model");
const auth_utility_1 = require("../utility/auth.utility");
function createLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adminCredentials = {
                email: "admin@yopmail.com",
                password: "admin123456",
            };
            const encryptedPassword = (0, auth_utility_1.hashedPassword)(adminCredentials.password);
            const user = yield user_model_1.UserModel.find({
                email: "admin@yopmail.com",
                role: user_model_1.ROLE.SUPERADMIN,
            }).countDocuments();
            if (user > 0) {
                console.log(" 🚀 🚀 🚀  ALready created");
                return;
            }
            yield user_model_1.UserModel.create({
                email: "admin@yopmail.com",
                password: encryptedPassword,
                role: user_model_1.ROLE.SUPERADMIN,
            });
        }
        catch (error) {
            console.log("🚀 ~ createLogin ~ error:", error);
        }
    });
}
