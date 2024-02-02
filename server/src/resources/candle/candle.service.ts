import Candle from '@/resources/candle/candle.interface';
import CandleModel from '@/resources/candle/candle.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';

class CandleService {
    private candle = CandleModel;

    public async getAllCandles(body: PostBody): Promise<Candle[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const candles = await this.candle
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return candles;
        } catch (error) {
            throw new Error('שגיאה בטעינת נרות');
        }
    }

    public async getCandleById(id: string): Promise<Candle> {
        try {
            const candle = await this.candle.findById(id);
            if (!candle) throw new Error();

            return candle;
        } catch (error) {
            throw new Error('שגיאה בטעינת נר');
        }
    }

    public async createCandle(body: PostBody): Promise<Candle> {
        try {
            const candle = await this.candle.create({
                ...body,
            });

            await candle.save();

            return candle;
        } catch (error) {
            throw new Error('שגיאה ביצירת נר');
        }
    }

    public async updateCandle(id: string, body: PostBody): Promise<Candle> {
        try {
            const candle = await this.candle.findByIdAndUpdate(id, {
                ...body,
            });

            if (!candle) throw new Error();

            await candle.save();

            return candle;
        } catch (error) {
            throw new Error('שגיאה בעדכון נר');
        }
    }

    public async deleteCandle(id: string): Promise<Candle> {
        try {
            const candle = await this.candle.findByIdAndDelete(id);
            if (!candle) throw new Error();

            return candle;
        } catch (error) {
            throw new Error('שגיאה במחיקת נר');
        }
    }
}

export default CandleService;
