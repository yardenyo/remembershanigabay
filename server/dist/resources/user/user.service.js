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
const user_model_1 = __importDefault(require("@/resources/user/user.model"));
const convertresponse_helper_1 = __importDefault(require("@/utils/helpers/convertresponse.helper"));
class UserService {
    constructor() {
        this.user = user_model_1.default;
    }
    getAllUsers(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sort, skip, limit, searchFilter } = yield (0, convertresponse_helper_1.default)(body);
                const users = yield this.user
                    .find(searchFilter)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit);
                return users;
            }
            catch (error) {
                throw new Error("Error getting users");
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.findById(id);
                if (!user)
                    throw new Error();
                return user;
            }
            catch (error) {
                throw new Error("Error getting user");
            }
        });
    }
}
exports.default = UserService;
