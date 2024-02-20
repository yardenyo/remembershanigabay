"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CandleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const CandleModel = (0, mongoose_1.model)('Candle', CandleSchema);
exports.default = CandleModel;
