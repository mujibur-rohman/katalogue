import { Router } from "express";
import authController from "../controller/auth.controller";

export const AuthRouter: Router = Router();

AuthRouter.post("/", authController.login);
AuthRouter.post("/register", authController.register);
AuthRouter.post("/refreshToken", authController.refreshToken);

export default AuthRouter;
