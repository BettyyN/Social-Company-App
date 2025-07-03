import NextAuth from "next-auth";
import { string } from "zod";

declare module "next-auth"{
    interface User {
      phoneNumber: string;
      firstName: string;
      lastName: string;
      roleId: string;
    }
    interface Session {
      user: User & {
        userId: string;
        phoneNumber: string;
        firstName: string;
        lastName: string;
        roleId: string;
      };
      token: {
        phoneNumber: string;
        firstName: string;
        lastName: string;
        roleId:string;
      };
    }
   }

 