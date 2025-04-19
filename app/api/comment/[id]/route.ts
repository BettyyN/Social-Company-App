import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const message = formData.get("message") as string;
    const userId = Number(formData.get("userId"));
    const commentId = Number(formData.get("commentId"));
    if (!message || isNaN(commentId) || isNaN(userId)) {
      return NextResponse.json(
        { message: "Invalid input fields" },
        { status: 400 }
      );
    }
    const updateComment = await db.comment.update({
      where: { commentId },
      data: {
        message,
      },
    });
    return NextResponse.json(updateComment, { status: 200 });
  } catch (error) {
    console.log("Comment update error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = Number(params.id);
    if (isNaN(commentId)) {
      return NextResponse.json({ message: "Invalid Comment ID" }, { status: 400 });
    }
 await db.comment.delete({ where: { commentId: commentId } });
    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Comment delete error", error);
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 }
    );
  }
}
