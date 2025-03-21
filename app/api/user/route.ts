import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { userSchema } from "@/schema/userSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, password, baptismalName, phoneNumber,role } =
      userSchema.parse(body);
     const roleRecord = await db.role.findFirst({
       where: { role: role }, // Match your schema's role name field
     });

     if (!roleRecord) {
       return NextResponse.json(
         { error: "Invalid role specified" },
         { status: 400 }
       );
     }

    // Check for existing users
    const [existingEmail, existingPhone] = await Promise.all([
      db.user.findUnique({ where: { email } }),
      db.user.findUnique({ where: { phoneNumber } }),
    ]);

    if (existingEmail || existingPhone) {
      return NextResponse.json(
        {
          user: null,
          message: existingEmail
            ? "User with this email already exists"
            : "User with this phone number already exists",
        },
        { status: 409 }
      );
    }

    // Create new user with role connection
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email: email || null, 
        phoneNumber,
        baptismalName: baptismalName || null,
        password: hashedPassword,
        role: {
          connect: { id: roleRecord.id }
        }
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { user: userWithoutPassword, message: "User Created Successfully" },
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
        where: { id: Number(id) },
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