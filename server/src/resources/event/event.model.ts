import { Schema, model } from 'mongoose';
import Event from '@/resources/event/event.interface';

const EventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true },
);

const EventModel = model<Event>('Event', EventSchema);

export default EventModel;
