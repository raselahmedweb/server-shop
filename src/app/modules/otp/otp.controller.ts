/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { OtpServices } from "./otp.service";
import { setCookie } from "../../utils/setCookie";

const sendOtp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const otp = await OtpServices.sendOtp(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "OTP sent successfully",
      data: otp, //? remove otp
    });
  },
);

const verifyEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await OtpServices.verifyEmail(req.body);
    setCookie(res, loginInfo);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Email verified successfully",
      data: loginInfo,
    });
  },
);

export const OtpControllers = {
  sendOtp,
  verifyEmail,
};
