// app/api/auth/refresh/route.ts
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return new Response(JSON.stringify({ error: "Refresh token required" }), {
        status: 400,
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.NEXTAUTH_SECRET!
    ) as JwtPayload & { userId: string; roleId: string };

    if (typeof decoded !== "object" || !decoded.userId) {
      throw new Error("Invalid token payload");
    }

    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
        roleId: decoded.roleId,
      },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: "1m" }
    );

    return Response.json({
      accessToken,
      refreshToken,
      expiresIn: 60, // 1 minute in seconds
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    return new Response(JSON.stringify({ error: "Invalid refresh token" }), {
      status: 403,
    });
  }
}
