import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "subcategories",
    },
    variations: {
      type: String,
    },
    sizes: {
      type: String,
    },
    brand: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    soldUnits: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Product = mongoose.model<IProduct>("products", productSchema);
