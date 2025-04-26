import { db } from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const postId =Number( params.id);
    const picture = formData.get("picture") as File | null;
    if (isNaN(postId)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }
         
    const authorIdValue = formData.get("authorId");
    let authorId: number | null = null;
    if(authorIdValue !== null){
      const parsedAuthorId = Number(authorIdValue);
      if (isNaN(parsedAuthorId)){
        return NextResponse.json(
          { message: "Invalid author ID"},
          { status: 400}
        );
      }
      authorId = parsedAuthorId;
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
    const updateData = {
      title: title ?? undefined,
      description: description ?? undefined,
      authorId: authorId ?? undefined,
      ...(profilePictureUrl && { picture: profilePictureUrl }),
    };

    const updatePost = await db.post.update({
      where: { postId: postId },
      data: updateData,
    });
    if (!updatePost) {
      return NextResponse.json({ message: "post not found" }, { status: 404 });
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
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
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
