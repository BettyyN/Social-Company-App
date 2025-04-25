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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const groupId = Number(params.id);

    if (isNaN(groupId)) {
      return NextResponse.json(
        { message: "Invalid group ID" },
        { status: 400 }
      );
    }

    const group = await db.group.findUnique({
      where: {
        groupId,
        deletedAt: null,
      },
      select: {
        groupId: true,
        groupName: true,
        groupDescription: true,
        profilePicture: true,
        members: {
          include: {
            user: {
              select: {
                userId: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                baptismalName: true,
                profilePicture: true,
                createdAt: true,
                roleId: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    const result = {
      groupId: group.groupId,
      groupName: group.groupName,
      groupDescription: group.groupDescription,
      profilePicture: group.profilePicture,
      members: group.members.map((m) => m.user),
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching group members:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
