// src/lib/createPost.ts

import axios from "axios";


export interface CreatePostPayload {
  title: string;
  description: string;
  authorId: number;
  groupId?: number;
  picture?: File | null;
}

export async function createPost({
  title,
  description,
  authorId,
  groupId,
  picture,
}: CreatePostPayload) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("authorId", String(authorId));
  if (groupId) formData.append("groupId", String(groupId));
  if (picture) formData.append("picture", picture);

  const response = await axios.post("/api/post", formData);
  return response.data;
}
