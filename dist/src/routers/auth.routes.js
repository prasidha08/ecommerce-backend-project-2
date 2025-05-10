"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validator_1 = require("../utility/validator");
const auth_1 = require("../types/auth");
const { register, login } = auth_controller_1.default;
const router = express_1.default.Router();
router.post("/api/register", (0, validator_1.validateData)(auth_1.RegisterZodSchema), register);
router.post("/api/login", (0, validator_1.validateData)(auth_1.LoginZodSchema), login);
module.exports = router;
