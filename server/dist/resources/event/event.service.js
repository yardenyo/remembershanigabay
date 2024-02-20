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
const event_model_1 = __importDefault(require("@/resources/event/event.model"));
const convertresponse_helper_1 = __importDefault(require("@/utils/helpers/convertresponse.helper"));
class EventService {
    constructor() {
        this.event = event_model_1.default;
    }
    getAllEvents(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sort, skip, limit, searchFilter } = yield (0, convertresponse_helper_1.default)(body);
                let events;
                if (body.showPastRecords) {
                    events = yield this.event
                        .find(searchFilter)
                        .sort(sort)
                        .skip(skip)
                        .limit(limit);
                }
                else {
                    events = yield this.event
                        .find({ date: { $gte: new Date() } })
                        .find(searchFilter)
                        .sort(sort)
                        .skip(skip)
                        .limit(limit);
                }
                const count = yield this.event.countDocuments();
                return { events, count };
            }
            catch (error) {
                throw new Error('שגיאה בטעינת אירועים');
            }
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.event.findById(id);
                if (!event)
                    throw new Error();
                return event;
            }
            catch (error) {
                throw new Error('שגיאה בטעינת אירוע');
            }
        });
    }
    createEvent(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.event.create(Object.assign({}, body));
                yield event.save();
                return event;
            }
            catch (error) {
                throw new Error('שגיאה ביצירת אירוע');
            }
        });
    }
    updateEvent(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.event.findByIdAndUpdate(id, Object.assign({}, body));
                if (!event)
                    throw new Error();
                yield event.save();
                return event;
            }
            catch (error) {
                throw new Error('שגיאה בעדכון אירוע');
            }
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.event.findByIdAndDelete(id);
            }
            catch (error) {
                throw new Error('שגיאה במחיקת אירוע');
            }
        });
    }
}
exports.default = EventService;
