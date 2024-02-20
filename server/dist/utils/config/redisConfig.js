"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});
redisClient.on("connect", () => {
    console.log("Connected to Redis");
});
redisClient.on("error", (err) => {
    console.log(err.message);
});
redisClient.on("ready", () => {
    console.log("Redis is ready");
});
redisClient.on("end", () => {
    console.log("Redis connection ended");
});
process.on("SIGINT", () => {
    redisClient.quit();
});
exports.default = redisClient;
