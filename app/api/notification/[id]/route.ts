import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const notificationId = Number(params.id);
    if (isNaN(notificationId)) {
      return NextResponse.json({ message: "Invalid Notification ID" }, { status: 400 });
    }
await db.notification.delete({ where: { notificationId: notificationId } });
    return NextResponse.json({message:"Notification deleted successfully"},{status:200})
  } catch (error) {
    console.log(error,'notification delete error')
    return NextResponse.json(
        {error:"Internal sever error"},
        {status:500}
    )
  }
}
