import axios from "axios";
import type { CartItem } from "@/lib/api/orders";

const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN ?? "";
const LINE_CHANNEL_ACCESS_TOKEN =
  process.env.LINE_CHANNEL_ACCESS_TOKEN ?? "";

// ─── LINE Notify (แจ้งเตือนร้านค้า) ─────────────────────────────────────────
// ใช้ LINE Notify Token ที่ได้จาก https://notify-bot.line.me/
// วิธีขอ: Login → Generate Token → ตั้งชื่อ → เลือกกลุ่มหรือตัวเอง → Copy

export async function sendAdminLineNotify(
  orderId: string,
  items: CartItem[],
  totalPrice: number,
  customerNote?: string
): Promise<void> {
  if (!LINE_NOTIFY_TOKEN) {
    console.warn("[LINE Notify] TOKEN not set. Skipping notification.");
    return;
  }

  const itemList = items
    .map((i) => `• ${i.name} x${i.quantity} = ฿${(i.price * i.quantity).toLocaleString()}`)
    .join("\n");

  const message = [
    "",
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
    "⚡ กรุณาติดต่อลูกค้าทาง LINE OA ของร้านค้า",
  ]
    .filter(Boolean)
    .join("\n");

  await axios.post(
    "https://notify-api.line.me/api/notify",
    new URLSearchParams({ message }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
      },
    }
  );
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
