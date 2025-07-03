"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "@/lib/createGroup";
import { FiPlus, FiX } from "react-icons/fi";

export default function CreateGroupPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createGroup,
    onSuccess: (data) => {
      console.log("Group created:", data);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setIsOpen(false);
      resetForm();
    },
    onError: (err: any) => {
      setError(err?.response?.data?.message || "Something went wrong.");
    },
  });

  const handleSubmit = () => {
    if (!groupName || !groupDescription) {
      setError("All fields are required.");
      return;
    }

    mutation.mutate({ groupName, groupDescription, profilePicture });
  };

  const resetForm = () => {
    setGroupName("");
    setGroupDescription("");
    setProfilePicture(null);
    setError("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/80"
      >
        <FiPlus /> Create Group
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => {
                setIsOpen(false);
                resetForm();
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <FiX size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Create Group</h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
              />

              <textarea
                placeholder="Group Description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="border rounded-md px-3 py-2 w-full resize-none"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                className="w-full"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={mutation.status === "pending"}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
              >
                {mutation.status === "pending" ? "Creating..." : "Create Group"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
