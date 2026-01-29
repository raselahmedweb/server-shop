import z from "zod";
import { Category } from "../categories/category.model";

export const createProductZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name must be at most 100 characters long" }),
  description: z.string({ message: "Description must be string" }),
  images: z.array(z.string({ message: "Image URL must be a string" })),
  categoryId: z.string({ message: "Category ID must be string" }).refine(
    async (categoryId) => {
      const category = await Category.findById(categoryId);
      return !!category;
    },
    { message: "Category ID does not exist" },
  ),
  subCategoryId: z.string({ message: "SubCategory ID must be string" }),
  variations: z.string({ message: "Variations must be string" }).optional(),
  sizes: z.string({ message: "Sizes must be string" }).optional(),
  brand: z.string({ message: "Brand must be string" }).optional(),
  price: z.number({ message: "Price must be number" }),
  salePrice: z.number({ message: "Sale Price must be number" }),
  stock: z.number({ message: "Stock must be number" }),
});
