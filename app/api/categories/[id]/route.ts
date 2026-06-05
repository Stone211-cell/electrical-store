import { NextRequest, NextResponse } from "next/server";
import { actionUpdateCategory, actionDeleteCategory } from "@/app/actions/categories";
import { checkIsAdmin } from "@/lib/admin";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    const { name } = await request.json();
    const category = await actionUpdateCategory(id, name);
    return NextResponse.json(category);
  } catch (error) {
    console.error("[PUT /api/categories/[id]]", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    await actionDeleteCategory(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/categories/[id]]", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
