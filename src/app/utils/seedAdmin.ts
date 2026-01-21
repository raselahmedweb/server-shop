/* eslint-disable no-console */
import { envVars } from "../config/env";
import { IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs";

export const seedAdmin = async () => {
  try {
    const isExistAdmin = await User.findOne({
      email: envVars.ADMIN_EMAIL,
    });

    console.log("Trying to create  Admin");
    if (isExistAdmin) {
      console.log("Admin already exist.");
      return;
    }

    const hashedPassword = await bcryptjs.hash(
      envVars.ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND),
    );

    const payload: IUser = {
      name: "Admin",
      role: Role.ADMIN,
      email: envVars.ADMIN_EMAIL,
      password: hashedPassword,
    };

    const admin = await User.create(payload);
    console.log("Admin created successfully \n");
    console.log(admin);
  } catch (error) {
    console.log(error);
  }
};
