import bcryptjs from "bcryptjs";
import nodemailer, { Transporter } from "nodemailer";
import { generateOTP } from "../../utils/generateOTP";
import { envVars } from "../../config/env";
import { getOtpTemplate } from "../../components/OtpTemplate";
import { OtpModel } from "./otp.model";
import AppError from "../../errorHelpers/AppError";
import httpStatusCode from "http-status-codes";
import { User } from "../user/user.model";
import { createUserToken } from "../../utils/userToken";
import { IOTP } from "./otp.interface";

const isOtpExpired = (expiresAt: Date) => {
  return new Date() > expiresAt;
};

const sendOtp = async (email: string, name?: string) => {
  const otp = generateOTP();

  const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: envVars.NODEMAILER_EMAIL,
      pass: envVars.NODEMAILER_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Shop" <${envVars.NODEMAILER_EMAIL}>`,
    to: email,
    subject: "Your OTP Code - Verify Your Account",
    html: getOtpTemplate(otp, name),
  };

  const hashOtp = await bcryptjs.hash(
    otp as string,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  try {
    await transporter.sendMail(mailOptions);

    //! Save OTP in DB
    await OtpModel.create({
      email,
      otp: hashOtp,
      expiresAt: Date.now() + 2 * 60 * 1000,
    });

    return { otp };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Email error:", error);
    return { success: false };
  }
};

const verifyEmail = async (payload: Partial<IOTP>) => {
  const { email, otp } = payload;

  const isExistUser = await User.findOne({ email });
  if (!isExistUser) {
    throw new AppError(httpStatusCode.BAD_REQUEST, "Email does not exist");
  }
  const isOtpExist = await OtpModel.findOne({ email }).sort({ expiresAt: -1 });

  if (!isOtpExist) {
    throw new AppError(httpStatusCode.BAD_REQUEST, "OTP does not exist");
  }

  if (isOtpExpired(isOtpExist.expiresAt)) {
    throw new AppError(410, "OTP has expired");
  }

  const isOtpMatched = await bcryptjs.compare(otp as string, isOtpExist.otp);

  if (!isOtpMatched) {
    throw new AppError(httpStatusCode.BAD_REQUEST, "Incorrect OTP");
  }

  isExistUser.isVerifiedEmail = true;
  await isExistUser.save();

  const userTokens = createUserToken(isExistUser);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = isExistUser.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

export const OtpServices = {
  verifyEmail,
  sendOtp,
};
