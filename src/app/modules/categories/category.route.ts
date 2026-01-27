import { Router } from "express";

import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { createCategoryZodSchema } from "./category.validation";
import { CategoryControllers } from "./category.controller";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN),
  validateRequest(createCategoryZodSchema),
  CategoryControllers.createCategory,
);

router.get("/all", CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
