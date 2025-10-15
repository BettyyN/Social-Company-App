import { User } from "./user";

export interface Group {
  groupId: string;
  groupName: string;
  groupDescription: string;
  profilePicture?: File | null;
  createdAt: string;
  deletedAt: string;
}

export interface GroupMember {
  userId: number;
  groupId: number;
  createdAt?: string;
}

export interface GroupWithMembers {
  groupId: number;
  groupName: string;
  groupDescription: string;
  profilePicture: string | null;
  members: User[]; 
}
