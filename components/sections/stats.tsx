"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/comment";


export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-14 relative z-10">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 1, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className={`relative flex flex-col items-center text-center p-5 rounded-2xl ${stat.bg} border ${stat.border} hover:shadow-md transition-all duration-300 hover:-translate-y-1 group`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={22} className="text-white" stroke={2} />
              </div>

              {/* Value */}
              <p className="text-2xl font-black text-slate-800 leading-none mb-1">
                {stat.value}
              </p>

              {/* Label */}
              <p className="text-xs text-slate-500 font-medium leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA to About Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 mb-4 flex justify-center relative z-20">
        <a 
          href="/about" 
          className="inline-flex items-center gap-2 bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors shadow-sm hover:shadow-md"
        >
          ทำความรู้จักกับเราเพิ่มเติม
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
    </section>
  );
}
