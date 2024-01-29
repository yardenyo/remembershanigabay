import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import authController from '@/resources/auth/auth.controller';
import userController from '@/resources/user/user.controller';
import eventController from '@/resources/event/event.controller';

validateEnv();

const app = new App(
    [new authController(), new userController(), new eventController()],
    Number(process.env.PORT),
);

app.listen();
