import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: Partial<ICategory>) => {
  const category = await Category.create(payload);
  return category;
};
const getCategories = async () => {
  const categories = await Category.find();
  return categories;
};

export const CategoryServices = {
  createCategory,
  getCategories,
};
