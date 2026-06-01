import axios from "axios";
import type { CartItem } from "@/lib/api/orders";

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN ?? "";
const ADMIN_LINE_USER_ID = process.env.ADMIN_LINE_USER_ID ?? "";

// ─── LINE Messaging API (แจ้งเตือนร้านค้า) ─────────────────────────────────────────
export async function sendAdminLineNotify(
  orderId: string,
  items: CartItem[],
  totalPrice: number,
  customerNote?: string
): Promise<void> {
  if (!LINE_CHANNEL_ACCESS_TOKEN || !ADMIN_LINE_USER_ID) {
    console.warn("[LINE] Token or Admin User ID not set. Skipping notification.");
    return;
  }

  const itemList = items
    .map((i) => `• ${i.name} x${i.quantity} = ฿${(i.price * i.quantity).toLocaleString()}`)
    .join("\n");

  const message = [
    "🔔 มีออเดอร์ใหม่!",
    "──────────────",
    `🆔 ออเดอร์: #${orderId.slice(-8).toUpperCase()}`,
    "",
    "📦 รายการสินค้า:",
    itemList,
    "",
    `💰 ยอดรวม: ฿${totalPrice.toLocaleString()}`,
    customerNote ? `📝 หมายเหตุ: ${customerNote}` : null,
    "──────────────",
    "⚡ กรุณาเข้าไปตรวจสอบในระบบหลังบ้านครับ",
  ]
    .filter(Boolean)
    .join("\n");

  await pushLineMessage(ADMIN_LINE_USER_ID, [{ type: "text", text: message }]);
}

// ─── LINE Messaging API (Push Message ไปหาลูกค้า) ───────────────────────────
// ใช้ Channel Access Token จาก LINE Developers Console
// วิธีขอ: https://developers.line.biz/console → Channel → Messaging API → Issue Token

export async function pushLineMessage(
  userId: string,
  messages: LineMessage[]
): Promise<void> {
  if (!LINE_CHANNEL_ACCESS_TOKEN) {
    console.warn("[LINE Messaging API] Token not set. Skipping push.");
    return;
  }

  await axios.post(
    "https://api.line.me/v2/bot/message/push",
    { to: userId, messages },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      },
    }
  );
}

// ── Types ────────────────────────────────────────────────────────────────────

export type LineMessage =
  | { type: "text"; text: string }
  | {
      type: "flex";
      altText: string;
      contents: Record<string, unknown>;
    };
