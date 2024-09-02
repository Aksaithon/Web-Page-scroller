import getConnection from "@/lib/dbConnect";
import Page from "@/Models/PageDataSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  const { text, tags } = await req.json();
  await getConnection;
  await Page.create({ text, tags });
  return NextResponse.json(
    { message: "Page created successfully!" },
    { status: 201 }
  );
}

// get all data with pagination
export const GET = async (req: NextRequest) => {
  try {
    await getConnection();
    
    // Get the page number from the query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') as string) || 1; // Default to page 1
    const limit = 5; // Limit the number of items returned
    const skip = (page - 1) * limit; // Calculate how many items to skip

    const texts = await Page.find().skip(skip).limit(limit);
    
    return NextResponse.json(texts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};

