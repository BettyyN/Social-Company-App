import NextAuth from "next-auth";
import { string } from "zod";

declare module "next-auth"{
    interface User{
     phoneNumber:string;
    }
    interface Session{
    user: User & {
     phoneNumber:string;
    }
    token:{
       phoneNumber:string;
    }
    }
   }

 