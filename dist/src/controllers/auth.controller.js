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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const user_model_1 = require("../model/user.model");
const auth_utility_1 = require("../utility/auth.utility");
const errorHandler_1 = require("../utility/errorHandler");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // first time db user
    //1. db already
    //   2. error ==> already garxa
    // creaate
    const requestedByClient = req.body;
    const { email, firstName, lastName, shippingAddress, phoneNumber, additionalPhoneNumber, password, } = requestedByClient;
    //   const { userId } = req.params;
    //   const query = req.query;
    // password // encrypt
    const encryptedPassword = (0, auth_utility_1.hashedPassword)(password);
    try {
        const user = yield user_model_1.UserModel.find({
            email: requestedByClient.email,
        });
        if (user.length === 0) {
            yield user_model_1.UserModel.create({
                email,
                firstName,
                lastName,
                shippingAddress,
                phoneNumber,
                additionalPhoneNumber,
                role: user_model_1.ROLE.CUSTOMER,
                password: encryptedPassword,
            });
        }
        else {
            throw new errorHandler_1.ErrorHandler("User is already registered", 400);
        }
        res.status(201).json({
            message: "Registered",
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const requestedByClient = req.body;
    const { email, password } = requestedByClient;
    console.log(email, password, "this is email and password..");
    try {
        const user = yield user_model_1.UserModel.find({
            email,
        });
        if (!user || user.length === 0) {
            throw new errorHandler_1.ErrorHandler("Either password or email didn't match", 400);
        }
        // user
        const isPasswordValidate = (0, auth_utility_1.comparePassword)(password, (_b = (_a = user[0]) === null || _a === void 0 ? void 0 : _a.password) !== null && _b !== void 0 ? _b : "");
        if (!isPasswordValidate) {
            throw new errorHandler_1.ErrorHandler("Either password or email didn't match", 400);
        }
        const { email: userEmail, _id, role } = user[0];
        // client token
        const _c = user[0].toObject(), { password: _passwordToRemove } = _c, remainigDate = __rest(_c, ["password"]);
        const token = (0, auth_utility_1.jwtToken)({
            payload: { email: userEmail !== null && userEmail !== void 0 ? userEmail : "", _id, role: role },
            expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
        });
        res.status(200).json({
            message: "User is logged in.",
            success: true,
            data: {
                accessToken: token,
                details: remainigDate,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
module.exports = {
    register,
    login,
};
