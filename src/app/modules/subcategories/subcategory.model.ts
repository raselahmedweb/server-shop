import mongoose, { Schema } from "mongoose";
import { ISubCategory } from "./subcategory.interface";

const subcategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  },
);

export const SubCategory = mongoose.model<ISubCategory>(
  "subcategories",
  subcategorySchema,
);
