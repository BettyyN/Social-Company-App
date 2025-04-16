// lib/uploadImage.ts
import { supabaseClient } from "./supabase"; // Import the Supabase client
import { nanoid } from "nanoid";

export const uploadImage = async (
  file: File,
  bucketName: string
): Promise<string | null> => {
  if (!file) return null;

  const fileExt = file.name.split(".").pop(); // Get file extension
  const fileName = `${nanoid()}.${fileExt}`; // Generate unique filename
  const filePath = `uploads/${fileName}`; // Path inside the bucket

  // Upload the file to Supabase Storage
  const { data, error } = await supabaseClient.storage
    .from(bucketName)
    .upload(filePath, file);

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  // Retrieve the public URL for the uploaded file
  const { data: publicData } = supabaseClient.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  if (!publicData) {
    console.error("Error retrieving public URL: No data returned.");
    return null;
  }

  // Return the public URL of the uploaded image
  return publicData?.publicUrl || null;
};
