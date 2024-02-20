"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshTokenMiddleware = exports.authMiddleware = void 0;
const user_model_1 = __importDefault(require("@/resources/user/user.model"));
const redisConfig_1 = __importDefault(require("@/utils/config/redisConfig"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const jwtToken_1 = require("@/utils/jwtToken");
const refreshToken_1 = require("@/utils/refreshToken");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new http_exception_1.default(401, "Not Authorized");
        }
        let decoded;
        try {
            decoded = (0, jwtToken_1.verifyToken)(token);
        }
        catch (error) {
            throw new http_exception_1.default(401, "Not Authorized");
        }
        const user = yield user_model_1.default.findById(decoded.id);
        if (!user) {
            throw new http_exception_1.default(401, "Not Authorized");
        }
        req.body.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.authMiddleware = authMiddleware;
const verifyRefreshTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken)
            throw new http_exception_1.default(401, "Not Authorized");
        const decoded = (0, refreshToken_1.verifyRefreshToken)(refreshToken);
        if (typeof decoded === "string")
            throw new http_exception_1.default(401, "Not Authorized");
        const redisData = yield redisConfig_1.default.get(decoded.id.toString());
        if (!redisData) {
            res.clearCookie("refreshToken");
            throw new http_exception_1.default(401, "Not Authorized");
        }
        const redisToken = JSON.parse(redisData).token;
        if (refreshToken !== redisToken) {
            res.clearCookie("refreshToken");
            throw new http_exception_1.default(401, "Not Authorized");
        }
        const user = yield user_model_1.default.findById(decoded.id);
        if (!user)
            throw new http_exception_1.default(401, "Not Authorized");
        req.body.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.verifyRefreshTokenMiddleware = verifyRefreshTokenMiddleware;
