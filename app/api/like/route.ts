import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export  async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();
    const userId = Number(body.userId);
    const postId = Number(body.postId);
    if(isNaN(userId)|| isNaN(postId)){
        return NextResponse.json({error:"Invalid IDs"},{status:400})
    }
    const existingLike =await db.like.findUnique({
        where: {userId_postId:{
             userId,
            postId,
        }}
    })
    if(existingLike){
        return NextResponse.json(
          { like: null, 
            message: "like already exists" },
          { status: 409 }
        );
    }
    const newlike = await db.like.create({
        data:{
            postId,
            userId,
        }
    })
    return NextResponse.json(newlike,{status:201})
        }
        catch(error){
            console.log(error)
            return NextResponse.json(
                {error:"Internal server error"},
                {status:500}
            )
        }
    }
export async function DELETE(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));
  const postId = Number(searchParams.get("postId"));
  if (!userId || !postId) {
    return NextResponse.json(
      { error: "Mission userId or postId" },
      { status: 400 }
    );
  }
  try {
    await db.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return NextResponse.json(
      { message: "unlike" },
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