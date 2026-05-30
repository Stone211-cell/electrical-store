"use client";

import { useState } from "react";
import { IconHeadset, IconX } from "@tabler/icons-react";
import { CHANNEL_LIST } from "@/components/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
              open ? "bg-slate-700 shadow-slate-400/40" : "gradient-electric shadow-sky-300/50 animate-glow hover:scale-105 active:scale-95"
            }`}
            aria-label="ติดต่อเรา"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconX size={24} className="text-white" stroke={2.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconHeadset size={24} className="text-white" stroke={2} />
                </motion.span>
              )}
            </AnimatePresence>
            {!open && (
              <span className="absolute inset-0 rounded-2xl border-2 border-sky-400 animate-ping opacity-40 pointer-events-none" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent 
          side="top" 
          align="end" 
          sideOffset={16}
          className="w-56 p-2 rounded-2xl shadow-xl border-slate-100 bg-white/95 backdrop-blur-md"
        >
          <div className="flex flex-col gap-1">
            <div className="px-3 py-2 mb-1 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-800">ติดต่อเรา</p>
              <p className="text-xs text-slate-500">พร้อมให้บริการ 24 ชม.</p>
            </div>
            {CHANNEL_LIST.map((ch) => (
              <a
                key={ch.id}
                href={ch.href}
                target={ch.id === "phone" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                onClick={() => setOpen(false)}
              >
                <div className={`w-9 h-9 rounded-lg ${ch.fabBg} flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110`}>
                  <ch.Icon size={18} stroke={2} />
                </div>
                <span className="font-semibold text-slate-700 text-sm group-hover:text-sky-600 transition-colors">
                  {ch.label}
                </span>
              </a>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
