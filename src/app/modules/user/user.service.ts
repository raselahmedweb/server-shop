import AppError from "../../errorHelpers/AppError";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatusCode from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(httpStatusCode.BAD_REQUEST, "User already exists");
  }

  const hashPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  const userData = {
    email,
    password: hashPassword,
    role: Role.CUSTOMER,
    ...rest,
  };

  const user = await User.create(userData);
  const userObj = user.toObject() as Partial<IUser>;
  delete userObj.password;
  return userObj;
};

const updateUser = async (userId: string, payload: Partial<IUser>) => {
  const ifUserExist = await User.findById(userId);

  if (!ifUserExist) {
    throw new AppError(httpStatusCode.NOT_FOUND, "User does not exist");
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUND,
    );
  }

  const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  }).select("-password");

  return newUpdateUser;
};

const getAllUsers = async (name?: string, designation?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};

  if (name) {
    query.$or = [
      { name: { $regex: name, $options: "i" } },
      { email: { $regex: name, $options: "i" } },
    ];
  }

  if (designation) {
    query.role = designation;
  }

  const users = await User.find(query).select("-password");
  const total = await User.countDocuments(query);

  return { users, total };
};

export const UserServices = {
  createUser,
  updateUser,
  getAllUsers,
};
