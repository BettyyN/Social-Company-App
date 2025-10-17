"use client";
import { useGetAllGroups } from "@/queries/group";
import { RootState } from "@/redux/store";
import { Group } from "@/Types/group";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function GroupsPage() {
   const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const { data: groups, isLoading, isError } = useGetAllGroups();
  console.log("Groups fetched:", groups);
  if (isLoading) return <p className="text-center mt-10">Loading groups...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load groups.</p>
    );
     const groupsArray: Group[] = Array.isArray(groups) ? groups : [];

  if (groupsArray.length === 0)
    return <p className="text-center mt-10 text-gray-500">No groups found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {groupsArray.map((group) => (
        <div
          key={group.groupId}
          className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
        >
          {group.profilePicture ? (
            <Image
              src={
                typeof group.profilePicture === "string"
                  ? group.profilePicture
                  : "/placeholder.png"
              }
              alt={group.groupName}
              width={200}
              height={200}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
          ) : (
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-lg mb-3">
              <span className="text-gray-400">No image</span>
            </div>
          )}

          <h2 className="font-semibold text-lg">{group.groupName}</h2>
          <p className="text-sm text-gray-600">{group.groupDescription}</p>
          <p className="text-xs text-gray-400 mt-2">
            Created: {new Date(group.createdAt).toLocaleDateString()}
          </p>
          {isAdmin && (
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition float-right"
              aria-label="More options"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}


