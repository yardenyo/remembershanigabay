"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        PORT: (0, envalid_1.port)({ default: 5000 }),
        MONGODB_URI: (0, envalid_1.str)(),
        REDIS_HOST: (0, envalid_1.str)(),
        REDIS_PORT: (0, envalid_1.port)(),
        REDIS_PASSWORD: (0, envalid_1.str)(),
        JWT_ACCESS_SECRET: (0, envalid_1.str)(),
        JWT_REFRESH_SECRET: (0, envalid_1.str)(),
        JWT_ACCESS_EXPIRES_IN: (0, envalid_1.str)(),
        JWT_REFRESH_EXPIRES_IN: (0, envalid_1.str)(),
        EMAIL_USER: (0, envalid_1.str)(),
        EMAIL_PASSWORD: (0, envalid_1.str)(),
        CLOUDINARY_CLOUD_NAME: (0, envalid_1.str)(),
        CLOUDINARY_API_KEY: (0, envalid_1.str)(),
        CLOUDINARY_API_SECRET: (0, envalid_1.str)(),
        LOCAL_ORIGIN: (0, envalid_1.str)(),
        PROD_ORIGIN: (0, envalid_1.str)(),
    });
}
exports.default = validateEnv;
