import { z } from "zod";

export const userSchema = z
  .object({
    id: z.number(),
    title: z.string().min(2, "First Name must be at least 2 characters"),
    content: z.string().min(5, "Last Name must be at least 2 characters"),
    author: z.string().email("Invalid email address").optional(),
    profilePicture: z
      .instanceof(File)
      .optional()
      .refine((file) => {
        if (!file) return true; // If no file is provided, skip validation
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];
        return (
          file.size <= MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type)
        );
      }),
  })

export type UserFormData = z.infer<typeof userSchema>;

export const userSchemaPartial = z.object(
  Object.fromEntries(
    Object.entries(userSchema.shape).map(([key, value]) => [
      key,
      value.optional(),
    ])
  )
);
