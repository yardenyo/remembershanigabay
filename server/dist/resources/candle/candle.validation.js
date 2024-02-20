"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createCandle = joi_1.default.object({
    name: joi_1.default.string().required(),
    text: joi_1.default.string().required(),
});
const updateCandle = joi_1.default.object({
    name: joi_1.default.string(),
    text: joi_1.default.string(),
});
const deleteCandle = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.default = { createCandle, updateCandle, deleteCandle };
