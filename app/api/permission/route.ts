import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try{
    const searchParams =new URL(req.url).searchParams;
    const permissionId = searchParams.get("id");
    if(permissionId){
        const permission= await db.permission.findUnique({
            where: {permissionId: Number(permissionId)}
        })
        if(!permission){
            return NextResponse.json({messages:"No Permission found"},{status:404})
        }
        return NextResponse.json(permission,{status:200})
    }
    const permissions = await db.permission.findMany({
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
const existingPermission =await db.permission.findUnique({
    where: {permissionName: body.permissionName}
})
if(existingPermission){
    return NextResponse.json(
      { permission: null, 
        message: "Permission already exists" },
      { status: 409 }
    );
}
const newPermission = await db.permission.create({
    data:{
        permissionName: body.permissionName,
        description: body.description,
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

