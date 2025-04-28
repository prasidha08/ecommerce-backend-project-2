"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodbConnection = mongodbConnection;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
function mongodbConnection() {
    return mongoose_1.default.connect(config_1.configuration.MONGODB_URL);
}
