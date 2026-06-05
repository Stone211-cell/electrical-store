import { NextRequest, NextResponse } from "next/server";
import { actionGetCategories, actionCreateCategory } from "@/app/actions/categories";
import { checkIsAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const categories = await actionGetCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("[GET /api/categories]", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    const { name } = await request.json();
    const category = await actionCreateCategory(name);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("[POST /api/categories]", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
