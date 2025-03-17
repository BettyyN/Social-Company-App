import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().optional(), // Optional field
  positionId: z.number().int().positive().optional(), // Must be a positive integer if provided
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
