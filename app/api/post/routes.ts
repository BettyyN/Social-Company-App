import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req:NextRequest){
  try{
    const body = await req.json();
    if(!body.title || !body.authorId){
      return NextResponse.json({
        error:"add all required field"
      },
    {
      status:400
    }
  )
    }
    const newPost = await prisma.post.create({
      data:{
        title: body.title,
        description: body.description,
        picture: body.picture,
        authorId: Number(body.authorId),
        groupId: body.groupId ? Number(body.groupId) : null,
      }
    })
    return NextResponse.json(newPost, {status:201})
  }
  catch(error){
    return NextResponse.json(
      {  error:"Failed to create post"  },
      { status:500}
)
  }
}

export async function PUT(req:NextRequest){
  try{
    const { searchParams} = new URL(req.url);
    const postId  =Number(searchParams.get('postId'))
    const body = await req.json();
    if(!postId){
      return NextResponse.json ( 
      { error : " postId is required"},
      { status: 400 }
      )
    }
 const updatePost =await prisma.post.update({
  where:{postId},
  data:{
    title: body.title,
    description: body.description,
    picture: body.picture,
    authorId: Number(body.groupId),
    groupId: body.groupId ? Number(body.groupId): null,
  }
 })
 return NextResponse.json(updatePost)
  }
  catch(error){
    return NextResponse.json(
      { error : "Failed to update post" },
    {  status: 500}
  
    )
  }
}

export async function DELETE(req:NextRequest){
  try{
    const {searchParams}= new URL(req.url);
    const postId = Number(searchParams.get('postId'))
    if(!postId){
      return NextResponse.json(
        {error:"Post Id is requeied"},
        {status:400}
      )
    }
    await prisma.post.delete({
      where:{postId}
    })
    return NextResponse.json(
      { message:"post deleted successfully"},
      {status:200}
    )
  }
  catch(error){
    return NextResponse.json(
      { error: "The post deletion failed"},
      {status: 500}
    )
  }
}

export async function GET(req:NextRequest){
  try{
    const {searchParams}=new URL(req.url);
    const posts = await prisma.post.findMany({
      where:{
        authorId:
        searchParams.get('authorId')? Number(searchParams.get('authorId')):undefined,
        groupId: searchParams.get('groupId')? Number(searchParams.get('groupId')):undefined
      },
      include:{
        author: true,
        comments:true
      }
    })
    return NextResponse.json(posts)
  }
  catch(error){
    return NextResponse.json(
      {error:"Failed to fetch posts"},
      {status:500}
    )
  }
}