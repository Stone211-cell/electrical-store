"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  IconShoppingCart,
  IconHeart,
  IconEye,
  IconStarFilled,
  IconBolt,
  IconArrowRight,
} from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, type Product } from "@/lib/product";


function ProductCard({ product, index }: { product: Product; index: number }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 1, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50 aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button className="w-9 h-9 glass rounded-xl flex items-center justify-center shadow-md hover:scale-110 transition-transform">
            <IconEye size={16} className="text-slate-700" />
          </button>
        </div>

        {/* Badge top-left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.badges.includes("hot") && <Badge variant="hot">🔥 ขายดี</Badge>}
          {product.badges.includes("new") && <Badge variant="new">✨ ใหม่</Badge>}
          {product.badges.includes("sale") && (
            <Badge variant="sale">-{discount}%</Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-2.5 right-2.5 w-8 h-8 glass rounded-xl flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <IconHeart
            size={16}
            className={wished ? "text-rose-500 fill-rose-500" : "text-slate-400"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[10px] text-sky-600 font-semibold uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-2 line-clamp-2 group-hover:text-sky-700 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <IconStarFilled
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-black text-sky-700">
            ฿{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-slate-400 line-through">
            ฿{product.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddCart}
          className={`mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
            added
              ? "bg-emerald-500 text-white scale-95"
              : "gradient-electric text-white hover:shadow-md hover:shadow-sky-300/40 hover:-translate-y-0.5"
          }`}
        >
          {added ? (
            <>✅ เพิ่มแล้ว!</>
          ) : (
            <>
              <IconShoppingCart size={16} />
              เพิ่มลงตะกร้า
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

const filters = ["ทั้งหมด", "แผงโซล่าเซลล์", "แผงไฟฟ้า", "หลอดไฟ & LED", "สายไฟ", "สวิตช์"];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              <IconBolt size={14} />
              สินค้าแนะนำ
            </div>
            <h2
              className="text-4xl font-black text-slate-800"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              สินค้า<span className="gradient-text-electric">ขายดี</span>ประจำสัปดาห์
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-800 transition-colors shrink-0">
            ดูสินค้าทั้งหมด <IconArrowRight size={18} />
          </button>
        </motion.div>

        {/* Filters and Grid via Shadcn Tabs */}
        <Tabs defaultValue="ทั้งหมด" className="w-full mb-8">
          <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
            <TabsList className="h-auto p-1.5 bg-slate-100/80 rounded-2xl flex gap-1 w-max min-w-full justify-start">
              {filters.map((f) => (
                <TabsTrigger
                  key={f}
                  value={f}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all data-[state=active]:bg-sky-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-sky-500/30 text-slate-500 hover:text-slate-800"
                >
                  {f}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {filters.map((f) => {
            const tabProducts =
              f === "ทั้งหมด"
                ? products
                : products.filter((p) => p.category === f);

            return (
              <TabsContent key={f} value={f} className="mt-6 focus-visible:outline-none">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
                  {tabProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                  {tabProducts.length === 0 && (
                    <div className="col-span-full py-16 text-center text-slate-400 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      ไม่มีสินค้าในหมวดหมู่นี้
                    </div>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 border-2 border-sky-200 text-sky-700 font-bold px-8 py-3 rounded-xl hover:bg-sky-50 hover:border-sky-400 transition-all duration-200 hover:-translate-y-0.5">
            โหลดสินค้าเพิ่มเติม
            <IconArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
