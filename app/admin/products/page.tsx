import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">จัดการสินค้า</h1>
          <p className="text-slate-500">เพิ่ม แก้ไข ลบ ข้อมูลสินค้าในระบบ</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-sky-600 transition-colors shadow-sm"
        >
          <IconPlus size={18} />
          เพิ่มสินค้าใหม่
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">สินค้า</th>
                <th className="px-6 py-4">ชนิดสินค้า (แบรนด์)</th>
                <th className="px-6 py-4">หมวดหมู่</th>
                <th className="px-6 py-4">ราคา</th>
                <th className="px-6 py-4">สถานะ</th>
                <th className="px-6 py-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg border border-slate-200 overflow-hidden shrink-0 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0] || "/product-led.png"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 line-clamp-1">{product.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">ID: {product.id.slice(0, 8)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{product.brand}</td>
                  <td className="px-6 py-4">
                    <span className="bg-sky-50 text-sky-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    ฿{product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {product.inStock ? (
                      <span className="text-emerald-600 font-medium flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> พร้อมส่ง
                      </span>
                    ) : (
                      <span className="text-rose-600 font-medium flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span> สินค้าหมด
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                      >
                        <IconEdit size={18} />
                      </Link>
                      {/* Note: In a real app, delete should be a client action with confirmation. For brevity, using a link or ignoring direct delete here and delegating to edit page */}
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    ยังไม่มีสินค้าในระบบ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
