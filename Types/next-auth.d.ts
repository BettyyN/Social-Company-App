import NextAuth from "next-auth";
import { string } from "zod";

declare module "next-auth"{
    interface User {
      phoneNumber: string;
      firstName: string;
      lastName: string;
    }
    interface Session {
      user: User & {
        phoneNumber: string;
        firstName: string;
        lastName: string;
      };
      token: {
        phoneNumber: string;
        firstName: string;
        lastName: string;
      };
    }
   }

 