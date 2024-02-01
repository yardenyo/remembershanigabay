import { Schema, model } from 'mongoose';
import Memory from '@/resources/memory/memory.interface';

const MemorySchema = new Schema(
    {
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
    },
    { timestamps: true },
);

const MemoryModel = model<Memory>('Memory', MemorySchema);

export default MemoryModel;
