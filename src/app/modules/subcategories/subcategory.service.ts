import { ISubCategory } from "./subcategory.interface";
import { SubCategory } from "./subcategory.model";

const createSubCategory = async (payload: Partial<ISubCategory>) => {
  const subcategory = await SubCategory.create(payload);
  return subcategory;
};
const getSubCategories = async () => {
  const subcategories = await SubCategory.find();
  return subcategories;
};

export const SubCategoryServices = {
  createSubCategory,
  getSubCategories,
};
