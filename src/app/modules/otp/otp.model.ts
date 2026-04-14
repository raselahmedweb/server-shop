import mongoose, { Schema } from "mongoose";
import { IOTP } from "./otp.interface";

const otpSchema = new Schema<IOTP>({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export const OtpModel = mongoose.model<IOTP>("otps", otpSchema);
