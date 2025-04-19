import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest , res:NextResponse){
    try {
      const body = await req.json();
      const userId = Number(body.userId);
      const postId = Number(body.postId);
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
          userId,
          postId,
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
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const commentId = Number(searchParams.get("id"));
    if (!isNaN(commentId) && commentId > 0) {
      const comment = await db.comment.findUnique({
        where: {
          commentId,
        },
      });
      if (!comment) {
        return NextResponse.json(
          { error: "comment not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(comment, { status: 200 });
    }

    const comments = await db.comment.findMany({
      orderBy: {
        commentId: "asc",
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}

