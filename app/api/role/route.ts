import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
     const existingRole = await db.role.findFirst({
          where: { roleName: body.roleName },
        });
    
        if (existingRole) {
          return NextResponse.json(
            {
              role: null,
              message: "role already exists",
            },
            { status: 409 }
          );
        }
    const newRole = await db.role.create({
      data: {
        roleName: body.roleName,
        description: body.description,
      },
    });
    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roleId = searchParams.get("id");
    if (roleId) {
      const role = await db.role.findUnique({
        where: {
          roleId: Number(roleId),
        },
      });
      if (!role) {
        return NextResponse.json({ error: "Role not found" }, { status: 404 });
      }
      return NextResponse.json(role,{status:200})
    }
    
    const roles = await db.role.findMany({
      orderBy: {
        roleId: "asc",
      },
    });
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
