import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description, imageUrl, userId } = await req.json();
  if (!title || !description || !userId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const ad = await db.advertisement.create({
    data: { title, description, imageUrl, userId },
  });

  return NextResponse.json(ad, { status: 201 });
}

export async function GET() {
  const ads = await db.advertisement.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(ads);
}

