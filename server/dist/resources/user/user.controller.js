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
const user_service_1 = __importDefault(require("@/resources/user/user.service"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const validateDBId_1 = __importDefault(require("@/utils/validateDBId"));
const express_1 = require("express");
class UserController {
    constructor() {
        this.path = "/users";
        this.router = (0, express_1.Router)();
        this.UserService = new user_service_1.default();
        this.getAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.UserService.getAllUsers(req.body);
                res.json(new success_middleware_1.default("Users fetched successfully", users));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield (0, validateDBId_1.default)(id);
                const user = yield this.UserService.getUserById(id);
                res.json(new success_middleware_1.default("User fetched successfully", user));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, auth_middleware_1.authMiddleware, this.getAllUsers);
        this.router.get(`${this.path}/:id`, auth_middleware_1.authMiddleware, this.getUserById);
    }
}
exports.default = UserController;
