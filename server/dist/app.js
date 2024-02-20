"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = __importDefault(require("@/middleware/error.middleware"));
const notFound_middleware_1 = __importDefault(require("@/middleware/notFound.middleware"));
const redisConfig_1 = __importDefault(require("@/utils/config/redisConfig"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeDatabaseConnection();
        this.initializeRedisConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.initialize404Handling();
    }
    initializeMiddleware() {
        this.express.use((0, helmet_1.default)());
        this.express.set('trust proxy', 1);
        this.express.use((0, cors_1.default)({
            origin: process.env.NODE_ENV === 'production'
                ? process.env.PROD_ORIGIN
                : process.env.LOCAL_ORIGIN,
            credentials: true,
        }));
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
        this.express.use((0, cookie_parser_1.default)());
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
    }
    initializeErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    initialize404Handling() {
        this.express.use(notFound_middleware_1.default);
    }
    initializeDatabaseConnection() {
        mongoose_1.default.connect(process.env.MONGODB_URI);
    }
    initializeRedisConnection() {
        redisConfig_1.default.connect();
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
