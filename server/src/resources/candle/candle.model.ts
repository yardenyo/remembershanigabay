import { Schema, model } from 'mongoose';
import Candle from '@/resources/candle/candle.interface';

const CandleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const CandleModel = model<Candle>('Candle', CandleSchema);

export default CandleModel;
