import getConnection from "@/lib/dbConnect";
import Users from "@/Models/UserDataSchema";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string | null } }
) {
  const { username } = params;

  try {
    await getConnection();

    const userAvailable = await Users.findOne({ username: username });

    if (userAvailable) {
      return NextResponse.json({ isAvailable: false });
    }

    if (!userAvailable) {
      return NextResponse.json({ isAvailable: true });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to find username" },
      { status: 404 }
    );
  }
}
