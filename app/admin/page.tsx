import { prisma } from "@/lib/prisma";
import {
  IconBox,
  IconCategory,
  IconArticle,
  IconShoppingCart,
} from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [productCount, categoryCount, orderCount, blogCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.blogPost.count(),
    ]);

  const stats = [
    { name: "ออเดอร์ทั้งหมด", count: orderCount, icon: IconShoppingCart, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "สินค้าในระบบ", count: productCount, icon: IconBox, color: "text-emerald-600", bg: "bg-emerald-100" },
    { name: "หมวดหมู่สินค้า", count: categoryCount, icon: IconCategory, color: "text-amber-600", bg: "bg-amber-100" },
    { name: "บทความ (Blog)", count: blogCount, icon: IconArticle, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-800 mb-2">แดชบอร์ด</h1>
      <p className="text-slate-500 mb-8">
        ภาพรวมระบบจัดการ ElectroMax
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}
            >
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.name}</p>
              <p className="text-3xl font-black text-slate-800">
                {stat.count.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
