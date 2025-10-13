export interface Group{
    groupId: string;
    groupName: string;
    groupDescription: string;
    profilePicture? : string | null;
    createdAt: string;
    deletedAt: string;
}

export interface GroupState{
    items: Group[];
    loading: boolean;
    error: string | null;
}