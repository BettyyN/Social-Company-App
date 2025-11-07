import { headers } from "next/headers";
import api from "./api/axiosInstance";

export async function uploadImage(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder); // Add folder info to send to the API

  
try{
const res = await api.post("/api/upload", formData ,{
    headers:{
      "Content-Type":"multipart/form-data"
    },
  });
return res.data.url;
}
catch(error){
  console.error("Image upload failed:",error);
  throw new Error("Image upload failed");
}
}
  
