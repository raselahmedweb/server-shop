import z from "zod";

export const createSubCategoryZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name must be at most 100 characters long" }),
  imageUrl: z
    .string({ message: "Image URL must be string" })
    .min(2, { message: "Image URL must be at least 2 characters long" })
    .max(100, { message: "Image URL must be at most 100 characters long" }),
});
