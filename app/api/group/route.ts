import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/uploadImage"; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const existingGroup = await db.group.findFirst({
      where: { groupName: body.groupName },
    });

    if (existingGroup) {
      return NextResponse.json(
        {
          role: null,
          message: "group already exists",
        },
        { status: 409 }
      );
    }

    let profilePictureUrl: string | null = null;
    if (body.profilePicture) {
      profilePictureUrl = await uploadImage(
        body.profilePicture,
        "group-profiles"
      );

      if (!profilePictureUrl) {
        return NextResponse.json(
          { error: "Error uploading profile picture" },
          { status: 400 }
        );
      }
    }

    const newGroup = await db.group.create({
      data: {
        groupName: body.groupName,
        groupDescription: body.groupDescription,
        profilePicture: profilePictureUrl,
      },
    });
    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const groupId = Number( searchParams.get("id"));
    if (groupId) {
      const group = await db.group.findUnique({
        where: {
          groupId: groupId,
        },
      });
      if (!group) {
        return NextResponse.json({ error: "group not found" }, { status: 404 });
      }
      return NextResponse.json(group, { status: 200 });
    }
    
    const groups = await db.group.findMany({
      orderBy: {
        groupId: "asc",
      },
    });
    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
