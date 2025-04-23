import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { senderId, groupId, message } = await req.json();
  if (!senderId || !groupId || !message) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const groupMessage = await db.groupMessage.create({
    data: { senderId, groupId, message },
  });

  return NextResponse.json(groupMessage, { status: 201 });
}
export async function GET(req: NextRequest) {
  const groupId = Number(new URL(req.url).searchParams.get("groupId"));

  const messages = await db.groupMessage.findMany({
    where: { groupId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}
