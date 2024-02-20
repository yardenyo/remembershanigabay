"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const media_interface_1 = require("@/resources/media/media.interface");
const MediaSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: [media_interface_1.MediaType.IMAGE, media_interface_1.MediaType.VIDEO],
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxLength: 40,
        minLength: 3,
    },
    url: {
        type: String,
    },
}, { timestamps: true });
const MediaModel = (0, mongoose_1.model)('Media', MediaSchema);
exports.default = MediaModel;
