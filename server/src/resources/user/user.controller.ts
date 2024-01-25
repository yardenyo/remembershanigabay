import { authMiddleware } from "@/middleware/auth.middleware";
import SuccessResponse from "@/middleware/success.middleware";
import UserService from "@/resources/user/user.service";
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/controller.interface";
import validateDBId from "@/utils/validateDBId";
import { NextFunction, Request, Response, Router } from "express";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}`, authMiddleware, this.getAllUsers);
    this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
  }

  private getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const users = await this.UserService.getAllUsers(req.body);
      res.json(new SuccessResponse("Users fetched successfully", users));
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await validateDBId(id);
      const user = await this.UserService.getUserById(id);
      res.json(new SuccessResponse("User fetched successfully", user));
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
