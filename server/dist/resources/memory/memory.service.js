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
const memory_model_1 = __importDefault(require("@/resources/memory/memory.model"));
const convertresponse_helper_1 = __importDefault(require("@/utils/helpers/convertresponse.helper"));
class MemoryService {
    constructor() {
        this.memory = memory_model_1.default;
    }
    getAllMemories(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sort, skip, limit, searchFilter } = yield (0, convertresponse_helper_1.default)(body);
                const memories = yield this.memory
                    .find(searchFilter)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit);
                const count = yield this.memory.countDocuments();
                return { memories, count };
            }
            catch (error) {
                throw new Error('שגיאה בטעינת זכרונות');
            }
        });
    }
    getMemoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memory = yield this.memory.findById(id);
                if (!memory)
                    throw new Error();
                return memory;
            }
            catch (error) {
                throw new Error('שגיאה בטעינת זיכרון');
            }
        });
    }
    createMemory(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memory = yield this.memory.create(Object.assign({}, body));
                yield memory.save();
                return memory;
            }
            catch (error) {
                throw new Error('שגיאה ביצירת זיכרון');
            }
        });
    }
    updateMemory(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memory = yield this.memory.findByIdAndUpdate(id, Object.assign({}, body));
                if (!memory)
                    throw new Error();
                yield memory.save();
                return memory;
            }
            catch (error) {
                throw new Error('שגיאה בעדכון זיכרון');
            }
        });
    }
    deleteMemory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memory = yield this.memory.findByIdAndDelete(id);
                if (!memory)
                    throw new Error();
                return memory;
            }
            catch (error) {
                throw new Error('שגיאה במחיקת זיכרון');
            }
        });
    }
}
exports.default = MemoryService;
