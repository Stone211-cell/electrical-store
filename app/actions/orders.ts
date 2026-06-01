"use server";

import { prisma } from "@/lib/prisma";
import { sendAdminLineNotify } from "@/lib/line";
import type { CartItem } from "@/lib/api/orders";
import type { Prisma } from "@prisma/client";

export async function actionCreateOrder(items: CartItem[], customerNote?: string) {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lineOaUrl = buildLineOpenChatUrl(items);

  const order = await prisma.order.create({
    data: {
      items: items as unknown as Prisma.InputJsonValue,
      totalPrice,
      customerNote,
      lineOaUrl,
    },
  });

  // ส่ง LINE Notify แจ้งร้านค้า (ไม่ block ถ้า fail)
  sendAdminLineNotify(order.id, items, totalPrice, customerNote).catch(
    (err) => console.error("[LINE Notify] failed:", err)
  );

  return { order, lineOaUrl };
}

export async function actionGetOrders() {
  return prisma.order.findMany({ orderBy: { createdAt: "desc" } });
}

export async function actionUpdateOrderStatus(id: string, status: string) {
  return prisma.order.update({ where: { id }, data: { status } });
}

// ── helpers ──────────────────────────────────────────────────────────────────

function buildLineOpenChatUrl(items: CartItem[]): string {
  const LINE_OA_ID = process.env.LINE_OA_ID ?? "@565ccvcl";
  const itemList = items
    .map((i) => `• ${i.name} x${i.quantity} (฿${i.price.toLocaleString()})`)
    .join("\n");
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const message = encodeURIComponent(
    `สวัสดีครับ/ค่ะ ต้องการสั่งซื้อสินค้า:\n${itemList}\n\nยอดรวม: ฿${total.toLocaleString()}\n\nขอบคุณครับ/ค่ะ 🙏`
  );
  return `https://line.me/R/ti/p/${LINE_OA_ID}?text=${message}`;
}
