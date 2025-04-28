"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./src/routers/auth.routes"));
const category_routes_1 = __importDefault(require("./src/routers/category.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    // Allow all origins (not recommended for production)
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/check", (req, res, next) => {
    res.status(200).json({
        message: "Api is already to go",
        success: true,
    });
});
app.use(auth_routes_1.default);
app.use(category_routes_1.default);
app.use((_req, res, _next) => {
    res.status(404).json({
        message: "Route not found.",
        success: false,
    });
});
app.use((err, req, res, next) => {
    var _a, _b;
    res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).json({
        message: (_b = err.message) !== null && _b !== void 0 ? _b : "Some thing went wrong.",
        success: false,
    });
});
module.exports = app;
// response == { message:"" ,data:[] , success:true}
