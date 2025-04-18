import { db } from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const authorId = Number(formData.get("authorId"));
    const postId = formData.get("postId")
      ? Number(formData.get("postId"))
      : null;
    const picture = formData.get("picture") as File | null;
    if (postId === null || isNaN(postId)) {
      return NextResponse.json(
        { message: "Invalid post ID" },
        { status: 400 }
      );
    }
    let profilePictureUrl: string | null = null;
    if (picture) {
      profilePictureUrl = await uploadImage(picture, "post-profiles");

      if (!profilePictureUrl) {
        return NextResponse.json(
          { error: "Error uploading profile picture" },
          { status: 400 }
        );
      }
    }
    const updatePost = await db.post.update({
      where: { postId: postId },
      data: {
        title,
        description,
        picture: profilePictureUrl,
        authorId,
      },
    });
    if (!updatePost) {
      return NextResponse.json({ message: "post not found" }, { status: 400 });
    }
    return NextResponse.json(updatePost, { status: 200 });
  } catch (error) {
    console.log(error, "post update error");
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
    const postId = Number(params.id);
    if (isNaN(postId)) {
      return NextResponse.json(
        { message: "Invalid post ID" },
        { status: 400 }
      );
    }
    const deletedPost = await db.post.delete({ where: { postId: postId } });
    if (!deletedPost) {
      return NextResponse.json({ message: "post not found" }, { status: 400 });
    }
    return NextResponse.json(
      { message: "post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "post delete error");
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 }
    );
  }
}
