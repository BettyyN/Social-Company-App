import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const groupId = Number(params.id);
    if (isNaN(groupId)){
        return NextResponse.json(
            {message:"Invalid group ID"},
            {status:400}
        )
    }
    const updatedGroup = await db.group.update({
        where: {groupId:groupId},
        data:{
            groupName: body.groupName,
            groupDescription: body.groupDescription,
            profilePicture: body.profilePicture,
        }
    })
    if(!updatedGroup){
        return NextResponse.json({message:"group not found"},{status:400})
    }
    return NextResponse.json(updatedGroup,{status:200})
  } catch (error) {
    console.log(error, 'group update error');
    return NextResponse.json(
        {error:"Internal Server Error"},
        {status:500}
    )
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const groupId = Number(params.id);
    if (isNaN(groupId)) {
      return NextResponse.json({ message: "Invalid group ID" }, { status: 400 });
    }
    const deletedGroup = await db.group.delete({ where: { groupId: groupId } });
    if (!deletedGroup) {
      return NextResponse.json({ message: "Group not found" }, { status: 400 });
    }
    return NextResponse.json({message:"Group deleted successfully"},{status:200})
  } catch (error) {
    console.log(error,'Group delete error')
    return NextResponse.json(
        {error:"Internal sever error"},
        {status:500}
    )
  }
}
