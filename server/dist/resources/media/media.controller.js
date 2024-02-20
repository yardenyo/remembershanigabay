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
const express_1 = require("express");
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const success_middleware_1 = __importDefault(require("@/middleware/success.middleware"));
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const media_validation_1 = __importDefault(require("@/resources/media/media.validation"));
const media_service_1 = __importDefault(require("@/resources/media/media.service"));
const auth_middleware_1 = require("@/middleware/auth.middleware");
const validateDBId_1 = __importDefault(require("@/utils/validateDBId"));
class MediaController {
    constructor() {
        this.path = '/media';
        this.router = (0, express_1.Router)();
        this.mediaService = new media_service_1.default();
        this.getAllMedia = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { media, count } = yield this.mediaService.getAllMedia(req.body);
                res.json(new success_middleware_1.default('מדיה נטענה בהצלחה', { media, count }));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getMediaById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield (0, validateDBId_1.default)(id);
                const media = yield this.mediaService.getMediaById(id);
                res.json(new success_middleware_1.default('מדיה נטענה בהצלחה', media));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.createMedia = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const media = yield this.mediaService.createMedia(req.body);
                res.json(new success_middleware_1.default('מדיה נוצרה בהצלחה', media));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.updateMedia = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield (0, validateDBId_1.default)(id);
                const media = yield this.mediaService.updateMedia(id, req.body);
                res.json(new success_middleware_1.default('מדיה עודכנה בהצלחה', media));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.deleteMedia = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield (0, validateDBId_1.default)(id);
                yield this.mediaService.deleteMedia(id);
                res.json(new success_middleware_1.default('מדיה נמחקה בהצלחה'));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, this.getAllMedia);
        this.router.get(`${this.path}/:id`, this.getMediaById);
        this.router.post(`${this.path}/create`, auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(media_validation_1.default.createMedia), this.createMedia);
        this.router.put(`${this.path}/:id`, auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(media_validation_1.default.updateMedia), this.updateMedia);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.authMiddleware, this.deleteMedia);
    }
}
exports.default = MediaController;
