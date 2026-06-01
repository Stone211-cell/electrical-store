/**
 * lib/api/categories.ts
 * ──────────────────────
 * Axios client function สำหรับดึง categories จาก Client Components
 * Admin CRUD ใช้ Server Actions ใน app/actions/categories.ts
 */
import apiClient from "@/lib/api/client";
import type { Category } from "@prisma/client";

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>("/api/categories");
  return data;
}
