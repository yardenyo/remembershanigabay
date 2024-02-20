"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const signup = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    password: joi_1.default.string()
        .required()
        .min(8)
        .max(32)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$')),
});
const signin = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const refreshToken = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});
exports.default = {
    signup,
    signin,
    refreshToken,
};
