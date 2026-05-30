"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/lib/product";
import { IconShoppingCart, IconHeart, IconEye, IconStarFilled, IconChevronRight } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-slate-50 aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button className="w-9 h-9 glass rounded-xl flex items-center justify-center shadow-md hover:scale-110 transition-transform">
            <IconEye size={16} className="text-slate-700" />
          </button>
        </div>
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.badges.includes("hot") && <Badge variant="hot">🔥 ขายดี</Badge>}
          {product.badges.includes("new") && <Badge variant="new">✨ ใหม่</Badge>}
          {product.badges.includes("sale") && <Badge variant="sale">-{discount}%</Badge>}
        </div>
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-2.5 right-2.5 w-8 h-8 glass rounded-xl flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <IconHeart size={16} className={wished ? "text-rose-500 fill-rose-500" : "text-slate-400"} />
        </button>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <IconStarFilled key={i} size={12} className={i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"} />
            ))}
          </div>
          <span className="text-xs text-slate-400">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-xl font-black text-rose-600">฿{product.price.toLocaleString()}</span>
          <span className="text-sm text-slate-400 line-through">฿{product.originalPrice.toLocaleString()}</span>
        </div>
        <button
          onClick={handleAddCart}
          className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 ${
            added 
              ? "bg-emerald-500 text-white scale-95" 
              : "bg-rose-50 text-rose-600 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 hover:text-white hover:shadow-md hover:shadow-rose-500/30"
          }`}
        >
          {added ? <>✅ เพิ่มแล้ว</> : <><IconShoppingCart size={16} /> ใส่ตะกร้า</>}
        </button>
      </div>
    </div>
  );
}

export default function AllProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // สร้างรายการหมวดหมู่แบบ Dynamic
  const categories = ["ทั้งหมด", ...Array.from(new Set(products.map((p) => p.category)))];

  // ฟังก์ชันกรองสินค้าตามคำค้นหา
  const filterBySearch = (list: Product[]) => {
    if (!searchTerm) return list;
    return list.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-sky-600 transition-colors">หน้าหลัก</Link>
          <IconChevronRight size={14} />
          <span className="font-semibold text-rose-600">สินค้าทั้งหมด</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-800 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
              แคตตาล็อก<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">สินค้า</span>
            </h1>
            <p className="text-slate-500">เลือกซื้ออุปกรณ์ไฟฟ้าคุณภาพจากแบรนด์ชั้นนำ</p>
          </div>
          
          <div className="w-full md:w-72">
            <Input 
              type="text" 
              placeholder="ค้นหาสินค้า..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border-slate-200 focus-visible:ring-rose-500 rounded-xl"
            />
          </div>
        </div>

        {/* ใช้งาน Shadcn Tabs สำหรับหมวดหมู่ */}
        <Tabs defaultValue="ทั้งหมด" className="w-full">
          <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
            <TabsList className="h-auto p-1.5 bg-white shadow-sm rounded-2xl flex gap-1 w-max min-w-full justify-start border border-slate-100">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-rose-500/30 text-slate-500 hover:text-slate-800"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => {
            // กรองสินค้าตามหมวดหมู่และคำค้นหา
            const tabProducts = filterBySearch(
              cat === "ทั้งหมด" ? products : products.filter((p) => p.category === cat)
            );

            return (
              <TabsContent key={cat} value={cat} className="mt-6 focus-visible:outline-none min-h-[400px]">
                {tabProducts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {tabProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                    <p className="text-slate-500 text-lg">ไม่พบสินค้าที่คุณค้นหา</p>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mt-4 text-rose-500 font-semibold hover:underline"
                    >
                      ล้างการค้นหา
                    </button>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
