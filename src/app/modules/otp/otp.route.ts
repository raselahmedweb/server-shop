import { Router } from "express";
import { OtpControllers } from "./otp.controller";

const router = Router();

router.post("/send", OtpControllers.sendOtp);
router.post("/verify", OtpControllers.verifyEmail);

export const OtpRoutes = router;
