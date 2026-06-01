import { prisma } from "@/lib/prisma";
import { CategoryManager } from "@/components/admin/category-manager";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2">หมวดหมู่สินค้า</h1>
        <p className="text-slate-500">จัดการประเภทและหมวดหมู่สำหรับสินค้าในระบบ</p>
      </div>

      <CategoryManager initialCategories={categories} />
    </div>
  );
}
