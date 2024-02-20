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
const candle_validation_1 = __importDefault(require("@/resources/candle/candle.validation"));
const candle_service_1 = __importDefault(require("@/resources/candle/candle.service"));
const auth_middleware_1 = require("@/middleware/auth.middleware");
const validateDBId_1 = __importDefault(require("@/utils/validateDBId"));
class CandleController {
    constructor() {
        this.path = '/candles';
        this.router = (0, express_1.Router)();
        this.candleService = new candle_service_1.default();
        this.getAllCandles = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { candles, count } = yield this.candleService.getAllCandles(req.body);
                res.json(new success_middleware_1.default('נרות נטענו בהצלחה', { candles, count }));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getCandleById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const candle = yield this.candleService.getCandleById(req.params.id);
                res.json(new success_middleware_1.default('נר נטען בהצלחה', candle));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.createCandle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const candle = yield this.candleService.createCandle(req.body);
                res.json(new success_middleware_1.default('נר נדלק בהצלחה', candle));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.updateCandle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validateDBId_1.default)(req.params.id);
                const candle = yield this.candleService.updateCandle(req.params.id, req.body);
                res.json(new success_middleware_1.default('נר עודכן בהצלחה', candle));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.deleteCandle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validateDBId_1.default)(req.params.id);
                yield this.candleService.deleteCandle(req.params.id);
                res.json(new success_middleware_1.default('נר נמחק בהצלחה'));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, this.getAllCandles);
        this.router.get(`${this.path}/:id`, this.getCandleById);
        this.router.post(`${this.path}/create`, (0, validation_middleware_1.default)(candle_validation_1.default.createCandle), this.createCandle);
        this.router.put(`${this.path}/:id`, auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(candle_validation_1.default.updateCandle), this.updateCandle);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.authMiddleware, this.deleteCandle);
    }
}
exports.default = CandleController;
