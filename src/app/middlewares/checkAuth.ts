import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import httpStatusCode from "http-status-codes";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        throw new AppError(403, "No token received");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET,
      ) as JwtPayload;

      const isExistUser = await User.findOne({ email: verifiedToken.email });

      if (!isExistUser) {
        throw new AppError(httpStatusCode.NOT_FOUND, "Email does not exist");
      }

      if (isExistUser.isDeleted) {
        throw new AppError(httpStatusCode.FORBIDDEN, "User is deleted");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permited to view this route!!");
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
