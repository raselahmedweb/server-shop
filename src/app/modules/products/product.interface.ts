import { Types } from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  salePrice: number;
  stock: number;
  images: string[];
  categoryId: Types.ObjectId;
  subCategoryId: Types.ObjectId;
  variations: string;
  sizes: string;
  brand: string;
  isDeleted?: boolean;
  soldUnits?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
