/**
 * lib/api/products.ts
 * ────────────────────
 * Axios client functions สำหรับเรียก /api/products จาก Client Components
 * ใช้ใน: หน้าสินค้า, Cart page (client-side fetch)
 *
 * หมายเหตุ: Admin CRUD ใช้ Server Actions ใน app/actions/products.ts แทน
 */
import apiClient from "@/lib/api/client";
import type { Product, Category } from "@prisma/client";

export type ProductWithCategory = Product & { category: Category };

export async function fetchProducts(opts?: {
  categoryId?: string;
  search?: string;
}): Promise<ProductWithCategory[]> {
  const params: Record<string, string> = {};
  if (opts?.categoryId) params.categoryId = opts.categoryId;
  if (opts?.search) params.search = opts.search;

  const { data } = await apiClient.get<ProductWithCategory[]>("/api/products", { params });
  return data;
}

export async function fetchProductById(id: string): Promise<ProductWithCategory> {
  const { data } = await apiClient.get<ProductWithCategory>(`/api/products/${id}`);
  return data;
}
