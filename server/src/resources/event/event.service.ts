import Event from '@/resources/event/event.interface';
import EventModel from '@/resources/event/event.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';

class EventService {
    private event = EventModel;

    public async getAllEvents(body: PostBody): Promise<{
        events: Event[];
        count: number;
    }> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            let events;

            if (body.showPastRecords) {
                events = await this.event
                    .find(searchFilter)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit);
            } else {
                events = await this.event
                    .find({ date: { $gte: new Date() } })
                    .find(searchFilter)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit);
            }

            const count = await this.event.countDocuments();

            return { events, count };
        } catch (error) {
            throw new Error('שגיאה בטעינת אירועים');
        }
    }

    public async getEventById(id: string): Promise<Event> {
        try {
            const event = await this.event.findById(id);
            if (!event) throw new Error();

            return event;
        } catch (error) {
            throw new Error('שגיאה בטעינת אירוע');
        }
    }

    public async createEvent(body: PostBody): Promise<Event> {
        try {
            const event = await this.event.create({
                ...body,
            });

            await event.save();

            return event;
        } catch (error) {
            throw new Error('שגיאה ביצירת אירוע');
        }
    }

    public async updateEvent(id: string, body: PostBody): Promise<Event> {
        try {
            const event = await this.event.findByIdAndUpdate(id, {
                ...body,
            });

            if (!event) throw new Error();

            await event.save();

            return event;
        } catch (error) {
            throw new Error('שגיאה בעדכון אירוע');
        }
    }

    public async deleteEvent(id: string): Promise<void> {
        try {
            await this.event.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('שגיאה במחיקת אירוע');
        }
    }
}

export default EventService;
