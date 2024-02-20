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
const auth_middleware_1 = require("@/middleware/auth.middleware");
const success_middleware_1 = __importDefault(require("@/middleware/success.middleware"));
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const auth_service_1 = __importDefault(require("@/resources/auth/auth.service"));
const auth_validation_1 = __importDefault(require("@/resources/auth/auth.validation"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const validateDBId_1 = __importDefault(require("@/utils/validateDBId"));
const express_1 = require("express");
class AuthController {
    constructor() {
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.AuthService = new auth_service_1.default();
        this.signup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.AuthService.signup(req.body);
                res.json(new success_middleware_1.default('משתמש נוצר בהצלחה', {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                }));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.signin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { accessToken, refreshToken } = yield this.AuthService.signin(email, password);
                res.cookie('refreshToken', refreshToken, {
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    secure: true,
                    httpOnly: true,
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                });
                res.cookie('isAuthenticated', true, {
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    secure: true,
                    httpOnly: false,
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                });
                res.json(new success_middleware_1.default('משתמש התחבר בהצלחה', {
                    accessToken,
                }));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.refreshToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body.user;
                yield (0, validateDBId_1.default)(id);
                const { accessToken, refreshToken } = yield this.AuthService.refreshToken(id);
                res.cookie('refreshToken', refreshToken, {
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    secure: true,
                    httpOnly: true,
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                });
                res.cookie('isAuthenticated', true, {
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    secure: true,
                    httpOnly: false,
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                });
                res.json(new success_middleware_1.default('נוצר טוקן חדש בהצלחה', {
                    accessToken,
                }));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.signout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.body.user;
                yield this.AuthService.signout(_id);
                res.clearCookie('refreshToken');
                res.clearCookie('isAuthenticated');
                res.json(new success_middleware_1.default('משתמש התנתק בהצלחה'));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body.user;
                yield (0, validateDBId_1.default)(id);
                const { user } = yield this.AuthService.getUser(id);
                res.json(new success_middleware_1.default('משתמש נמצא בהצלחה', {
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                    },
                }));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/signup`, (0, validation_middleware_1.default)(auth_validation_1.default.signup), this.signup);
        this.router.post(`${this.path}/signin`, 
        // loginLimiter,
        (0, validation_middleware_1.default)(auth_validation_1.default.signin), this.signin);
        this.router.get(`${this.path}/refresh-token`, auth_middleware_1.verifyRefreshTokenMiddleware, this.refreshToken);
        this.router.get(`${this.path}/signout`, auth_middleware_1.authMiddleware, this.signout);
        this.router.get(`${this.path}/get-user`, auth_middleware_1.authMiddleware, this.getUser);
    }
}
exports.default = AuthController;
