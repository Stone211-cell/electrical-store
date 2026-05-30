"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconPlugConnected,
  IconBulb,
  IconSettings,
  IconShieldBolt,
  IconTool,
  IconPlug,
  IconArrowRight,
} from "@/components/icon";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "cable",
    icon: IconPlug,
    label: "สายไฟ & เคเบิล",
    description: "สายไฟ NYY, THW, VCT และสายเคเบิลทุกขนาด",
    count: "850+ รายการ",
    gradient: "from-sky-400 to-blue-500",
    bgGradient: "from-sky-50 to-blue-50",
    hover: "hover:border-sky-300 hover:shadow-sky-100",
    textColor: "text-sky-700",
    tag: "ขายดี",
    tagColor: "bg-sky-100 text-sky-700",
  },
  {
    id: "switch",
    icon: IconPlugConnected,
    label: "สวิตช์ & เต้ารับ",
    description: "สวิตช์ไฟ เต้ารับ ปลั๊กกันฝน ทุกแบรนด์",
    count: "620+ รายการ",
    gradient: "from-violet-400 to-purple-500",
    bgGradient: "from-violet-50 to-purple-50",
    hover: "hover:border-violet-300 hover:shadow-violet-100",
    textColor: "text-violet-700",
    tag: "ยอดนิยม",
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    id: "breaker",
    icon: IconShieldBolt,
    label: "แผงควบคุมไฟฟ้า",
    description: "ตู้ MDB, แผงเบรกเกอร์, ตู้ไฟ ครบชุด",
    count: "340+ รายการ",
    gradient: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    hover: "hover:border-emerald-300 hover:shadow-emerald-100",
    textColor: "text-emerald-700",
    tag: "แนะนำ",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "protection",
    icon: IconSettings,
    label: "อุปกรณ์ป้องกัน",
    description: "เบรกเกอร์, ELCB, ฟิวส์, อุปกรณ์นิรภัย",
    count: "480+ รายการ",
    gradient: "from-rose-400 to-pink-500",
    bgGradient: "from-rose-50 to-pink-50",
    hover: "hover:border-rose-300 hover:shadow-rose-100",
    textColor: "text-rose-700",
    tag: "สำคัญ",
    tagColor: "bg-rose-100 text-rose-700",
  },
  {
    id: "lighting",
    icon: IconBulb,
    label: "หลอดไฟ & LED",
    description: "LED, ฟลูออเรสเซนต์, ดาวน์ไลต์, ฟลัดไลต์",
    count: "970+ รายการ",
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    hover: "hover:border-amber-300 hover:shadow-amber-100",
    textColor: "text-amber-700",
    tag: "ใหม่มาแรง",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    id: "tools",
    icon: IconTool,
    label: "เครื่องมือช่าง",
    description: "คีม ไขควง มิเตอร์วัดไฟ อุปกรณ์ต่อสาย",
    count: "720+ รายการ",
    gradient: "from-slate-600 to-slate-800",
    bgGradient: "from-slate-50 to-slate-100",
    hover: "hover:border-slate-300 hover:shadow-slate-100",
    textColor: "text-slate-700",
    tag: "ครบชุด",
    tagColor: "bg-slate-200 text-slate-700",
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(".gsap-cat-heading",
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    ).fromTo(".gsap-cat-card",
      { opacity: 0, y: 48, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.2)",
      },
      "-=0.2"
    );
  }, { scope: sectionRef });

  return (
    <section id="categories" ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-sky-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="gsap-cat-heading text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <IconPlug size={14} />
            หมวดหมู่สินค้า
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            เลือกสินค้าตาม<span className="gradient-text-electric"> หมวดหมู่</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            รวมสินค้าอุปกรณ์ไฟฟ้าทุกประเภท ครบจบในที่เดียว พร้อมรองรับการสั่งซื้อทั้งปลีกและส่ง
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="gsap-cat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <div key={cat.id} className="gsap-cat-card">
              <Link href="#" className="group block h-full">
                <div className={`relative flex flex-col h-full p-6 rounded-2xl bg-gradient-to-br ${cat.bgGradient} border border-white ${cat.hover} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
                  
                  {/* Decorative Background Icon */}
                  <div className={`absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-500 ${cat.textColor}`}>
                    <cat.icon size={160} />
                  </div>

                  {/* Header Row: Icon + Tag */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${cat.gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <cat.icon size={26} className="text-white" stroke={1.5} />
                    </div>
                    {cat.tag && (
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${cat.tagColor}`}>
                        {cat.tag}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      {cat.description}
                    </p>
                  </div>

                  {/* Footer Row */}
                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/50 mt-auto">
                    <span className="text-xs font-semibold text-slate-400 bg-white/60 px-3 py-1 rounded-full">
                      {cat.count}
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-medium ${cat.textColor} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                      ดูทั้งหมด <IconArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
