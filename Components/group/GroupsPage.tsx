"use client";
import { useGetAllGroups } from "@/queries/group";
import { RootState } from "@/redux/store";
import { Group } from "@/Types/group";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import EditGroupDialog from "./EditGroupDialog";
// 👈 import your dialog component

export default function GroupsPage() {
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const { data: groups, isLoading, isError } = useGetAllGroups();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editGroup, setEditGroup] = useState<Group | null>(null); // 👈 track which group to edit
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // ✅ Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isInside = Object.values(menuRefs.current).some(
        (ref) => ref && ref.contains(event.target as Node)
      );
      if (!isInside) setOpenMenuId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <p className="text-center mt-10">Loading groups...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load groups.</p>
    );

  const groupsArray: Group[] = Array.isArray(groups) ? groups : [];
  if (groupsArray.length === 0)
    return <p className="text-center mt-10 text-gray-500">No groups found.</p>;

  const handleToggle = (groupId: string) => {
    setOpenMenuId((prev) => (prev === groupId ? null : groupId));
  };

  const handleEdit = (group: Group) => {
    setEditGroup(group);
    setOpenMenuId(null); // close dropdown
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {groupsArray.map((group) => (
        <div
          key={group.groupId}
          className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
          ref={(el) => {
            menuRefs.current[group.groupId] = el;
          }}
        >
          {/* --- Group Image --- */}
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

          {/* --- Group Info --- */}
          <h2 className="font-semibold text-lg">{group.groupName}</h2>
          <p className="text-sm text-gray-600">{group.groupDescription}</p>
          <p className="text-xs text-gray-400 mt-2">
            Created: {new Date(group.createdAt).toLocaleDateString()}
          </p>

          {/* --- Admin Actions --- */}
          {isAdmin && (
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition float-right"
                aria-label="More options"
                onClick={() => handleToggle(group.groupId)}
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>

              {openMenuId === group.groupId && (
                <div className="absolute mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg z-50 right-0">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleEdit(group)}
                  >
                    Edit
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => console.log("Delete clicked")}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* --- Render Edit Dialog when a group is selected --- */}
      {editGroup && (
        <EditGroupDialog group={editGroup} key={editGroup.groupId} onClose={() => setEditGroup(null)}/>
      )}
    </div>
  );
}
