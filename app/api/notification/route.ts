import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, recipientId, senderId, postId, commentId } =
    await req.json();
  if (!message || !recipientId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const notification = await db.notification.create({
    data: {
      message,
      recipientId,
      senderId,
      postId,
      commentId,
    },
  });

  return NextResponse.json(notification, { status: 201 });
}
export async function GET(req: NextRequest) {
  const recipientId = Number(new URL(req.url).searchParams.get("recipientId"));

  const notifications = await db.notification.findMany({
    where: { recipientId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(notifications);
}
export async function PATCH(req: NextRequest) {
  const { notificationId } = await req.json();

  const updated = await db.notification.update({
    where: { notificationId },
    data: { isRead: true },
  });

  return NextResponse.json(updated);
}
