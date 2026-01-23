/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { setCookie } from "../../utils/setCookie";
import { User } from "../user/user.model";
import { AuthServices } from "./auth.service";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    setCookie(res, loginInfo);
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: "User logged in successfully",
      data: loginInfo,
    });
  },
);

const me = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user;
    const user = await User.findById(userId).select("-password");

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: "User retrive successfully",
      data: user,
    });
  },
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refresToken = req.cookies.refreshToken;

    if (!refresToken) {
      throw new AppError(
        httpStatusCode.BAD_REQUEST,
        "No refresh token received from cookie",
      );
    }

    const tokenInfo = await AuthServices.getNewAccessToken(
      refresToken as string,
    );

    setCookie(res, tokenInfo);

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: "Get new accesstoken successfully",
      data: tokenInfo,
    });
  },
);
const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: "User logged out successfully",
      data: null,
    });
  },
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken);

    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: "Password changed successfully",
      data: null,
    });
  },
);

export const AuthControllers = {
  credentialsLogin,
  me,
  getNewAccessToken,
  logout,
  resetPassword,
};
