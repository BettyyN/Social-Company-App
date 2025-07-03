// src/lib/createGroup.ts
import axios from "axios";

export interface CreateGroupPayload {
  groupName: string;
  groupDescription: string;
  profilePicture?: File | null;
}

export async function createGroup({
  groupName,
  groupDescription,
  profilePicture,
}: CreateGroupPayload) {
  const formData = new FormData();
  formData.append("groupName", groupName);
  formData.append("groupDescription", groupDescription);
  if (profilePicture) {
    formData.append("profilePicture", profilePicture);
  }

  const response = await axios.post("/api/group", formData);
  return response.data;
}
