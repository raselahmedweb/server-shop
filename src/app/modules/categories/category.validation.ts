import z from "zod";

export const createCategoryZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name must be at most 100 characters long" }),
  slug: z
    .string({ message: "Slug must be string" })
    .min(2, { message: "Slug must be at least 2 characters long" })
    .max(100, { message: "Slug must be at most 100 characters long" }),
  description: z.string({ message: "Description must be string" }).optional(),
  imageUrl: z
    .array(z.string({ message: "Image URL must be a string" }))
    .optional(),
});
