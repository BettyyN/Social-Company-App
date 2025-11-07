"use client";

import { useState } from "react";
import { Group } from "@/Types/group";
import { useUpdateGroup } from "@/queries/group";
import { Toast } from "../ui/toast";

interface EditGroupDialogProps {
  group: Group;
  onClose: () => void;
}

export default function EditGroupDialog({
  group,
  onClose,
}: EditGroupDialogProps) {
  const [groupName, setGroupName] = useState(group.groupName);
  const [groupDescription, setGroupDescription] = useState(
    group.groupDescription
  );
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof group.profilePicture === "string" ? group.profilePicture : null
  );
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const updateGroup = useUpdateGroup();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("groupName", groupName);
    formData.append("groupDescription", groupDescription);
    if (profilePicture) formData.append("profilePicture", profilePicture);

    const res=updateGroup.mutateAsync({
        groupId: group.groupId,
        userData: formData,
    })
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-2">Edit Group</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
              />
            </div>

            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>

              {previewUrl && (
                <div className="relative w-24 h-24 mb-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    onClick={() => {
                      setPreviewUrl(null);
                      setProfilePicture(null);
                    }}
                  >
                    ×
                  </button>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-600"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateGroup.isPending}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-70"
              >
                {updateGroup.isPending ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
