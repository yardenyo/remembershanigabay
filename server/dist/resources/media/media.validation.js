"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const media_interface_1 = require("@/resources/media/media.interface");
const createMedia = joi_1.default.object({
    type: joi_1.default.string().valid(media_interface_1.MediaType.IMAGE, media_interface_1.MediaType.VIDEO).required(),
    title: joi_1.default.string().min(3).max(40).required(),
    url: joi_1.default.string().allow(null, ''),
});
const updateMedia = joi_1.default.object({
    type: joi_1.default.string().valid(media_interface_1.MediaType.IMAGE, media_interface_1.MediaType.VIDEO),
    title: joi_1.default.string().min(3).max(40),
    url: joi_1.default.string(),
});
const deleteMedia = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.default = { createMedia, updateMedia, deleteMedia };
