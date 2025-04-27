import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
 const postId = Number(params.id);
 const body = await req.json();
 const userId = Number(body.userId);
 const message = body.message;
    if (
      isNaN(userId) ||
      isNaN(postId) ||
      !message ||
      typeof message !== "string"
    ) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }

    const newComment = await db.comment.create({
      data: {
        postId,
        userId,
        message,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = Number(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const comments = await db.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Fetch comments error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

