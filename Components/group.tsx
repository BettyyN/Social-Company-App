"use client";

import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import Link from "next/link";
import { useCreateGroup } from "@/queries/group";

export default function CreateGroupPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  // const [error, setError] = useState("");

 const { mutate: createGroup, isPending, isError, error, isSuccess } = useCreateGroup();  

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     createGroup({ groupName, groupDescription, profilePicture });
   };
  const resetForm = () => {
    setGroupName("");
    setGroupDescription("");
    setProfilePicture(null);
    // setError("");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
          <button
            onClick={() => {
              resetForm();
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <Link href="/home">
              <FiX size={20} />
            </Link>
          </button>

          <h2 className="text-xl font-semibold mb-4">Create Group</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

            {isError && (
              <p className="text-red-500 text-sm">
                {error instanceof Error ? error.message : "An error occurred."}
              </p>
            )}
            {isSuccess && (
              <p className="text-green-600 text-sm">✅ Group created!</p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              {isPending ? "Creating..." : "Create Group"}
            </button>
          </form>
        </div>
      </div>
      {/* )} */}
    </>
  );
}
