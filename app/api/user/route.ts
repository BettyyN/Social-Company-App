import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { userSchema } from "@/app/schema/userSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, password, positionId, phoneNumber } =
      userSchema.parse(body);

    //check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const existingUserByphoneNumber = await db.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });
    if (existingUserByphoneNumber) {
      return NextResponse.json(
        { user: null, message: "User with this phone number already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        position: positionId ? { connect: { id: positionId } } : undefined,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User Created Successfully" },
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
