import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params: {id:String}}) {
 try {
   const body = await req.json();
   const permissionId = Number(params.id);
   if (isNaN(permissionId)) {
     return NextResponse.json({ message: "Invalid RoleId" }, { status: 400 });
   }
   const updatePermission = await db.permission.update({
     where: { permissionId: permissionId },
     data: {
       permissionName: body.permissionName,
       description: body.description,
     },
   });
   if (!updatePermission) {
     return NextResponse.json({ message: "Permission not found" }, { status: 400 });
   }
   return NextResponse.json(updatePermission, { status: 200 });
 } catch (error) {
   console.log(error, "Permission update error");
   return NextResponse.json(
     { error: "Internal Server Error" },
     { status: 500 }
   );
 }
}

export async function DELETE(req: NextRequest,{params}:{params:{id : String}}){
    try {
      const permissionId = Number(params.id);
      if (isNaN(permissionId)) {
        return NextResponse.json(
          { message: "Invalid Permission Id" },
          { status: 400 }
        );
      }
      const deletePermission = await db.permission.delete({
        where: { permissionId: permissionId },
      });
      if (!deletePermission) {
        return NextResponse.json(
          { message: "Permission not found" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { message: "Permission deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.log(error, "Permission delete error");
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
}

