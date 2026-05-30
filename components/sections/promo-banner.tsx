"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconBolt, IconArrowRight, IconClock } from "@/components/icon";

function useCountdown(targetDate: Date) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const update = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return time;
}

const promos = [
  "🔥 ลดสูงสุด 40% สินค้าสายไฟทุกรุ่น",
  "🚚 ซื้อครบ 3,000 บาท ส่งฟรีทั่วประเทศ",
  "🛡️ รับประกันสินค้าแท้ 100% ทุกชิ้น",
  "💡 สินค้า LED ลดพิเศษ เฉพาะสัปดาห์นี้",
  "🎁 สมัครสมาชิกใหม่ รับส่วนลด 150 บาท",
  "📱 สั่งซื้อผ่านแอป รับ Point 2 เท่า",
];

export default function PromoBanner() {
  const deadline = useRef(new Date(Date.now() + 1000 * 60 * 60 * 11 + 1000 * 60 * 42 + 1000 * 33));
  const { h, m, s } = useCountdown(deadline.current);

  return (
    <section id="promo" className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-blue-700 to-sky-800" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />

      {/* Beam sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[-50%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-beam" style={{ animationDuration: "4s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 1, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-white/20">
              <IconBolt size={13} className="text-amber-300" />
              โปรโมชั่นพิเศษ — จำนวนจำกัด!
            </div>

            <h2
              className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Flash Sale สินค้าไฟฟ้า
              <br />
              <span className="text-amber-300">ลดสูงสุด 40%</span>
            </h2>
            <p className="text-sky-100 text-base mb-6 max-w-md">
              อย่าพลาดดีลสุดพิเศษ! สินค้าอุปกรณ์ไฟฟ้าคุณภาพสูง ลดราคาพิเศษเฉพาะช่วงเวลานี้เท่านั้น
            </p>

            <button className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black px-7 py-3.5 rounded-xl shadow-xl shadow-amber-500/30 hover:shadow-amber-400/40 hover:-translate-y-1 transition-all duration-300 text-base">
              <IconBolt size={18} />
              ช้อปเลยตอนนี้
              <IconArrowRight size={18} />
            </button>
          </motion.div>

          {/* Right — Countdown + Marquee */}
          <motion.div
            initial={{ opacity: 1, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Countdown */}
            <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-5">
              <div className="flex items-center gap-2 text-sky-200 text-sm font-medium mb-4">
                <IconClock size={16} />
                ข้อเสนอนี้สิ้นสุดใน...
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: h, label: "ชั่วโมง" },
                  { value: m, label: "นาที" },
                  { value: s, label: "วินาที" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="bg-white/20 backdrop-blur rounded-xl py-3 px-2 mb-1.5 border border-white/30">
                      <span className="text-4xl font-black text-white tabular-nums">
                        {String(value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-sky-200 text-xs font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Marquee */}
            <div className="overflow-hidden rounded-xl bg-white/10 backdrop-blur border border-white/20 py-3">
              <div className="flex gap-8 animate-marquee whitespace-nowrap">
                {[...promos, ...promos].map((promo, i) => (
                  <span key={i} className="text-white text-sm font-medium shrink-0 flex items-center gap-2">
                    {promo}
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
