import { Schema, model } from 'mongoose';
import Media from '@/resources/media/media.interface';

const MediaSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            maxLength: 30,
            minLength: 3,
        },
        url: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const MediaModel = model<Media>('Media', MediaSchema);

export default MediaModel;
