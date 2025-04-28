"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const config_1 = require("./config/config");
const server_1 = require("./db/server");
const admin_seed_1 = require("./seed/admin.seed");
(0, server_1.mongodbConnection)()
    .then(() => {
    app_1.default.listen(config_1.configuration.PORT, () => {
        console.log("Server is listening on ", config_1.configuration.PORT);
        (0, admin_seed_1.createLogin)();
    });
})
    .catch((e) => {
    console.log("🚀 ~ e:", e);
    console.log("🚀 ~ Error while connecting to the database:", config_1.configuration.MONGODB_URL);
});
