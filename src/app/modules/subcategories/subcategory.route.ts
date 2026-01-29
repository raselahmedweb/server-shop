import { Router } from "express";

// import { validateRequest } from "../../middlewares/validateRequest";
// import { checkAuth } from "../../middlewares/checkAuth";
// import { createSubCategoryZodSchema } from "./subcategory.validation";
import { SubCategoryControllers } from "./subcategory.controller";
// import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/create",
  // checkAuth(Role.ADMIN),
  // validateRequest(createSubCategoryZodSchema),
  SubCategoryControllers.createSubCategory,
);

router.get("/all", SubCategoryControllers.getAllSubCategories);

export const SubCategoryRoutes = router;
