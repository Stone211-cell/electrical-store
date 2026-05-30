"use client";

import { motion } from "framer-motion";

const brands = [
  { name: "Schneider Electric", abbr: "SE", color: "text-emerald-700", bg: "bg-emerald-50" },
  { name: "ABB", abbr: "ABB", color: "text-red-700", bg: "bg-red-50" },
  { name: "Philips", abbr: "PHL", color: "text-sky-700", bg: "bg-sky-50" },
  { name: "Siemens", abbr: "SIE", color: "text-blue-800", bg: "bg-blue-50" },
  { name: "Legrand", abbr: "LGR", color: "text-orange-700", bg: "bg-orange-50" },
  { name: "Hager", abbr: "HGR", color: "text-slate-700", bg: "bg-slate-100" },
  { name: "Panasonic", abbr: "PAN", color: "text-blue-600", bg: "bg-blue-50" },
  { name: "OSRAM", abbr: "OSR", color: "text-yellow-700", bg: "bg-yellow-50" },
];

export default function Brands() {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-14 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">
            แบรนด์พาร์ทเนอร์ชั้นนำที่เราไว้วางใจ
          </p>
          <h2 className="text-2xl font-black text-slate-700" style={{ fontFamily: "var(--font-outfit)" }}>
            จำหน่ายสินค้า <span className="gradient-text-electric">แบรนด์ชั้นนำ</span> ระดับโลก
          </h2>
        </motion.div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative overflow-hidden mb-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee" style={{ width: "max-content" }}>
          {doubled.map((brand, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 ${brand.bg} rounded-2xl px-6 py-4 border border-white shadow-sm shrink-0 hover:shadow-md transition-shadow cursor-pointer min-w-[160px]`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${brand.color} bg-white shadow-sm`}>
                {brand.abbr}
              </div>
              <span className={`font-bold text-sm ${brand.color}`}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 โ€” reverse */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee-reverse" style={{ width: "max-content" }}>
          {[...doubled].reverse().map((brand, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 ${brand.bg} rounded-2xl px-6 py-4 border border-white shadow-sm shrink-0 hover:shadow-md transition-shadow cursor-pointer min-w-[160px]`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${brand.color} bg-white shadow-sm`}>
                {brand.abbr}
              </div>
              <span className={`font-bold text-sm ${brand.color}`}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
