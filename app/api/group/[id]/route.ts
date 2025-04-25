import { db } from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData();
    const groupId = Number(params.id);
    const groupName= formData.get("groupName") as string | null;
    const groupDescription = formData.get("groupDescription") as string | null;
    const profilePicture = (formData.get("profilePicture") as File) || null;
    if (isNaN(groupId)){
        return NextResponse.json(
            {message:"Invalid group ID"},
            {status:400}
        )
    }
    let profilePictureUrl: string | null = null;
        if (profilePicture) {
          profilePictureUrl = await uploadImage(
           profilePicture,
            "group-profiles"
          );
    
          if (!profilePictureUrl) {
            return NextResponse.json(
              { error: "Error uploading profile picture" },
              { status: 400 }
            );
          }
        }
    const updatedGroup = await db.group.update({
      where: { groupId: groupId },
      data: {
        groupName: groupName ?? undefined,
        groupDescription: groupDescription ?? undefined,
        profilePicture: profilePictureUrl ,
      },
    });
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
