import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try{
    const permissions = await db.rolePermission.findMany({
        orderBy:{
            permissionId:"asc"
        }
    })
    return NextResponse.json(permissions,{status:200})
  }
  catch(error){
   console.log(error)
   return NextResponse.json({error:"Internal server error"},{status:500})
  }
}

export async function POST(req: NextRequest){
    try{
const body =await req.json();
const existingPermission =await db.rolePermission.findUnique({
    where: {roleId_permissionId:{
        roleId:body.roleId,
        permissionId: body.permissionId,
    }}
})
if(existingPermission){
    return NextResponse.json(
      { permission: null, 
        message: "Permission already exists" },
      { status: 409 }
    );
}
const newPermission = await db.rolePermission.create({
    data:{
        permissionId: body.permissionId,
        roleId: body.roleId,
    }
})
return NextResponse.json(newPermission,{status:201})
    }
    catch(error){
        console.log(error)
        return NextResponse.json(
            {error:"Internal server error"},
            {status:500}
        )
    }
}

