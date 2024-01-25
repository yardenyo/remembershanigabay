import {
  authMiddleware,
  verifyRefreshTokenMiddleware,
} from "@/middleware/auth.middleware";
import loginLimiter from "@/middleware/loginLimiter.middleware";
import SuccessResponse from "@/middleware/success.middleware";
import validationMiddleware from "@/middleware/validation.middleware";
import AuthService from "@/resources/auth/auth.service";
import validate from "@/resources/auth/auth.validation";
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/controller.interface";
import validateDBId from "@/utils/validateDBId";
import { NextFunction, Request, Response, Router } from "express";

class AuthController implements Controller {
  public path = "/auth";
  public router = Router();
  private AuthService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/signup`,
      validationMiddleware(validate.signup),
      this.signup,
    );
    this.router.post(
      `${this.path}/signin`,
      loginLimiter,
      validationMiddleware(validate.signin),
      this.signin,
    );
    this.router.get(
      `${this.path}/refresh-token`,
      verifyRefreshTokenMiddleware,
      this.refreshToken,
    );
    this.router.get(`${this.path}/signout`, authMiddleware, this.signout);
  }

  private signup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.AuthService.signup(req.body);

      res.json(
        new SuccessResponse("User created successfully", {
          id: user._id,
          email: user.email,
        }),
      );
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private signin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await this.AuthService.signin(
        email,
        password,
      );

      res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });

      res.cookie("isAuthenticated", true, {
        secure: true,
        httpOnly: false,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });

      res.json(
        new SuccessResponse("User signed in successfully", {
          accessToken,
        }),
      );
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.body.user;
      await validateDBId(id);
      const { accessToken, refreshToken } =
        await this.AuthService.refreshToken(id);

      res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });

      res.cookie("isAuthenticated", true, {
        secure: true,
        httpOnly: false,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });

      res.json(
        new SuccessResponse("Token refreshed successfully", {
          accessToken,
        }),
      );
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private signout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { _id } = req.body.user;
      await this.AuthService.signout(_id);

      res.clearCookie("refreshToken");

      res.clearCookie("isAuthenticated");

      res.json(new SuccessResponse("User signed out successfully"));
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default AuthController;
