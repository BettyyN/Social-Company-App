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

        return {
          id:`${ existingUser.id}`,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          phoneNumber: existingUser.phoneNumber || '',
        };
      },
    }),
  ],
  callbacks:{
    async jwt({token, user}){
        if(user){
            return{
                ...token,
                phoneNumber: user.phoneNumber,
        }
        }
        return token;
    },
    async session({session, user, token}){
        return{
            ...session,
            user:{
                ...session.user,
                phoneNumber: token.phoneNumber,
            }
        }
    }
  }
};


