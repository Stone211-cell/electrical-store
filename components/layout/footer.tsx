"use client";

import Link from "next/link";
import {
  IconBolt,
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconArrowRight,
  SocialIcons,
  CONTACT_INFO,
} from "@/components/icon";

const footerLinks = {
  products: {
    title: "หมวดหมู่สินค้า",
    links: [
      "สายไฟ & เคเบิล",
      "สวิตช์ & เต้ารับ",
      "แผงควบคุมไฟฟ้า",
      "อุปกรณ์ป้องกัน",
      "หลอดไฟ & LED",
      "เครื่องมือช่าง",
    ],
  },
  service: {
    title: "บริการของเรา",
    links: [
      "จัดส่งทั่วประเทศ",
      "บริการติดตั้ง",
      "ให้คำปรึกษาฟรี",
      "รับประกันสินค้า",
      "ส่งคืนสินค้า",
      "ชำระเงินออนไลน์",
    ],
  },
  about: {
    title: "เกี่ยวกับเรา",
    links: [
      "ประวัติบริษัท",
      "พันธกิจของเรา",
      "แบรนด์พาร์ทเนอร์",
      "นโยบายคุณภาพ",
      "ร่วมงานกับเรา",
      "ข่าวสาร & บทความ",
    ],
  },
};


export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 text-slate-300">
      {/* Newsletter Bar */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
                สมัครรับข่าวสารและโปรโมชั่น
              </h3>
              <p className="text-sky-100 text-sm">รับส่วนลด 150 บาท เมื่อสมัครครั้งแรก + อัปเดตสินค้าใหม่ทุกสัปดาห์</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="กรอกอีเมลของคุณ..."
                className="flex-1 md:w-72 bg-white/20 backdrop-blur border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder:text-sky-200 outline-none focus:bg-white/30 transition-colors text-sm"
              />
              <button className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap flex items-center gap-2">
                สมัครเลย <IconArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl gradient-electric flex items-center justify-center shadow-md">
                <IconBolt size={22} className="text-white" stroke={2.5} />
              </div>
              <div>
                <span className="text-xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                  ElectroMax
                </span>
                <p className="text-[11px] text-slate-400 -mt-0.5">ศูนย์อุปกรณ์ไฟฟ้าครบวงจร</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              ElectroMax คือผู้นำด้านจำหน่ายอุปกรณ์ไฟฟ้าคุณภาพสูง ครบวงจร ด้วยประสบการณ์กว่า 15 ปี
              เราให้บริการลูกค้าทั่วประเทศด้วยความซื่อสัตย์และมืออาชีพ
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {[
                { icon: IconPhone,  text: `${CONTACT_INFO.phone}` },
                { icon: IconMail,   text: CONTACT_INFO.email },
                { icon: IconMapPin, text: CONTACT_INFO.address },
                { icon: IconClock,  text: CONTACT_INFO.hours },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={16} className="text-sky-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-400 leading-snug">{text}</span>
                </div>
              ))}
            </div>

            {/* Socials — imported from icon.tsx */}
            <SocialIcons />
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-slate-400 hover:text-sky-400 transition-colors hover:translate-x-1 inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                        <IconArrowRight size={12} className="text-sky-400" />
                      </span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-xs">
            © 2025 ElectroMax Co., Ltd. สงวนลิขสิทธิ์ทุกประการ
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="#" className="hover:text-slate-300 transition-colors">นโยบายความเป็นส่วนตัว</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">เงื่อนไขการใช้งาน</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">นโยบายการคืนสินค้า</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
