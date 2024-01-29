import { Document } from 'mongoose';

export default interface Event extends Document {
    title: string;
    date: Date;
    time: string;
    location: string;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}
