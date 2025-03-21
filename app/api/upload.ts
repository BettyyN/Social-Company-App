// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { fileName, folder } = req.body;
    const fileType = fileName.split(".").pop();

    // Generate signed URL for direct upload
    const { data, error } = await supabase.storage
      .from(folder)
      .createSignedUploadUrl(`${Date.now()}.${fileType}`);

    if (error) throw error;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Upload failed" });
  }
}
