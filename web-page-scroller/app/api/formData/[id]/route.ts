import getConnection from "@/lib/dbConnect";
import Users from "@/Models/UserDataSchema";
import { NextRequest, NextResponse } from "next/server";


type Params = Promise<{id: string}>

export const GET = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  const { id } = await params;
  try {
    await getConnection();

    const thisNewUser = await Users.findOne({ email: id });

    // return NextResponse.json(thisNewUser);

    if (thisNewUser) {
      return NextResponse.json({ userAllData: thisNewUser })
    } else {
      return NextResponse.json({ message: "change [id] file" });
    }
  } catch (error) {
    return NextResponse.json({ message: "unable to find user", error });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{id: any}> }
) => {
  const { id } = await params;

  try {
    await getConnection();

    const { email, name, username } = await req.json();

    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { email, name, username },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully!", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update user", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
};
