import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { userSchema, userSchemaPartial } from "@/schema/userSchema";
import { z, ZodError } from "zod";
// import { RoleType } from "@prisma/client";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ID format
    if (!params.id || typeof params.id !== "string") {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Perform actual database deletion
    const deletedUser = await db.user.delete({
      where: { userId: Number(params.id) },
    });

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE User Error:", error);

    // Handle Prisma not found error specifically
    if ((error as any).code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}


export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate user ID
    if (!params.id || isNaN(Number(params.id))) {
      return NextResponse.json(
        { message: "Valid user ID is required" },
        { status: 400 }
      );
    }
    const userId = Number(params.id);

    // Parse and validate request body
    const body = await req.json();
    const parsedData = userSchemaPartial.parse(body);
    const { password, role, ...otherFields } = parsedData;

    // Check user existence first
    const existingUser = await db.user.findUnique({
      where: { userId },
      include: { role: true },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = { ...otherFields };

    // Handle role update
    if (typeof role !== "undefined") {
      if (role) {
        // Find existing role
        const roleRecord = await db.role.findFirst({
          where: {
            OR: [
              { roleId: Number(role) }, // Allow ID reference
              { roleName: role }, // Or name reference
            ],
          },
        });

        if (!roleRecord) {
          return NextResponse.json(
            { error: "Role not found - create it first" },
            { status: 400 }
          );
        }

        updateData.role = { connect: { roleId: roleRecord.roleId } };
      } else {
        // Remove role association
        if (existingUser.role) {
          updateData.role = { disconnect: true };
        }
      }
    }

    // Handle password update
    if (password) {
      if (typeof password === "string") {
        if (password.length < 8) {
          return NextResponse.json(
            { error: "Password must be at least 8 characters" },
            { status: 400 }
          );
        }
        updateData.password = await hash(password, 10);
      } else {
        return NextResponse.json(
          { error: "Invalid password format" },
          { status: 400 }
        );
      }
    }

    // Perform the update
    const updatedUser = await db.user.update({
      where: { userId },
      data: updateData,
      include: {
        role: {
          select: {
            roleId: true,
            roleName: true,
            description: true,
          },
        },
      },
    });

    // Sanitize response
    const { password: _, ...safeUserData } = updatedUser;

    return NextResponse.json(
      { user: safeUserData, message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("User update error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    // Handle Prisma errors
    if ((error as any).code === "P2025") {
      return NextResponse.json(
        { error: "User/Role not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
