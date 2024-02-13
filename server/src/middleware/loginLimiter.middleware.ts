import HttpException from '@/utils/exceptions/http.exception';
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'יותר מדי ניסיונות התחברות, אנא נסה שוב אחרי 15 דקות',
    handler: (req, res, next, options) => {
        next(new HttpException(429, options.message));
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default loginLimiter;
