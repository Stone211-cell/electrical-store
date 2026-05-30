"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  IconBolt,
  IconArrowRight,
  IconStarFilled,
  IconTruck,
  IconShieldCheck,
  IconHeadset,
} from "@/components/icon";

const floatingBadges = [
  {
    icon: IconTruck,
    text: "ส่งด่วน",
    sub: "ภายใน 24 ชม.",
    color: "from-sky-400 to-blue-500",
    delay: 0,
    position: "top-6 right-0 sm:right-4",
    floatDelay: "0s",
  },
  {
    icon: IconShieldCheck,
    text: "รับประกัน",
    sub: "สินค้าแท้ 100%",
    color: "from-emerald-400 to-teal-500",
    delay: 0.4,
    position: "bottom-16 right-0 sm:right-8",
    floatDelay: "-2s",
  },
  {
    icon: IconHeadset,
    text: "ซัพพอร์ต",
    sub: "บริการ 24/7",
    color: "from-violet-400 to-purple-500",
    delay: 0.8,
    position: "top-1/2 -left-4 sm:left-4",
    floatDelay: "-4s",
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Stagger text and UI elements
    tl.fromTo(".gsap-fade-up-1",
      { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(".gsap-fade-up-2",
        { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.75 }, "-=0.35")
      .fromTo(".gsap-fade-up-3",
        { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.4")
      .fromTo(".gsap-fade-up-4",
        { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45 }, "-=0.3")
      .fromTo(".gsap-scale-up",
        { opacity: 0, y: 22, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, "-=0.25")
      .fromTo(".gsap-stagger-item",
        { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, "-=0.2")
      .fromTo(".gsap-image-reveal",
        { opacity: 0, x: 56, scale: 0.94 }, { opacity: 1, x: 0, scale: 1, duration: 0.85 }, "<0.15");

    // Continuous floating animation for badges
    floatingBadges.forEach((_, i) => {
      gsap.to(`.gsap-float-${i}`, {
        y: "random(-12, 12)",
        x: "random(-8, 8)",
        rotation: "random(-3, 3)",
        duration: "random(3, 5)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.2,
      });
    });
  }, { scope: heroRef });

  return (
    <section id="hero" ref={heroRef} className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-3/4 h-[800px] bg-gradient-to-bl from-sky-100/50 via-blue-50/20 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-400/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-300/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col justify-center text-center lg:text-left space-y-8">
            
            <div className="space-y-6">
              {/* Badge */}
              <div className="gsap-fade-up-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-700/50 shadow-inner">
                  <IconBolt size={14} className="text-amber-400" />
                  <span className="text-xs font-semibold text-sky-100 tracking-wide uppercase">
                    อุปกรณ์ไฟฟ้าอันดับ 1
                  </span>
                </div>
              </div>

              {/* Headline */}
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-800 leading-[1.1] tracking-tight gsap-fade-up-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                ศูนย์รวม<br className="hidden sm:block" />
                <span className="gradient-text-electric relative inline-block">
                  อุปกรณ์ไฟฟ้า
                  {/* Swoosh SVG under text */}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-sky-400/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,15 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
                <br className="hidden sm:block" />
                ครบวงจร
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 gsap-fade-up-3">
                ElectroMax คัดสรรสินค้าคุณภาพจากแบรนด์ชั้นนำระดับโลก พร้อมบริการจัดส่งรวดเร็ว และทีมวิศวกรให้คำปรึกษาตลอด 24 ชั่วโมง
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start gsap-fade-up-4">
                <Link
                  href="/products"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-bold text-lg shadow-lg shadow-sky-500/30 transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  ช้อปเลย
                  <IconArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="#categories"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-full font-bold text-lg border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 active:scale-95 w-full sm:w-auto"
                >
                  ดูหมวดหมู่สินค้า
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 border-t border-slate-100 gsap-scale-up">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <Image src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="user" width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-sky-100 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-sky-700">9k+</span>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex text-amber-400 gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <IconStarFilled key={i} size={14} />
                    ))}
                  </div>
                  <span className="font-semibold text-slate-700">ลูกค้าไว้วางใจ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content / Graphics */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full mt-10 lg:mt-0 gsap-image-reveal">
            {/* Main Product Image Mockup */}
            <div className="absolute inset-0 flex items-center justify-center relative z-10">
              <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-tr from-sky-100 to-white shadow-2xl border-4 border-white flex items-center justify-center p-8">
                {/* Glow behind image */}
                <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-sky-200 to-blue-200 blur-2xl opacity-50" />
                <div className="relative w-full h-full rounded-2xl bg-slate-50 border shadow-inner flex items-center justify-center overflow-hidden">
                   {/* Placeholder for actual hero image, e.g. switchboard, smart home hub */}
                   <div className="text-slate-300 flex flex-col items-center">
                     <IconBolt size={64} className="mb-4 opacity-50" />
                     <span className="font-bold text-xl tracking-widest uppercase">ElectroMax</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            {floatingBadges.map((badge, i) => (
              <div
                key={badge.text}
                className={`absolute z-20 ${badge.position} gsap-stagger-item gsap-float-${i}`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + badge.delay, duration: 0.5, type: "spring" }}
                  className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 pr-5"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-sm shrink-0`}>
                    <badge.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm leading-tight">{badge.text}</p>
                    <p className="text-xs text-slate-500 font-medium">{badge.sub}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
