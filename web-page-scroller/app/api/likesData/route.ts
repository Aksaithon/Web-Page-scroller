import getConnection from "@/lib/dbConnect";
import Page from "@/Models/PageDataSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await getConnection();

    const { likes } = await req.json();

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    const updateLikes = await Page.findByIdAndUpdate(
      postId,
      { likes },
      { new: true }
    );

    if (!updateLikes) {
      return NextResponse.json(
        { message: "Error updating likes" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "updated liked" }, { status: 200 });
  } catch (error) {}
}
