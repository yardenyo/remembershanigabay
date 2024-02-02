import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/candle/candle.validation';
import CandleService from '@/resources/candle/candle.service';
import { authMiddleware } from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class CandleController implements Controller {
    public path = '/candles';
    public router = Router();
    private candleService = new CandleService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}`, this.getAllCandles);
        this.router.get(`${this.path}/:id`, this.getCandleById);
        this.router.post(
            `${this.path}/create`,
            authMiddleware,
            validationMiddleware(validate.createCandle),
            this.createCandle,
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware,
            validationMiddleware(validate.updateCandle),
            this.updateCandle,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            this.deleteCandle,
        );
    }

    private getAllCandles = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { candles, count } = await this.candleService.getAllCandles(
                req.body,
            );
            res.json(
                new SuccessResponse('נרות נטענו בהצלחה', { candles, count }),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getCandleById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const candle = await this.candleService.getCandleById(
                req.params.id,
            );
            res.json(new SuccessResponse('נר נטען בהצלחה', candle));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private createCandle = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const candle = await this.candleService.createCandle(req.body);
            res.json(new SuccessResponse('נר נדלק בהצלחה', candle));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateCandle = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            validateDBId(req.params.id);
            const candle = await this.candleService.updateCandle(
                req.params.id,
                req.body,
            );
            res.json(new SuccessResponse('נר עודכן בהצלחה', candle));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteCandle = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            validateDBId(req.params.id);
            await this.candleService.deleteCandle(req.params.id);
            res.json(new SuccessResponse('נר נמחק בהצלחה'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default CandleController;
