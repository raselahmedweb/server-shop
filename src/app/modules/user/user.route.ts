import { Router } from "express";
import { UserControllers } from "./user.controller";
import {
  createUserZodSchema,
  updateUserByAdminZodSchema,
  updateUserZodSchema,
} from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser,
);
router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  validateRequest(updateUserZodSchema),
  UserControllers.updateUser,
);
router.patch(
  "/by-admin/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateUserByAdminZodSchema),
  UserControllers.updateUser,
);
router.get("/all-users", checkAuth(Role.ADMIN), UserControllers.getAllUsers);

export const UserRoutes = router;
