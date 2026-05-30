"use client";

import Link from "next/link";
import { IconChevronRight, IconStarFilled } from "@/components/icon";

// ข้อมูลแบรนด์พาร์ทเนอร์
const brands = [
  { name: "Schneider Electric", tier: "Premium", logo: "SE", desc: "ผู้นำด้านการจัดการพลังงานระดับโลก" },
  { name: "Philips", tier: "Premium", logo: "PH", desc: "นวัตกรรมแสงสว่างอันดับหนึ่ง" },
  { name: "Panasonic", tier: "Standard", logo: "PN", desc: "มาตรฐานอุปกรณ์ไฟฟ้าที่คุณวางใจ" },
  { name: "ABB", tier: "Premium", logo: "ABB", desc: "เทคโนโลยีไฟฟ้ากำลังและระบบอัตโนมัติ" },
  { name: "Phelps Dodge", tier: "Standard", logo: "PD", desc: "สายไฟฟ้าคุณภาพสูงระดับสากล" },
  { name: "Jinko Solar", tier: "Premium", logo: "JK", desc: "แผงโซล่าเซลล์ระดับ Tier 1" },
  { name: "Huawei", tier: "Premium", logo: "HW", desc: "สุดยอดนวัตกรรมโซล่าอินเวอร์เตอร์" },
  { name: "Thai Union Cable", tier: "Standard", logo: "TUC", desc: "สายไฟคุณภาพเพื่อคนไทย" },
];

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">หน้าหลัก</Link>
          <IconChevronRight size={14} />
          <span className="font-semibold text-blue-700">แบรนด์พาร์ทเนอร์</span>
        </div>

        {/* Header - ธีมน้ำเงินเข้ม-ทอง */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            แบรนด์ชั้นนำ<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">ระดับโลก</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            เราคัดสรรเฉพาะอุปกรณ์ไฟฟ้าจากแบรนด์ที่ได้รับมาตรฐานสากล เพื่อความปลอดภัยสูงสุดของคุณและครอบครัว
          </p>
        </div>

        {/* Grid ของแบรนด์ */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {brands.map((brand) => (
            <div 
              key={brand.name}
              className={`group p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer hover:-translate-y-2
                ${brand.tier === 'Premium' 
                  ? 'bg-gradient-to-b from-blue-900 to-slate-900 border-yellow-500/30 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/20' 
                  : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10'}`}
            >
              {/* Logo Placeholder */}
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black mb-4 shadow-inner
                ${brand.tier === 'Premium' ? 'bg-white text-blue-900' : 'bg-slate-50 text-slate-700'}`}>
                {brand.logo}
              </div>

              {/* Brand Info */}
              <h3 className={`text-lg font-bold mb-2 ${brand.tier === 'Premium' ? 'text-yellow-400' : 'text-slate-800'}`}>
                {brand.name}
              </h3>
              <p className={`text-xs ${brand.tier === 'Premium' ? 'text-slate-300' : 'text-slate-500'} mb-4 line-clamp-2`}>
                {brand.desc}
              </p>

              {/* Rating */}
              <div className="flex gap-1 mt-auto">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled key={i} size={12} className={brand.tier === 'Premium' ? "text-yellow-400" : "text-amber-400"} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}