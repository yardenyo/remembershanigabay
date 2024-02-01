import { Document } from 'mongoose';

export default interface Memory extends Document {
    name: string;
    title: string;
    quote: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}
