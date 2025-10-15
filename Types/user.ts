export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  baptismalName?: string | null;
  profilePicture?: string | null;
  createdAt: string;
  roleId: number;
}
