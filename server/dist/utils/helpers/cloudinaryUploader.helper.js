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
const cloudinaryConfig_1 = require("@/utils/config/cloudinaryConfig");
const fs_1 = __importDefault(require("fs"));
exports.default = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const imageLinks = [];
    for (const file of files) {
        const image = yield (0, cloudinaryConfig_1.cloudinaryUploadImage)(file.path);
        imageLinks.push(image.url);
        fs_1.default.unlinkSync(file.path);
    }
    return imageLinks;
});
