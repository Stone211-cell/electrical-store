import { NextRequest, NextResponse } from "next/server";
import { actionGetProducts, actionCreateProduct } from "@/app/actions/products";
import { auth } from "@clerk/nextjs/server";

// GET /api/products?categoryId=xxx&search=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId") ?? undefined;
    const search = searchParams.get("search") ?? undefined;

    const products = await actionGetProducts({ categoryId, search });
    return NextResponse.json(products);
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products  (Admin only)
export async function POST(request: NextRequest) {
  try {
    const { sessionClaims } = await auth();
    const isAdmin = (sessionClaims?.metadata as { isAdmin?: string })?.isAdmin === "true";
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const body = await request.json();
    const product = await actionCreateProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[POST /api/products]", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
