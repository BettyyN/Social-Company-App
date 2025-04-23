import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { senderId, receiverId, message } = await req.json();
  if (!senderId || !receiverId || !message) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const newMessage = await db.directMessage.create({
    data: { senderId, receiverId, message },
  });

  return NextResponse.json(newMessage, { status: 201 });
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const senderId = Number(searchParams.get("senderId"));
  const receiverId = Number(searchParams.get("receiverId"));

  const messages = await db.directMessage.findMany({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}
