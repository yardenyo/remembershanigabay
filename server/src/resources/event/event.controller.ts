import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/event/event.validation';
import EventService from '@/resources/event/event.service';
import { authMiddleware } from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class EventController implements Controller {
    public path = '/events';
    public router = Router();
    private eventService = new EventService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}`, this.getAllEvents);
        this.router.get(`${this.path}/:id`, this.getEventById);
        this.router.post(
            `${this.path}/create`,
            authMiddleware,
            validationMiddleware(validate.createEvent),
            this.createEvent,
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware,
            validationMiddleware(validate.updateEvent),
            this.updateEvent,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            this.deleteEvent,
        );
    }

    private getAllEvents = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const events = await this.eventService.getAllEvents(req.body);
            res.json(new SuccessResponse('אירועים נטענו בהצלחה', events));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getEventById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await validateDBId(id);
            const event = await this.eventService.getEventById(id);
            res.json(new SuccessResponse('אירוע נטען בהצלחה', event));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private createEvent = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const event = await this.eventService.createEvent(req.body);
            res.json(new SuccessResponse('אירוע נוצר בהצלחה', event));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateEvent = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await validateDBId(id);
            const event = await this.eventService.updateEvent(id, req.body);
            res.json(new SuccessResponse('אירוע עודכן בהצלחה', event));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteEvent = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await validateDBId(id);
            await this.eventService.deleteEvent(id);
            res.json(new SuccessResponse('אירוע נמחק בהצלחה'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default EventController;
