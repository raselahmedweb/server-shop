import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { resetPasswordZodSchema } from "../user/user.validation";

const route = Router();

route.post("/login", AuthControllers.credentialsLogin);
route.get("/me", checkAuth(...Object.values(Role)), AuthControllers.me);
route.post("/refresh-token", AuthControllers.getNewAccessToken);
route.post("/logout", AuthControllers.logout);
route.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  validateRequest(resetPasswordZodSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = route;
