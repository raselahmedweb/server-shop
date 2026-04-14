import { Types } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  isVerifiedEmail?: boolean;
  phone?: string;
  password: string;
  isDeleted?: boolean;
  role: Role;
}
