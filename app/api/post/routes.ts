import { db } from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const authorId = Number(formData.get("authorId"));
    const postId = formData.get("postId")
      ? Number(formData.get("postId"))
      : null;
    const picture = formData.get("picture") as File | null;

    if (!title || !description || !authorId) {
      return NextResponse.json(
        { error: "title, description, and authorId are required" },
        { status: 400 }
      );
    }

    // Optional image upload
    let pictureUrl: string | null = null;
    if (picture) {
      pictureUrl = await uploadImage(picture, "post-images");

      if (!pictureUrl) {
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 400 }
        );
      }
    }

    // Optional: Validate postId exists
    if (postId) {
      const post = await db.post.findUnique({ where: { postId } });
      if (!post) {
        return NextResponse.json({ error: "post not found" }, { status: 404 });
      }
    }

    const newPost = await db.post.create({
      data: {
        title,
        description,
        picture: pictureUrl,
        authorId,
        postId: postId ?? undefined,
      },
    });

    return NextResponse.json(
      { post: newPost, message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = Number(searchParams.get("id"));
    if (postId) {
      const post = await db.post.findUnique({
        where: {
          postId: postId,
        },
      });
      if (!post) {
        return NextResponse.json({ error: "post not found" }, { status: 404 });
      }
      return NextResponse.json(post, { status: 200 });
    }

    const posts = await db.post.findMany({
      orderBy: {
        postId: "asc",
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
