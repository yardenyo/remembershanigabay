"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MemorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    quote: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
}, { timestamps: true });
const MemoryModel = (0, mongoose_1.model)('Memory', MemorySchema);
exports.default = MemoryModel;
