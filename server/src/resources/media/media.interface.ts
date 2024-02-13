import { Document } from 'mongoose';

export enum MediaType {
    IMAGE = 'image',
    VIDEO = 'video',
}

export default interface Media extends Document {
    type: MediaType;
    title: String;
    url: String;
}
