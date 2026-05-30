"use client";

import { motion } from "framer-motion";
import {
  IconTruck,
  IconShieldCheck,
  IconHeadset,
  IconMedal,
  IconPackage,
  IconCreditCard,
} from "@/components/icon";

const features = [
  {
    icon: IconTruck,
    title: "จัดส่งด่วน",
    description: "จัดส่งด่วนทั่วประเทศ ภายใน 1-3 วันทำการ และจัดส่งด่วนพิเศษ 24 ชม.",
    gradient: "from-sky-400 to-blue-500",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    icon: IconShieldCheck,
    title: "สินค้าแท้ 100%",
    description: "รับประกันสินค้าทุกชิ้น รับรองจากผู้ผลิต คืนเงินเต็มจำนวนหากพบของปลอม",
    gradient: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: IconHeadset,
    title: "บริการหลังการขาย",
    description: "ทีมช่างผู้เชี่ยวชาญให้คำปรึกษาตลอด 24 ชั่วโมง 7 วัน",
    gradient: "from-violet-400 to-purple-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: IconMedal,
    title: "มาตรฐานระดับโลก",
    description: "สินค้าผ่านมาตรฐาน มอก. IEC และ ISO รับรองความปลอดภัยสูงสุด",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: IconPackage,
    title: "สต็อกสินค้าจริง",
    description: "มีสินค้าพร้อมสต็อกกว่า 5,000 รายการ ไม่ต้องรอนาน",
    gradient: "from-rose-400 to-pink-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    icon: IconCreditCard,
    title: "หลากหลายช่องทาง",
    description: "รับบัตรเครดิต QR Code โอนเงิน และผ่อน 0% สูงสุด 12 เดือน",
    gradient: "from-cyan-400 to-sky-500",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-sky-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <IconShieldCheck size={14} />
            รับรองคุณภาพ
          </div>
          <h2
            className="text-4xl font-black text-slate-800 mb-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            เราคือทางเลือกที่<span className="gradient-text-electric">ดีที่สุด</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            ElectroMax ให้บริการที่ครอบคลุม อุปกรณ์ไฟฟ้าครบวงจร ส่งไวทันใจคุณ
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 1, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative p-6 rounded-2xl ${feat.bg} border ${feat.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
            >
              {/* Decorative blob */}
              <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${feat.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feat.icon size={26} className="text-white" stroke={1.8} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-slate-800 mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
