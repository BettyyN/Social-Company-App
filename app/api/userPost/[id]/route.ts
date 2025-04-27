import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID" },
        { status: 400 }
      );
    }

    const userPosts = await db.userPost.findMany({
      where: {
        userId,
      },
      include: {
        post: true,
      },
      orderBy: {
        createdAt: "desc", 
      },
    });

    if (!userPosts || userPosts.length === 0) {
      return NextResponse.json({ message: "No post" }, { status: 404 });
    }
    const posts =  userPosts.map(up => up.post);
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching userPosts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
