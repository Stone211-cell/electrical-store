"use client";

import Link from "next/link";
import Image from "next/image";
import { IconChevronRight, IconShoppingCart, IconHeart, IconEye, IconStarFilled, IconBolt } from "@/components/icon";
import { products, type Product } from "@/lib/product";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// สร้าง Component การ์ดสินค้าโปรโมชั่น
function PromoCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="group bg-white rounded-2xl border-2 border-rose-100 overflow-hidden flex flex-col hover:shadow-xl hover:shadow-rose-100 transition-all duration-300 hover:-translate-y-1 relative">
      {/* ริบบิ้นลดราคา */}
      <div className="absolute top-0 right-0 z-10 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-black px-4 py-1.5 rounded-bl-2xl shadow-md">
        ลด {discount}%
      </div>

      <div className="relative overflow-hidden bg-slate-50 aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="hot">🔥 Flash Sale</Badge>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-2xl font-black text-red-500">฿{product.price.toLocaleString()}</span>
          <span className="text-sm text-slate-400 line-through">฿{product.originalPrice.toLocaleString()}</span>
        </div>
        <button
          onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500); }}
          className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 ${
            added ? "bg-emerald-500 text-white" : "bg-red-50 text-red-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          {added ? "✅ สั่งซื้อแล้ว" : <><IconShoppingCart size={16} /> ช้อปเลย</>}
        </button>
      </div>
    </div>
  );
}

export default function PromotionsPage() {
  // กรองเฉพาะสินค้าที่มี Badge "sale"
  const saleProducts = products.filter((p) => p.badges.includes("sale"));

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Banner โปรโมชั่น */}
      <div className="bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 pt-32 pb-20 px-4 relative overflow-hidden">
        {/* ลวดลายตกแต่ง */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 text-sm font-bold">
              <IconBolt size={16} className="text-yellow-300" />
              HOT DEAL ประจำเดือนนี้
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-md" style={{ fontFamily: "var(--font-outfit)" }}>
              MEGA <span className="text-yellow-300">SALE</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-lg mb-8">
              ลดกระหน่ำท้าฝน อุปกรณ์ไฟฟ้าและแผงโซล่าเซลล์ลดสูงสุดถึง 50% ด่วน! สินค้ามีจำนวนจำกัด
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-rose-100/50 mb-10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">🔥 สินค้าราคาพิเศษ (Flash Sale)</h2>
          <span className="text-sm font-medium text-rose-500 bg-rose-50 px-3 py-1 rounded-lg">
            เหลือเวลาอีก 12:45:30
          </span>
        </div>

        {/* Grid สินค้าโปรโมชั่น */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {saleProducts.map((product) => (
            <PromoCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}