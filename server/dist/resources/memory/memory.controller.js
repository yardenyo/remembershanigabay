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
const memory_validation_1 = __importDefault(require("@/resources/memory/memory.validation"));
const memory_service_1 = __importDefault(require("@/resources/memory/memory.service"));
const auth_middleware_1 = require("@/middleware/auth.middleware");
const validateDBId_1 = __importDefault(require("@/utils/validateDBId"));
class MemoryController {
    constructor() {
        this.path = '/memories';
        this.router = (0, express_1.Router)();
        this.memoryService = new memory_service_1.default();
        this.getAllMemories = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { memories, count } = yield this.memoryService.getAllMemories(req.body);
                res.json(new success_middleware_1.default('זכרונות נטענו בהצלחה', {
                    memories,
                    count,
                }));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getMemoryById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validateDBId_1.default)(req.params.id);
                const memory = yield this.memoryService.getMemoryById(req.params.id);
                res.json(new success_middleware_1.default('זיכרון נטען בהצלחה', memory));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.createMemory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const memory = yield this.memoryService.createMemory(req.body);
                res.json(new success_middleware_1.default('זיכרון נוצר בהצלחה', memory));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.updateMemory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validateDBId_1.default)(req.params.id);
                const memory = yield this.memoryService.updateMemory(req.params.id, req.body);
                res.json(new success_middleware_1.default('זיכרון עודכן בהצלחה', memory));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.deleteMemory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validateDBId_1.default)(req.params.id);
                yield this.memoryService.deleteMemory(req.params.id);
                res.json(new success_middleware_1.default('זיכרון נמחק בהצלחה'));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, this.getAllMemories);
        this.router.get(`${this.path}/:id`, this.getMemoryById);
        this.router.post(`${this.path}/create`, auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(memory_validation_1.default.createMemory), this.createMemory);
        this.router.put(`${this.path}/:id`, auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(memory_validation_1.default.updateMemory), this.updateMemory);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.authMiddleware, this.deleteMemory);
    }
}
exports.default = MemoryController;
