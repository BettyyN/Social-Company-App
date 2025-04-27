import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = Number(params.id);
    const userId = Number(req.headers.get("userId"));

     if (isNaN(postId) || isNaN(userId)) {
       return NextResponse.json(
         { error: "Invalid post or user ID" },
         { status: 400 }
       );
     }

    const like = await db.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return NextResponse.json({ liked: !!like }, { status: 200 });
  } catch (error) {
    console.error("Error checking like:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
     const { id } = context.params; 
     const postId = Number(id);
     const userId = Number(req.headers.get("userId"));

  if (isNaN(postId) || isNaN(userId)) {
    return NextResponse.json(
      { error: "Invalid post or user ID" },
      { status: 400 }
    );
  }

       const post = await db.post.findUnique({
         where: { postId },
       });

       if (!post) {
         return NextResponse.json({ error: "Post not found" }, { status: 404 });
       }

    // Check if like exists
    const existingLike = await db.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    let result;
    if (existingLike) {
      result = await db.like.delete({
        where: {
          userId_postId: {
            userId: Number(userId),
            postId: postId,
          },
        },
      });
    } else {
      // Like if not already liked
      result = await db.like.create({
        data: {
          userId: Number(userId),
          postId: postId,
        },
      });
    }

    // Get updated like count
    const likeCount = await db.like.count({
      where: { postId: postId },
    });

    return NextResponse.json(
      {
        liked: !existingLike,
        likeCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
