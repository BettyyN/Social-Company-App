import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { userSchema, userSchemaPartial } from "@/schema/userSchema";
import { z, ZodError } from "zod";
import { uploadImage } from "@/lib/uploadImage";
// import { RoleType } from "@prisma/client";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id || typeof params.id !== "string") {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = Number(params.id);
    if (!userId) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const formData = await req.formData();

    const user = await db.user.findUnique({ where: { userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Optional updates
    const firstName = formData.get("firstName") as string | null;
    const lastName = formData.get("lastName") as string | null;
    const baptismalName = formData.get("baptismalName") as string | null;
    const phoneNumber = formData.get("phoneNumber") as string | null;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const roleId = formData.get("roleId") ? Number(formData.get("roleId")) : null;
    const profilePicture = formData.get("profilePicture") as File | null;

    let profilePictureUrl = user.profilePicture;
    if (profilePicture) {
      const uploadUrl = await uploadImage(profilePicture, "group-profiles");
      if (!uploadUrl) {
        return NextResponse.json({ error: "Image upload failed" }, { status: 400 });
      }
      profilePictureUrl = uploadUrl;
    }

    const updatedUser = await db.user.update({
      where: { userId },
      data: {
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        baptismalName: baptismalName ?? undefined,
        phoneNumber: phoneNumber ?? undefined,
        email: email ?? undefined,
        roleId: roleId ?? undefined,
        profilePicture: profilePictureUrl,
        password: password ? await hash(password, 10) : undefined,
      },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(
      { user: userWithoutPassword, message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}