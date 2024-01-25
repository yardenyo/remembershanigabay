import "dotenv/config";
import "module-alias/register";
import App from "./app";
import validateEnv from "@/utils/validateEnv";
import AuthController from "@/resources/auth/auth.controller";
import UserController from "@/resources/user/user.controller";

validateEnv();

const app = new App(
  [new AuthController(), new UserController()],
  Number(process.env.PORT),
);

app.listen();
