"use client";

import Link from "next/link";
import { IconChevronRight, IconBolt, IconShoppingCart } from "@/components/icon";
import { products } from "@/lib/product";

// ไอคอนและสีสำหรับแต่ละหมวดหมู่
const categoryDetails: Record<string, { icon: string; color: string; desc: string }> = {
  "แผงโซล่าเซลล์": { icon: "☀️", color: "from-amber-400 to-yellow-500", desc: "พลังงานสะอาด ประหยัดค่าไฟ" },
  "แผงไฟฟ้า": { icon: "⚡", color: "from-sky-500 to-blue-600", desc: "ตู้คอนซูมเมอร์และเบรกเกอร์" },
  "หลอดไฟ & LED": { icon: "💡", color: "from-yellow-400 to-amber-500", desc: "สว่างสดใส ประหยัดพลังงาน" },
  "สายไฟ": { icon: "🔌", color: "from-blue-500 to-indigo-600", desc: "สายไฟมาตรฐาน ปลอดภัย 100%" },
  "สวิตช์": { icon: "🔘", color: "from-sky-400 to-blue-500", desc: "สวิตช์และเต้ารับดีไซน์สวย" },
};

export default function CategoriesPage() {
  // ดึงรายชื่อหมวดหมู่ทั้งหมดจากฐานข้อมูลสินค้า
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">หน้าหลัก</Link>
          <IconChevronRight size={14} />
          <span className="font-semibold text-blue-700">หมวดหมู่สินค้า</span>
        </div>

        {/* Header - ธีมน้ำเงิน-เหลือง */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 font-bold px-4 py-1.5 rounded-full mb-4">
            <IconBolt size={16} />
            เลือกซื้อตามหมวดหมู่
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800" style={{ fontFamily: "var(--font-outfit)" }}>
            หมวดหมู่<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">สินค้าทั้งหมด</span>
          </h1>
          <p className="text-lg text-slate-500 mt-3">
            ค้นหาอุปกรณ์ไฟฟ้าที่คุณต้องการได้อย่างรวดเร็วและง่ายดาย
          </p>
        </div>

        {/* Grid หมวดหมู่ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const detail = categoryDetails[cat] || { icon: "📦", color: "from-slate-400 to-slate-500", desc: "สินค้าทั่วไป" };
            const count = products.filter(p => p.category === cat).length;

            return (
              <Link href="/products" key={cat} className="group block">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  
                  {/* พื้นหลังตกแต่งมุมขวาบน */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${detail.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />

                  <div className="flex items-start gap-5 relative z-10">
                    {/* ไอคอนหมวดหมู่ */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${detail.color} flex items-center justify-center text-3xl shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {detail.icon}
                    </div>

                    <div className="flex-1 pt-1">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
                        {cat}
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">
                        {detail.desc}
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-lg group-hover:bg-yellow-100 transition-colors">
                        <IconShoppingCart size={14} />
                        มีสินค้า {count} รายการ
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}