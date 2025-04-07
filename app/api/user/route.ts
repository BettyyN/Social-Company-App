import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { userSchema } from "@/schema/userSchema";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request body against schema
    const {
      firstName,
      lastName,
      phoneNumber,
      password,
      baptismalName,
      roleId,
    } = userSchema.parse(body);

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
      where: { phoneNumber },
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

    // Create new user with hashed password
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        baptismalName: baptismalName || null,
        password: hashedPassword,
        role: {
          connect: { roleId: Number(roleId) },
        },
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
        role: true,
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
          role: true,
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
        role: true,
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