import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "./db";

const JWT_SECRET = process.env.NEXTAUTH_SECRET!;

// 🧩 Helper: refresh the access token
async function refreshAccessToken(token: any) {
  try {
    // Verify refresh token
    const decoded = jwt.verify(token.refreshToken, JWT_SECRET) as JwtPayload & {
      userId: string;
      roleId: string;
    };

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, roleId: decoded.roleId },
      JWT_SECRET,
      { expiresIn: "1m" } // example: 1 minute
    );

    return {
      ...token,
      accessToken: newAccessToken,
      accessTokenExpires: Date.now() + 1 * 60 * 1000, // 1 minute
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: JWT_SECRET,
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phoneNumber || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { phoneNumber: credentials.phoneNumber },
        });
        if (!user) return null;

        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;

        const accessToken = jwt.sign(
          { userId: user.userId, roleId: user.roleId },
          JWT_SECRET,
          { expiresIn: "1m" }
        );

        const refreshToken = jwt.sign(
          { userId: user.userId, roleId: user.roleId },
          JWT_SECRET,
          { expiresIn: "7d" } // valid for 7 days
        );

        return {
          id: user.userId.toString(),
          userId: user.userId,
          roleId: user.roleId,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          accessToken,
          refreshToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user && account) {
        return {
          ...token,
          userId: user.userId,
          roleId: user.roleId,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 1 * 60 * 1000,
        };
      }

      // If the access token has not expired yet, return the current token
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token expired — try to refresh it
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      // Send properties to the client
      session.user = {
        ...session.user,
        userId: token.userId,
        firstName: token.firstName,
        lastName: token.lastName,
        phoneNumber: token.phoneNumber,
        roleId: token.roleId,
      };
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    // Add other custom pages if needed
  },
};
