import { Document } from 'mongoose';

export default interface Media extends Document {
    type: String;
    title: String;
    url: String;
}
