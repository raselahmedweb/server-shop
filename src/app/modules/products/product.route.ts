import { Router } from "express";

import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { createProductZodSchema } from "./product.validation";
import { ProductControllers } from "./product.controller";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN),
  validateRequest(createProductZodSchema),
  ProductControllers.createProduct,
);

router.get("/all", ProductControllers.getAllProducts);

export const ProductRoutes = router;
