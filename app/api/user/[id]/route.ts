import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { userSchema, userSchemaPartial } from "@/schema/userSchema";
import { ZodError } from "zod";
import { RoleType } from "@prisma/client";

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
      where: { id: Number(params.id) },
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
  if (!params.id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const parsedData = userSchemaPartial.parse(body);
    const { password, role, ...otherFields } = parsedData;

    // Initialize update data with non-role fields
    const updateData: any = { ...otherFields };

   if (typeof role !== "undefined") {
     if (role) {
       // Find role using the enum value directly
       const roleRecord = await db.role.findUnique({
         where: { role: role as RoleType }, 
       });

       if (!roleRecord) {
         return NextResponse.json(
           { error: "Invalid role specified" },
           { status: 400 }
         );
       }

       updateData.role = { connect: { id: roleRecord.id } };
     } else {
       // Handle role removal
       updateData.role = { disconnect: true };
     }
   }
    // Handle password update
    if (password) {
      if (typeof password === "string") {
        updateData.password = await hash(password, 10);
      } else {
        return NextResponse.json(
          { error: "Invalid password format" },
          { status: 400 }
        );
      }
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { id: Number(params.id) },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Perform the update
    const updatedUser = await db.user.update({
      where: { id: Number(params.id) },
      data: updateData,
    });

    // Exclude password from response
    const { password: _, ...safeUserData } = updatedUser;

    return NextResponse.json(
      { user: safeUserData, message: "User Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/user:", error);

    // Handle Prisma specific errors
    if ((error as any).code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
