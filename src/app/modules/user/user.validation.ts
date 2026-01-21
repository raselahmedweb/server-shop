import z from "zod";

export const createUserZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(2, { message: "Name too short: Minimun 2 character required" })
    .max(50, { message: "Name too long: Maximum 50 character allowed" }),
  email: z
    .string({ message: "Email must be string" })
    .email({ message: "Invalid email format" })
    .min(5, { message: "Email must be at least 5 character long" })
    .max(100, { message: "Email cannot exceed 100 characters" }),
  phone: z
    .string({ message: "Phone must be string" })
    .min(7, { message: "Phone must be at least 7 characters long" })
    .max(15, { message: "Phone cannot exceed 15 characters" })
    .optional(),
  password: z
    .string({ message: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
});
export const updateUserZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(2, { message: "Name too short: Minimun 2 character required" })
    .max(50, { message: "Name too long: Maximum 50 character allowed" })
    .optional(),
  phone: z
    .string({ message: "Phone must be string" })
    .min(7, { message: "Phone must be at least 7 characters long" })
    .max(15, { message: "Phone cannot exceed 15 characters" })
    .optional(),
  password: z
    .string({ message: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    })
    .optional(),
});
export const updateUserByAdminZodSchema = z.object({
  role: z.string({ message: "Role must be string" }).optional(),
  isDeleted: z
    .boolean({ message: "isDeleted must be true or false" })
    .optional(),
});

export const resetPasswordZodSchema = z.object({
  oldPassword: z.string(),
  newPassword: z
    .string({ message: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[a-z])/, {
      message: "Password must contain at least 1 lowercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
});
