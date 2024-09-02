import getConnection from "@/lib/dbConnect";
import Users from "@/Models/UserDataSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  try {
    await getConnection();

    const { email, name } = await req.json();

    const userExists = await Users.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }

    // Create a new user and save

    const newUser = new Users({ email, name });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
