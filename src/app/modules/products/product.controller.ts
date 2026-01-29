/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await ProductServices.createProduct(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Product created successfully",
      data: product,
    });
  },
);

const getAllProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ProductServices.getProducts();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Products retrieved successfully",
      data: result,
    });
  },
);

export const ProductControllers = {
  createProduct,
  getAllProducts,
};
