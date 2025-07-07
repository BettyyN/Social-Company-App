"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/lib/createPost";

export default function CreatePost({ userId }: { userId: number }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupId, setGroupId] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      setMessage("Post created successfully.");
      setTitle("");
      setDescription("");
      setPicture(null);
      setGroupId("");
    },
    onError: (error: any) => {
      setMessage(error?.response?.data?.error || "Something went wrong.");
      console.log("error creating post: ",error)
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !userId) {
      setMessage("Title, Description, and User ID are required.");
      return;
    }
    mutation.mutate({
      title,
      description,
      authorId: userId,
      groupId: groupId ? Number(groupId) : undefined,
      picture,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 border rounded-xl bg-white space-y-4"
    >
      <h2 className="text-xl font-semibold">Create Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border rounded h-32"
        required
      />

      <input
        type="number"
        placeholder="Group ID (optional)"
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setPicture(file);
        }}
        className="w-full px-4 py-2"
      />

      <button
        type="submit"
        className="bg-primary text-white font-semibold px-4 py-2 rounded hover:bg-opacity-90"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Creating..." : "Create Post"}
      </button>

      {message && <p className="text-sm text-red-500 mt-2">{message}</p>}
    </form>
  );
}
