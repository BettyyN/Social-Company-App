import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try{
    const groupMember = await db.groupMember.findMany({
        orderBy:{
            groupId:"asc"
        },
        include:{
            user:true,
            group:true
        },
    });
    return NextResponse.json(groupMember, { status: 200 });
    }
      catch(error){
   console.log(error)
   return NextResponse.json({error:"Internal server error"},{status:500})
  }
  }

export async function POST(req: NextRequest){
    try{
const body =await req.json();
const groupId = Number(body.groupId);
const userId = Number(body.userId);
if(isNaN(groupId)|| isNaN(userId)){
    return NextResponse.json({error:"Invalid IDs"},{status:400})
}
const existingUser =await db.groupMember.findUnique({
    where: {
        userId_groupId: {
            userId,
            groupId,
        },
    }
})
if (existingUser) {
  return NextResponse.json(
    { group: null, message: "User already exists" },
    { status: 409 }
  );
}
const newMember = await db.groupMember.create({
    data:{
        userId,
        groupId,
    }
})
return NextResponse.json(newMember,{status:201})
    }
    catch(error){
        console.log(error)
        return NextResponse.json(
            {error:"Internal server error"},
            {status:500}
        )
    }
}



