"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const candle_model_1 = __importDefault(require("@/resources/candle/candle.model"));
const convertresponse_helper_1 = __importDefault(require("@/utils/helpers/convertresponse.helper"));
class CandleService {
    constructor() {
        this.candle = candle_model_1.default;
    }
    getAllCandles(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sort, skip, limit, searchFilter } = yield (0, convertresponse_helper_1.default)(body);
                const candles = yield this.candle
                    .find(searchFilter)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit);
                const count = yield this.candle.countDocuments();
                return { candles, count };
            }
            catch (error) {
                throw new Error('שגיאה בטעינת נרות');
            }
        });
    }
    getCandleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candle = yield this.candle.findById(id);
                if (!candle)
                    throw new Error();
                return candle;
            }
            catch (error) {
                throw new Error('שגיאה בטעינת נר');
            }
        });
    }
    createCandle(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candle = yield this.candle.create(Object.assign({}, body));
                yield candle.save();
                return candle;
            }
            catch (error) {
                throw new Error('שגיאה ביצירת נר');
            }
        });
    }
    updateCandle(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candle = yield this.candle.findByIdAndUpdate(id, Object.assign({}, body));
                if (!candle)
                    throw new Error();
                yield candle.save();
                return candle;
            }
            catch (error) {
                throw new Error('שגיאה בעדכון נר');
            }
        });
    }
    deleteCandle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candle = yield this.candle.findByIdAndDelete(id);
                if (!candle)
                    throw new Error();
                return candle;
            }
            catch (error) {
                throw new Error('שגיאה במחיקת נר');
            }
        });
    }
}
exports.default = CandleService;
