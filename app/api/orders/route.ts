import { NextRequest, NextResponse } from "next/server";
import { actionCreateOrder, actionGetOrders } from "@/app/actions/orders";
import { checkIsAdmin } from "@/lib/admin";

// GET /api/orders (Admin only)
export async function GET() {
  try {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const orders = await actionGetOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("[GET /api/orders]", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST /api/orders (Public — ลูกค้ากดสั่งซื้อ)
export async function POST(request: NextRequest) {
  try {
    const { items, customerNote } = await request.json();
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Items are required" }, { status: 400 });
    }

    const result = await actionCreateOrder(items, customerNote);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[POST /api/orders]", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
