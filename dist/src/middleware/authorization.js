"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const errorHandler_1 = require("../utility/errorHandler");
const authorization = (roles) => {
    return (req, res, next) => {
        const user = req.body.user;
        if (roles.includes(user.role))
            return next();
        throw new errorHandler_1.ErrorHandler("403, cannot access the api.", 403);
    };
};
exports.authorization = authorization;
