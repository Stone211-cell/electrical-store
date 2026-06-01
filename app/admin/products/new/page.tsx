import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function AdminNewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-colors mb-4"
        >
          <IconArrowLeft size={16} /> กลับไปหน้ารายการสินค้า
        </Link>
        <h1 className="text-3xl font-black text-slate-800">เพิ่มสินค้าใหม่</h1>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
