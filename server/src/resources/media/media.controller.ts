import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/media/media.validation';
import MediaService from '@/resources/media/media.service';
import { authMiddleware } from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class MediaController implements Controller {
    public path = '/media';
    public router = Router();
    private mediaService = new MediaService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}`, this.getAllMedia);
        this.router.get(`${this.path}/:id`, this.getMediaById);
        this.router.post(
            `${this.path}/create`,
            authMiddleware,
            validationMiddleware(validate.createMedia),
            this.createMedia,
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware,
            validationMiddleware(validate.updateMedia),
            this.updateMedia,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            this.deleteMedia,
        );
    }

    private getAllMedia = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { media, count } = await this.mediaService.getAllMedia(
                req.body,
            );
            res.json(
                new SuccessResponse('מדיה נטענה בהצלחה', { media, count }),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getMediaById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await validateDBId(id);
            const media = await this.mediaService.getMediaById(id);
            res.json(new SuccessResponse('מדיה נטענה בהצלחה', media));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private createMedia = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const media = await this.mediaService.createMedia(req.body);
            res.json(new SuccessResponse('מדיה נוצרה בהצלחה', media));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateMedia = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await validateDBId(id);
            const media = await this.mediaService.updateMedia(id, req.body);
            res.json(new SuccessResponse('מדיה עודכנה בהצלחה', media));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteMedia = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await validateDBId(id);
            await this.mediaService.deleteMedia(id);
            res.json(new SuccessResponse('מדיה נמחקה בהצלחה'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default MediaController;
