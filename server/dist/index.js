"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const app_1 = __importDefault(require("./app"));
const validateEnv_1 = __importDefault(require("@/utils/validateEnv"));
const auth_controller_1 = __importDefault(require("@/resources/auth/auth.controller"));
const user_controller_1 = __importDefault(require("@/resources/user/user.controller"));
const event_controller_1 = __importDefault(require("@/resources/event/event.controller"));
const memory_controller_1 = __importDefault(require("@/resources/memory/memory.controller"));
const candle_controller_1 = __importDefault(require("@/resources/candle/candle.controller"));
const media_controller_1 = __importDefault(require("@/resources/media/media.controller"));
(0, validateEnv_1.default)();
const app = new app_1.default([
    new auth_controller_1.default(),
    new user_controller_1.default(),
    new event_controller_1.default(),
    new memory_controller_1.default(),
    new candle_controller_1.default(),
    new media_controller_1.default(),
], Number(process.env.PORT));
app.listen();
