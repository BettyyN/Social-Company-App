export async function uploadImage(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder); // Add folder info to send to the API

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return data.url; // The Cloudinary URL
}
