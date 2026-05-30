"use client";

import { motion } from "framer-motion";
import { IconStarFilled, IconQuote } from "@/components/icon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";import { testimonials } from "@/lib/comment";


export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 relative">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-sky-100/50 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <IconStarFilled size={14} className="text-amber-500" />
            รีวิวจากลูกค้าจริง
          </div>
          <h2
            className="text-4xl font-black text-slate-800 mb-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            ลูกค้าของเรา<span className="gradient-text-electric">พูดถึงเรา</span>
          </h2>
          <p className="text-slate-500 text-lg">
            รีวิวจากลูกค้ากว่า 12,800 รายการ คะแนนเฉลี่ย 4.9/5
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem key={t.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    {/* Quote icon */}
                    <div className="mb-4">
                      <IconQuote size={28} className="text-sky-300" />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(t.rating)].map((_, j) => (
                        <IconStarFilled key={j} size={14} className="text-amber-400" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-4 flex-grow">
                      {t.text}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                        {t.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm truncate">{t.name}</p>
                        <p className="text-xs text-slate-400 truncate">{t.role} • {t.location}</p>
                      </div>
                      {t.verified && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold shrink-0">
                          ✓ ยืนยันแล้ว
                        </span>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom styled prominent buttons */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <CarouselPrevious className="static translate-y-0 w-12 h-12 bg-white border-2 border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white hover:border-sky-500 shadow-md hover:shadow-lg transition-all duration-300" />
              <div className="flex gap-1.5 px-4">
                 <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                 <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                 <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              </div>
              <CarouselNext className="static translate-y-0 w-12 h-12 bg-sky-500 border-2 border-sky-500 text-white hover:bg-sky-600 hover:border-sky-600 shadow-md hover:shadow-lg shadow-sky-500/30 transition-all duration-300" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
