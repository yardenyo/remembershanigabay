import { Schema, model } from 'mongoose';
import Media, { MediaType } from '@/resources/media/media.interface';

const MediaSchema = new Schema(
    {
        type: {
            type: String,
            enum: [MediaType.IMAGE, MediaType.VIDEO],
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
    },
    { timestamps: true },
);

const MediaModel = model<Media>('Media', MediaSchema);

export default MediaModel;
