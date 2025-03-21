import { z } from "zod";

export const userSchema = z
  .object({
    firstName: z.string().min(2, "First Name must be at least 2 characters"),
    lastName: z.string().min(2, "Last Name must be at least 2 characters"),
    email: z.string().email("Invalid email address").optional(),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(
        /^(\+251[79]\d{8}|0[79]\d{8})$/,
        "Invalid phone number format. Use +251... or 09/07..."
      )
      .max(13, "Phone number must be maximum 13 digits"),
    baptismalName: z
      .string()
      .min(2, "Baptismal Name must be at least 2 characters")
      .optional(),
    role: z.enum(["STUDENT", "TEACHER", "ADMIN", "OTHER"]) ,
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Password must contain at least one letter and one number"
      ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserFormData = z.infer<typeof userSchema>;
