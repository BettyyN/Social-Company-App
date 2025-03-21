import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { userSchema } from "@/schema/userSchema";
import { ZodError } from "zod";

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
    const { email, firstName, lastName, password, baptismalName, phoneNumber, role } =
      userSchema.parse(body);

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { id: Number(params.id) },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const hashedPassword = await hash(password, 10);
    const updatedUser = await db.user.update({
      where: { id: Number(params.id) },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        baptismalName,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = updatedUser;

    return NextResponse.json(
      { user: rest, message: "User Updated Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in /api/user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
