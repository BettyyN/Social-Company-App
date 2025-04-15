import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try{
    const rolePermissions = await db.rolePermission.findMany({
        orderBy:{
            roleId:"asc"
        },
        include:{
            permission:true,
            role:true
        },
    });
    const grouped = new Map();
    for (const item of rolePermissions){
        const roleId = item.roleId;
        if(!grouped.has(roleId)){
            grouped.set(roleId,{
                roleId: item.roleId,
                roleName: item.role.roleName,
                permissions:[],
            });
        }
        grouped.get(roleId).permissions.push({
            permissionId: item.permissionId,
            permissionName: item.permission.permissionName,
            description: item.permission.description,
        });
    }
    return NextResponse.json(Array.from(grouped.values()), { status: 200 });
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

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { roleId, permissionId } = body;
  if (!roleId || !permissionId) {
    return NextResponse.json(
      { error: "Missing roleId or permissionId" },
      { status: 400 }
    );
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
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roleId = Number(searchParams.get("roleId"));
  const permissionId = Number(searchParams.get("permissionId"));
  if (!roleId || !permissionId) {
    return NextResponse.json(
      { error: "Mission roleId or permissionId" },
      { status: 400 }
    );
  }
  try {
    await db.rolePermission.delete({
      where: {
        roleId_permissionId: {
          roleId,
          permissionId,
        },
      },
    });

    return NextResponse.json(
      { message: "Permission removed from role successfully" },
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


