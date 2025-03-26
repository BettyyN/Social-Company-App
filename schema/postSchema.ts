import { z } from "zod";

// Enum validation for PostType
const postTypeEnum = z.enum(["GENERAL", "TEAM", "EVENT"]);

// Schema for PostImage
const postImageSchema = z.object({
  url: z.string().url("Invalid image URL"),
});

// Schema for UserTag
const userTagSchema = z.object({
  userId: z.number().int().positive("Invalid user ID"),
});

// Main Post Schema
export const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z.string().optional(),
  images: z
    .object({
      create: z.array(postImageSchema).optional(), // New images
    })
    .optional(),
  type: postTypeEnum.default("GENERAL"),
  authorId: z.number().int().positive("Invalid author ID"),
  teamId: z.number().int().positive().optional(),
  eventId: z.number().int().positive().optional(),
  tags: z
    .object({
      create: z.array(userTagSchema).optional(), // User tags
    })
    .optional(),
  createdAt: z.date().default(new Date()),
});

// TypeScript type for strong typing
export type PostFormData = z.infer<typeof postSchema>;
