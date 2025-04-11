import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
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
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const roleId = searchParams.get("id");
    if (roleId) {
      const role = await db.role.findUnique({
        where: {
          roleId: Number(roleId),
        },
      });
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
