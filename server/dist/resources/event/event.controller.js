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
const event_validation_1 = __importDefault(require("@/resources/event/event.validation"));
const event_service_1 = __importDefault(require("@/resources/event/event.service"));
const auth_middleware_1 = require("@/middleware/auth.middleware");
const validateDBId_1 = __importDefault(require("@/utils/validateDBId"));
class EventController {
    constructor() {
        this.path = '/events';
        this.router = (0, express_1.Router)();
        this.eventService = new event_service_1.default();
        this.getAllEvents = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { events, count } = yield this.eventService.getAllEvents(req.body);
                res.json(new success_middleware_1.default('אירועים נטענו בהצלחה', { events, count }));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getEventById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield (0, validateDBId_1.default)(id);
                const event = yield this.eventService.getEventById(id);
                res.json(new success_middleware_1.default('אירוע נטען בהצלחה', event));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.createEvent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.eventService.createEvent(req.body);
                res.json(new success_middleware_1.default('אירוע נוצר בהצלחה', event));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.updateEvent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield (0, validateDBId_1.default)(id);
                const event = yield this.eventService.updateEvent(id, req.body);
                res.json(new success_middleware_1.default('אירוע עודכן בהצלחה', event));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.deleteEvent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield (0, validateDBId_1.default)(id);
                yield this.eventService.deleteEvent(id);
                res.json(new success_middleware_1.default('אירוע נמחק בהצלחה'));
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, this.getAllEvents);
        this.router.get(`${this.path}/:id`, this.getEventById);
        this.router.post(`${this.path}/create`, auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(event_validation_1.default.createEvent), this.createEvent);
        this.router.put(`${this.path}/:id`, auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(event_validation_1.default.updateEvent), this.updateEvent);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.authMiddleware, this.deleteEvent);
    }
}
exports.default = EventController;
