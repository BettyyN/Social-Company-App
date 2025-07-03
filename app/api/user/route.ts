import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";
import { uploadImage } from "@/lib/uploadImage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const roleId =Number( formData.get("roleId")) ;
    const phoneNumber = formData.get("phoneNumber") as string 
    const firstName = formData.get("firstName") as string
    const password= formData.get("password") as string
     const lastName = formData.get("lastName") as string;
     const email = formData.get("email") as string | null;
      const baptismalName = formData.get("baptismalName") as string | null;
      const profilePicture = formData.get("profilePicture") as File | null;


    // Check if the specified role exists
    const roleExists = await db.role.findUnique({
      where: { roleId: Number(roleId) },
    });

    if (!roleExists) {
      return NextResponse.json(
        { error: "Invalid role ID specified" },
        { status: 400 }
      );
    }

    // Check for existing user with phone number
    const existingUser = await db.user.findUnique({
      where: { phoneNumber: phoneNumber as string | undefined },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this phone number already exists",
        },
        { status: 409 }
      );
    }

 let profilePictureUrl: string | null = null;
    if (profilePicture) {
      profilePictureUrl = await uploadImage(
       profilePicture,
        "group-profiles"
      );

      if (!profilePictureUrl) {
        return NextResponse.json(
          { error: "Error uploading profile picture" },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        baptismalName,
        email,
        password: hashedPassword,
        roleId,
        profilePicture: profilePictureUrl,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { user: userWithoutPassword, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user creation:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    // Handle Prisma errors
    if ((error as any).code === "P2002") {
      return NextResponse.json(
        { error: "Phone number already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get query parameters
    const id = searchParams.get("id");
    const search = searchParams.get("search");
    const phone = searchParams.get("phone");

    // Base query with role inclusion
    const baseQuery = {
      include: {
        role: {
          select:{
            roleName:true,
          }
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        baptismalName: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        role: true,
      }
    };

    // Get by ID
    if (id) {
      const user = await db.user.findUnique({
        where: { userId: Number(id) },
        include: {
          role: {
            select:{
              roleName:true,
            }
          },
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(user);
    }

    // Search functionality
    let whereClause = {};
    
    if (search) {
      whereClause = {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { baptismalName: { contains: search, mode: 'insensitive' } }
        ]
      };
    }

    if (phone) {
      whereClause = {
        ...whereClause,
        phoneNumber: { contains: phone }
      };
    }

    // Get all users with optional filters
    const users = await db.user.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        role: {
          select:{
            roleName:true,
          }
        },
      }
    });

    return NextResponse.json(users);

  } catch (error) {
    console.error("Error in /api/user GET:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}