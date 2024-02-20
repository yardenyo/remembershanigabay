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
const redisConfig_1 = __importDefault(require("@/utils/config/redisConfig"));
const jwtToken_1 = require("@/utils/jwtToken");
const refreshToken_1 = require("@/utils/refreshToken");
class AuthService {
    constructor() {
        this.user = user_model_1.default;
        this.redis = redisConfig_1.default;
    }
    signup(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = body;
                const emailExists = yield this.user.findOne({ email });
                if (emailExists)
                    throw new Error();
                const user = yield this.user.create(Object.assign({}, body));
                yield user.save();
                return user;
            }
            catch (error) {
                throw new Error('שגיאה ביצירת משתמש');
            }
        });
    }
    signin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.findOne({ email });
                if (!user)
                    throw new Error();
                const isValidPassword = yield user.isValidPassword(password);
                if (!isValidPassword)
                    throw new Error();
                const accessToken = (0, jwtToken_1.generateToken)(user._id);
                const refreshToken = (0, refreshToken_1.generateRefreshToken)(user._id);
                yield this.redis.set(user._id.toString(), JSON.stringify({ token: refreshToken }));
                yield this.redis.expire(user._id.toString(), 60 * 60);
                return { accessToken, refreshToken };
            }
            catch (error) {
                throw new Error('שגיאה בהתחברות');
            }
        });
    }
    refreshToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id)
                    throw new Error();
                const accessToken = (0, jwtToken_1.generateToken)(id);
                const refreshToken = (0, refreshToken_1.generateRefreshToken)(id);
                yield this.redis.set(id.toString(), JSON.stringify({ token: refreshToken }));
                yield this.redis.expire(id.toString(), 60 * 60);
                return { accessToken, refreshToken };
            }
            catch (error) {
                throw new Error('שגיאה ביצירת טוקן חדש');
            }
        });
    }
    signout(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id)
                    throw new Error();
                yield this.redis.del(id.toString());
            }
            catch (error) {
                throw new Error('שגיאה בהתנתקות');
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id)
                    throw new Error();
                const user = yield this.user.findById(id);
                if (!user)
                    throw new Error();
                return { user };
            }
            catch (error) {
                throw new Error('שגיאה בקבלת פרטי משתמש');
            }
        });
    }
}
exports.default = AuthService;
