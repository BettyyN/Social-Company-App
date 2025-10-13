// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    userId: number;
    roleId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      userId: number;
      roleId: number;
      firstName: string;
      lastName: string;
      phoneNumber: string;
    };
    accessToken: string;
    refreshToken: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: number;
    roleId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: string;
  }
}
