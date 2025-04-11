import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const roleId = Number(params.id);
    if (isNaN(roleId)){
        return NextResponse.json(
            {message:"Invalid role ID"},
            {status:400}
        )
    }
    const updatedRole = await db.role.update({
        where: {roleId:roleId},
        data:{
            roleName: body.roleName,
            description: body.description,
        }
    })
    if(!updatedRole){
        return NextResponse.json({message:"Role not foound"},{status:400})
    }
    return NextResponse.json(updatedRole,{status:200})
  } catch (error) {
    console.log(error, 'role update error');
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
    const roleId = Number(params.id);
    if(isNaN(roleId)){
        return NextResponse.json(
            {message:"Invalid role ID"},
            {status:400}
        )
    }
    const deletedRole = await db.role.delete({where:{roleId:roleId}})
    if (!deletedRole){
        return NextResponse.json({message:"Role not found"}, {status:400})
    }
    return NextResponse.json({message:"Role deleted successfully"},{status:200})
  } catch (error) {
    console.log(error,'role delete error')
    return NextResponse.json(
        {error:"Internal sever error"},
        {status:500}
    )
  }
}
