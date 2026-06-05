import { NextRequest, NextResponse } from "next/server";
import { actionGetProductById, actionUpdateProduct, actionDeleteProduct } from "@/app/actions/products";
import { checkIsAdmin } from "@/lib/admin";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const product = await actionGetProductById(id);
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    console.error("[GET /api/products/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    const body = await request.json();
    const product = await actionUpdateProduct(id, body);
    return NextResponse.json(product);
  } catch (error) {
    console.error("[PUT /api/products/[id]]", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    await actionDeleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/products/[id]]", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
