import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));
  const groupId = Number(searchParams.get("groupId"));
  if (!userId || !groupId) {
    return NextResponse.json(
      { error: "Mission userId or groupId" },
      { status: 400 }
    );
  }
  try {
    await db.groupMember.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

    return NextResponse.json(
      { message: "Permission removed from role successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
