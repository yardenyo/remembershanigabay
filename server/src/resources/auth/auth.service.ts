import User from '@/resources/user/user.interface';
import userModel from '@/resources/user/user.model';
import redisClient from '@/utils/config/redisConfig';
import { generateToken } from '@/utils/jwtToken';
import { generateRefreshToken } from '@/utils/refreshToken';

class AuthService {
    private user = userModel;
    private redis = redisClient;

    public async signup(body: User): Promise<User> {
        try {
            const { email } = body;
            const emailExists = await this.user.findOne({ email });
            if (emailExists) throw new Error();

            const user = await this.user.create({
                ...body,
            });

            await user.save();

            return user;
        } catch (error) {
            throw new Error('שגיאה ביצירת משתמש');
        }
    }

    public async signin(
        email: string,
        password: string,
    ): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        try {
            const user = await this.user.findOne({ email });
            if (!user) throw new Error();

            const isValidPassword = await user.isValidPassword(password);
            if (!isValidPassword) throw new Error();

            const accessToken = generateToken(user._id);
            const refreshToken = generateRefreshToken(user._id);

            await this.redis.set(
                user._id.toString(),
                JSON.stringify({ token: refreshToken }),
            );

            await this.redis.expire(user._id.toString(), 60 * 60);

            return { accessToken, refreshToken };
        } catch (error) {
            throw new Error('שגיאה בהתחברות');
        }
    }

    public async refreshToken(id: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        try {
            if (!id) throw new Error();
            const accessToken = generateToken(id);
            const refreshToken = generateRefreshToken(id);

            await this.redis.set(
                id.toString(),
                JSON.stringify({ token: refreshToken }),
            );

            await this.redis.expire(id.toString(), 60 * 60);

            return { accessToken, refreshToken };
        } catch (error) {
            throw new Error('שגיאה ביצירת טוקן חדש');
        }
    }

    public async signout(id: string): Promise<void> {
        try {
            if (!id) throw new Error();
            await this.redis.del(id.toString());
        } catch (error) {
            throw new Error('שגיאה בהתנתקות');
        }
    }

    public async getUser(id: string): Promise<{
        user: User;
    }> {
        try {
            if (!id) throw new Error();
            const user = await this.user.findById(id);
            if (!user) throw new Error();

            return { user };
        } catch (error) {
            throw new Error('שגיאה בקבלת פרטי משתמש');
        }
    }
}

export default AuthService;
