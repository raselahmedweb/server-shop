import { Response } from "express";

export interface IAuthToken {
  accessToken?: string;
  refreshToken?: string;
}

export const setCookie = async (res: Response, authToken: IAuthToken) => {
  if (authToken.accessToken) {
    res.cookie("accessToken", authToken.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
  if (authToken.refreshToken) {
    res.cookie("refreshToken", authToken.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
};
