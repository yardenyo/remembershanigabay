"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createEvent = joi_1.default.object({
    title: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    time: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().allow(null, ''),
});
const updateEvent = joi_1.default.object({
    title: joi_1.default.string(),
    date: joi_1.default.date(),
    time: joi_1.default.string(),
    location: joi_1.default.string(),
    description: joi_1.default.string(),
    image: joi_1.default.string(),
});
const deleteEvent = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.default = { createEvent, updateEvent, deleteEvent };
