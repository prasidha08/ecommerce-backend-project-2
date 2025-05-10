"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const authentication_1 = require("../middleware/authentication");
const authorization_1 = require("../middleware/authorization");
const user_model_1 = require("../model/user.model");
const category_1 = require("../types/category");
const validator_1 = require("../utility/validator");
const { createCategory, getAllCategoriesByAdmin, getAllCategoriesByPublic } = category_controller_1.default;
const router = express_1.default.Router();
// admin ==> logged in ==> role ==> admin
// logged in ==> authentication
// authorization ==> authorized ==> api access ==>
// user login >> logged in >>> superAdmin
router.post("/api/categories", authentication_1.authentication, (0, authorization_1.authorization)([user_model_1.ROLE.SUPERADMIN]), (0, validator_1.validateData)(category_1.CategoryZodSchema), 
// midleware
createCategory);
// admin euta route [ dasboard]
router.get("/api/admin/categories", authentication_1.authentication, (0, authorization_1.authorization)([user_model_1.ROLE.SUPERADMIN]), getAllCategoriesByAdmin);
// customer app
router.get("/api/categories", getAllCategoriesByPublic); // public access
module.exports = router;
