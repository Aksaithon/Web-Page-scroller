import getConnection from "@/lib/dbConnect";
import Users from "@/Models/UserDataSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  try {
    await getConnection();

    const { email, name, username } = await req.json();

    const userExists = await Users.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { isNewUser: false },
        { status: 200 }
      );
    }

    if (!userExists) {
      // Create a new user and save

      const newUser = new Users({ email, name, username });
      const savedNewUser = await newUser.save();

      return NextResponse.json({userId: savedNewUser._id, isNewUser: true});
    }
  } catch (error) {
    return NextResponse.json({ isNewUser: false }, { status: 500 });
  }
}
