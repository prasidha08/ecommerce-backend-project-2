"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const auth_utility_1 = require("../utility/auth.utility");
const errorHandler_1 = require("../utility/errorHandler");
const authentication = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        throw new errorHandler_1.ErrorHandler("Unauthorized user", 401); // unauthorized user 401
    }
    const isUserLoggedIn = (0, auth_utility_1.verifyToken)(token);
    console.log("🚀 ~ isUserLoggedIn:", isUserLoggedIn);
    if (!isUserLoggedIn) {
        throw new errorHandler_1.ErrorHandler("Token is expired", 403); // 403 forbidden
    }
    if (!req.body) {
        req.body = {};
    }
    req.body.user = isUserLoggedIn;
    console.log("hello");
    return next();
};
exports.authentication = authentication;
