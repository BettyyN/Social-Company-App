import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try{
    const permissions = await db.rolePermission.findMany({
        orderBy:{
            permissionId:"asc"
        },
        include:{
            permission:true,
            role:true
        },
    });
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
const roleId = Number(body.roleId);
const permissionId = Number(body.permissionId);
if(isNaN(roleId)|| isNaN(permissionId)){
    return NextResponse.json({error:"Invalid IDs"},{status:400})
}
const existingPermission =await db.rolePermission.findUnique({
    where: {roleId_permissionId:{
         roleId,
        permissionId,
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
        permissionId,
        roleId,
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

