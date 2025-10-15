// hooks/useGroup.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axiosInstance";
import { Group } from "@/Types/group";
import axios from "axios";

// --- Fetch all groups ---
export const useGetAllGroups = () => {
  return useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await api.get("/group");
      return response.data as Group[];
    },
  });
};

// --- Fetch a single group by ID ---
export const useGetGroupById = (groupId: string) => {
  return useQuery<Group>({
    queryKey: ["group", groupId],
    queryFn: async () => {
      const response = await api.get(`/group/${groupId}`);
      return response.data as Group;
    },
    enabled: !!groupId, // prevents running with undefined ID
  });
};

// --- Create a new group ---
export type CreateGroupInput = Omit<
  Group,
  "groupId" | "createdAt" | "deletedAt"
>;

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 🔹 mutation function — same logic you already had
    mutationFn: async ({
      groupName,
      groupDescription,
      profilePicture,
    }: Omit<Group, "groupId" | "createdAt" | "deletedAt">) => {
      const formData = new FormData();
      formData.append("groupName", groupName);
      formData.append("groupDescription", groupDescription);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await axios.post("/api/group", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },

    // 🔹 what happens on success
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] }); // refresh groups list
    },

    // 🔹 optional: handle errors
    onError: (error) => {
      console.error("Failed to create group:", error);
    },
  });
};

// --- Update a group ---
export type UpdateGroupInput = Partial<CreateGroupInput>;

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      groupId,
      updatedGroup,
    }: {
      groupId: string;
      updatedGroup: UpdateGroupInput;
    }) => {
      const response = await api.put(`/group/${groupId}`, updatedGroup);
      return response.data as Group;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["group", variables.groupId] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

// --- Delete a group ---
export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (groupId: string) => {
      const response = await api.delete(`/group/${groupId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group"] });
    },
  });
};
