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
const media_model_1 = __importDefault(require("@/resources/media/media.model"));
const convertresponse_helper_1 = __importDefault(require("@/utils/helpers/convertresponse.helper"));
class MediaService {
    constructor() {
        this.media = media_model_1.default;
    }
    getAllMedia(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sort, skip, limit, searchFilter } = yield (0, convertresponse_helper_1.default)(body);
                let media;
                media = yield this.media
                    .find(searchFilter)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit);
                const count = yield this.media.countDocuments();
                return { media, count };
            }
            catch (error) {
                throw new Error('שגיאה בטעינת מדיה');
            }
        });
    }
    getMediaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const media = yield this.media.findById(id);
                if (!media)
                    throw new Error();
                return media;
            }
            catch (error) {
                throw new Error('שגיאה בטעינת מדיה');
            }
        });
    }
    createMedia(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const media = yield this.media.create(Object.assign({}, body));
                yield media.save();
                return media;
            }
            catch (error) {
                throw new Error('שגיאה ביצירת מדיה');
            }
        });
    }
    updateMedia(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const media = yield this.media.findByIdAndUpdate(id, Object.assign({}, body));
                if (!media)
                    throw new Error();
                yield media.save();
                return media;
            }
            catch (error) {
                throw new Error('שגיאה בעדכון מדיה');
            }
        });
    }
    deleteMedia(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.media.findByIdAndDelete(id);
            }
            catch (error) {
                throw new Error('שגיאה במחיקת מדיה');
            }
        });
    }
}
exports.default = MediaService;
