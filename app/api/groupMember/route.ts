import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
 try {
   const groupsWithMembers = await db.group.findMany({
     where: {
       deletedAt: null,
     },
     select: {
       groupId: true,
       groupName: true,
       groupDescription: true,
       members: {
         include: {
           user: {
             select: {
               userId: true,
               firstName: true,
               lastName: true,
               phoneNumber: true,
               baptismalName: true,
               profilePicture: true,
               createdAt: true,
               roleId: true,
             },
           },
         },
       },
     },
   });


   const formatted = groupsWithMembers.map((group) => ({
     groupId: group.groupId,
     groupName: group.groupName,
     groupDescription: group.groupDescription,
     members: group.members.map((member) => member.user),
   }));

   return NextResponse.json(formatted, { status: 200 });
 } catch (error) {
   console.error("Error fetching groups with members:", error);
   return NextResponse.json(
     { error: "Internal Server Error" },
     { status: 500 }
   );
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



