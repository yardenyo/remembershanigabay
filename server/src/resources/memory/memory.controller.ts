import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/memory/memory.validation';
import MemoryService from '@/resources/memory/memory.service';
import { authMiddleware } from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class MemoryController implements Controller {
    public path = '/memories';
    public router = Router();
    private memoryService = new MemoryService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}`, this.getAllMemories);
        this.router.get(`${this.path}/:id`, this.getMemoryById);
        this.router.post(
            `${this.path}/create`,
            authMiddleware,
            validationMiddleware(validate.createMemory),
            this.createMemory,
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware,
            validationMiddleware(validate.updateMemory),
            this.updateMemory,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            this.deleteMemory,
        );
    }

    private getAllMemories = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const memories = await this.memoryService.getAllMemories(req.body);
            res.json(new SuccessResponse('זיכרונות נטענו בהצלחה', memories));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getMemoryById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            validateDBId(req.params.id);
            const memory = await this.memoryService.getMemoryById(
                req.params.id,
            );
            res.json(new SuccessResponse('זיכרון נטען בהצלחה', memory));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private createMemory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const memory = await this.memoryService.createMemory(req.body);
            res.json(new SuccessResponse('זיכרון נוצר בהצלחה', memory));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateMemory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            validateDBId(req.params.id);
            const memory = await this.memoryService.updateMemory(
                req.params.id,
                req.body,
            );
            res.json(new SuccessResponse('זיכרון עודכן בהצלחה', memory));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteMemory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            validateDBId(req.params.id);
            await this.memoryService.deleteMemory(req.params.id);
            res.json(new SuccessResponse('זיכרון נמחק בהצלחה'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default MemoryController;
