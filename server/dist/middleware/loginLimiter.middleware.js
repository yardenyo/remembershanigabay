"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'יותר מדי ניסיונות התחברות, אנא נסה שוב אחרי 15 דקות',
    handler: (req, res, next, options) => {
        next(new http_exception_1.default(429, options.message));
    },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.default = loginLimiter;
