// src/lib/createGroup.ts
import axios from "axios";
import {Group} from "../../Types/group";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function createGroup({
  groupName,
  groupDescription,
  profilePicture,
}: Group) {
  const formData = new FormData();
  formData.append("groupName", groupName);
  formData.append("groupDescription", groupDescription);
  if (profilePicture) {
    formData.append("profilePicture", profilePicture);
  }

  const response = await axios.post("/api/group", formData);
  return response.data;
}
export async function editGroup({
  groupName,
  groupDescription,
  profilePicture,
}: Group) {
  const formData = new FormData();
  if(groupName)
{formData.append("groupName", groupName);}  
  if(groupDescription)
    {
      formData.append("groupDescription", groupDescription);
    }
  if (profilePicture) 
    {
      formData.append("profilePicture", profilePicture);
    }

  const response = await axios.put("/api/group", formData);
  return response.data;
}
export async function DeleteGroup = () =>{
  const queryClient = useQueryClient();
  return useMutation(
    async (groupId: String)=>{
      const response = await  axios.delete(`/api/group/${groupId}`) ;
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("group");
      },
    }
  )
}
