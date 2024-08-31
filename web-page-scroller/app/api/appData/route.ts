import getConnection from "@/lib/dbConnect";
import Page from "@/Models/PageDataSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  const { text, tags } = await req.json();
  await getConnection;
  await Page.create({ text, tags });
  return NextResponse.json(
    { message: "Page created successfully!" },
    { status: 201 }
  );
}

// get all data
export const GET = async () => {
  try {
    await getConnection();
    const texts = await Page.find().limit(5);
    return NextResponse.json(texts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
