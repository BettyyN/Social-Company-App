import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_LIFETIME } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();

  if (!refreshToken)
    return NextResponse.json(
      { error: "No refresh token provided" },
      { status: 400 }
    );

  const tokenRecord = await db.refreshToken.findUnique({
    where: { token: refreshToken },
  });
  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Invalid or expired refresh token" },
      { status: 401 }
    );
  }

  // create new access token
  const accessToken = jwt.sign(
    { userId: tokenRecord.userId },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: ACCESS_TOKEN_LIFETIME / 1000 } // in seconds
  );

  return NextResponse.json({ accessToken });
}
