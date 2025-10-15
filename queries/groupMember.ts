import { useMutation, useQuery, useQueryClient } from  "@tanstack/react-query";
import api from "@/lib/api/axiosInstance";
import { GroupMember, GroupWithMembers } from "@/Types/group";



export const useGetAllGroups = () =>{
    return useQuery<GroupWithMembers[]>({
      queryKey: ["groupMembers"],
      queryFn: async () => {
        const response = await api.get("/groupMember");
        return response.data as GroupWithMembers[];
      },
    });
}
export const useGetGroupMembers = (groupId: number) =>{
    return useQuery<GroupWithMembers>({
        queryKey: ["groupMember", groupId],
        queryFn: async() => {
            const response = await api.get(`groupMember/${groupId}`);
            return response.data as GroupWithMembers;
        }
    })
}
export const useAddGroupMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: GroupMember) => {
      const res = await api.post("/api/group-members", data);
      return res.data;
    },
    onSuccess: () => {
      // Re-fetch group data to show updated members
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};


export const useRemoveGroupMember = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { groupId: number; userId: number }>({
    mutationFn: async ({ groupId, userId }) => {
      await api.delete("/groupMembers", { params: { groupId, userId } });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["groupMembers", variables.groupId],
      });
    },
  });
};