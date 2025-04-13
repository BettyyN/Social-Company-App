import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req:NextRequest){
    const body = await req.json();
    const {roleId, permissionId} = body;
    if(!roleId || !permissionId){
        return NextResponse.json({error:"Missing roleId or permissionId"},{status:400})
    }
    try {
      const updatePermission = await db.rolePermission.update({
        where: {
          roleId_permissionId: {
            roleId: Number(roleId),
            permissionId: Number(permissionId),
          },
        },
        data: {
          roleId: Number(roleId),
          permissionId: Number(permissionId),
        },
      });
      return NextResponse.json(updatePermission, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }}

export async function DELETE(req: NextRequest) {

   const {searchParams} = new URL(req.url);
   const roleId = searchParams.get("roleId");
   const permissionId = searchParams.get("permissionId");
   if(!roleId || !permissionId){
    return NextResponse.json({error: "Mission roleId or permissionId"},{status:400})
   }
 try {
   const deletePermission = await db.rolePermission.delete({
     where: {
       roleId_permissionId: {
         roleId: Number(roleId),
         permissionId: Number(permissionId),
       },
     },
   });

   return NextResponse.json(deletePermission, { status:200})
 }
  catch (error) {
   console.log(error);
   return NextResponse.json(
     { error: "Internal Server Error" },
     { status: 500 }
   );
 }
}


