import { compare } from "bcrypt";
import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";



export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:'jwt',
    },
    pages:{
        signIn:'/auth/login',
        signOut:'/'
    },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "PhoneNumber", type: "string", placeholder: "+251" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if(!credentials?.phoneNumber || !credentials?.password ){
            return null;
        }

        const existingUser =await db.user.findUnique({
            where:{phoneNumber:credentials?.phoneNumber}
        });
        if(!existingUser){
            return null;
        }

        const isValid = await compare(credentials.password,existingUser.password);

        if(!isValid){
            return null;
        }
        console.log("User Data from DB:", existingUser);

        return {
          id: `${existingUser.userId}`,
          userId: `${existingUser.userId}`,
          roleId: `${existingUser.roleId}`,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          phoneNumber: existingUser.phoneNumber || '',
        };
      },
    }),
  ],
  callbacks:{
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as unknown as {
          userId: string | number;
          phoneNumber: string;
          firstName: string;
          lastName: string;
          roleId:string;
        };
    
        return {
          ...token,
          userId: customUser.userId,
          phoneNumber: customUser.phoneNumber,
          firstName: customUser.firstName,
          lastName: customUser.lastName,
          roleId: customUser.roleId,
        };
      }
      return token;
    },
    
    async session({session, user, token}){
        return {
          ...session,
          user: {
            ...session.user,
            userId: token.userId,
            phoneNumber: token.phoneNumber,
            firstName: token.firstName,
            lastName: token.lastName,
            roleId: token.roleId,
          },
        };
    }
  }
};


