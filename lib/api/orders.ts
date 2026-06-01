/**
 * lib/api/orders.ts
 * ──────────────────
 * Axios client function สำหรับส่งออเดอร์จาก Cart page (Client Component)
 * เรียก POST /api/orders → Server Action จัดการ DB + LINE ต่อ
 *
 * หมายเหตุ: Business logic (Prisma + LINE) อยู่ใน app/actions/orders.ts
 */
import apiClient from "@/lib/api/client";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type CreateOrderResponse = {
  order: { id: string; totalPrice: number; status: string };
  lineOaUrl: string;
};

export async function postOrder(
  items: CartItem[],
  customerNote?: string
): Promise<CreateOrderResponse> {
  const { data } = await apiClient.post<CreateOrderResponse>("/api/orders", {
    items,
    customerNote,
  });
  return data;
}
