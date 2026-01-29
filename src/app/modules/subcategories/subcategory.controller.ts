/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SubCategoryServices } from "./subcategory.service";

const createSubCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = await SubCategoryServices.createSubCategory(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "SubCategory created successfully",
      data: subcategory,
    });
  },
);

const getAllSubCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await SubCategoryServices.getSubCategories();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "SubCategories retrieved successfully",
      data: result,
    });
  },
);

export const SubCategoryControllers = {
  createSubCategory,
  getAllSubCategories,
};
