"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createMemory = joi_1.default.object({
    name: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    quote: joi_1.default.string().required(),
    image: joi_1.default.string().allow(null, ''),
});
const updateMemory = joi_1.default.object({
    name: joi_1.default.string(),
    title: joi_1.default.string(),
    quote: joi_1.default.string(),
    image: joi_1.default.string(),
});
const deleteMemory = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.default = { createMemory, updateMemory, deleteMemory };
