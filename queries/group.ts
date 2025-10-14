import api from "@/lib/api/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


// Fetch all Groupss
export const useGetAllGroups= () => {
  return useQuery<Groups[]>("Groups", async () => {
    const response = await api.get("/Groups/");
    return response.data;
  });
};
// Fetch a Groups by ID
export const useGetGroupsById = (id: number) => {
  return useQuery<Groups>(["Groups", id], async () => {
    const response = await api.get(`/Groups/${id}`);
    return response.data;
  });
};

// Create a new Groups
export const useCreateGroups = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (
      newGroups: Omit<Groups, "ID" | "CreatedAt" | "UpdatedAt" | "DeletedAt">
    ) => {
      const response = await api.post("/Groups/", newGroups);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Groupss");
      },
    }
  );
};

// Update a Groups by ID
export const useUpdateGroups = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      id,
      updatedGroups,
    }: {
      id: number;
      updatedGroups: Partial<Groups>;
    }) => {
      const response = await api.put(`/Groups/${id}`, updatedGroups);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Groups");
      },
    }
  );
};

// Delete a Groups by ID
export const useDeleteGroups = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => {
      const response = await api.delete(`/Groups/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Groupss");
      },
    }
  );
};
