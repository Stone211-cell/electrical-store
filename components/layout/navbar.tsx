"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBolt,
  IconShoppingCart,
  IconSearch,
  IconMenu2,
  IconX,
  IconChevronDown,
  TopBarIcons,
  PhoneIcon,
} from "@/components/icon";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";

const navLinks = [
  { label: "หน้าหลัก", href: "/" },
  {
    label: "สินค้า",
    href: "/products",
    submenu: [
      { label: "แผงโซล่าเซลล์", href: "/categories" },
      { label: "สายไฟ & เคเบิล", href: "/categories" },
      { label: "สวิตช์ & เต้ารับ", href: "/categories" },
      { label: "แผงไฟฟ้า", href: "/categories" },
      { label: "หลอดไฟ & LED", href: "/categories" },
      { label: "เครื่องมือช่าง", href: "/categories" },
    ],
  },
  { label: "โปรโมชั่น", href: "/promotions" },
  { label: "แบรนด์", href: "/brands" },
  { label: "บทความ", href: "/blog" },
  { label: "เกี่ยวกับเรา", href: "/about" },
  { label: "ติดต่อเรา", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left: phone + hours */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <PhoneIcon />
            </span>
            <span className="hidden sm:inline text-sky-300">|</span>
            <span className="hidden sm:inline"></span>
          </div>

          {/* Right: status + social icons — imported from icon.tsx */}
          <div className="flex items-center gap-1.5">
            <span className="hidden sm:flex items-center gap-1.5 mr-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              จัดส่งทั่วประเทศ
            </span>
            <span className="hidden sm:inline text-sky-300 mr-1">|</span>
            <TopBarIcons />
          </div>
        </div>
      </div>


      {/* Main Navbar */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "glass shadow-lg shadow-sky-100/50 border-b border-sky-100"
            : "bg-white/95 backdrop-blur-sm border-b border-sky-50"
        )}
      >
        <div className="max-w-7xl my-5 mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo */}
            <Link href="#" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 rounded-xl gradient-electric flex items-center justify-center shadow-md group-hover:shadow-sky-300/50 transition-shadow">
                <IconBolt size={20} className="text-white" stroke={2.5} />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight gradient-text-electric" style={{ fontFamily: "var(--font-outfit)" }}>
                  ElectroMax
                </span>
                <p className="text-[10px] text-muted-foreground leading-none -mt-0.5">ศูนย์อุปกรณ์ไฟฟ้าครบวงจร</p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.submenu && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "text-slate-700 hover:text-sky-600 hover:bg-sky-50"
                    )}
                  >
                    {link.label}
                    {link.submenu && <IconChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === link.label && "rotate-180")} />}
                  </Link>

                  {/* Dropdown */}
                  {link.submenu && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 glass rounded-xl shadow-xl shadow-sky-100/60 border border-sky-100 py-1.5 z-50">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 rounded-xl px-3 py-2 transition-all duration-200 cursor-pointer group w-48">
                <IconSearch size={16} className="text-slate-400 group-hover:text-sky-500 transition-colors" />
                <span className="text-sm text-slate-400 group-hover:text-sky-500 transition-colors">ค้นหาสินค้า...</span>
              </div>

              {/* Cart — glowing badge + link to /cart */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl hover:bg-sky-50 transition-colors group"
                aria-label="ตะกร้าสินค้า"
              >
                <IconShoppingCart
                  size={22}
                  className="text-slate-600 group-hover:text-sky-600 transition-colors"
                />
                <AnimatePresence>
                  {totalCount > 0 && (
                    <motion.span
                      key={totalCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg shadow-rose-400/50 ring-2 ring-white"
                    >
                      {totalCount > 99 ? "99+" : totalCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* CTA Button */}
              <Link
                href="/products"
                className="hidden sm:flex items-center gap-1.5 gradient-electric text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:shadow-sky-300/40 transition-all duration-200 hover:-translate-y-0.5"
              >
                <IconBolt size={15} />
                สั่งซื้อเลย
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-sky-50 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <IconX size={22} className="text-slate-700" />
                ) : (
                  <IconMenu2 size={22} className="text-slate-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden glass border-t border-sky-100 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-sky-100 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <IconSearch size={16} className="text-slate-400" />
                <span className="text-sm text-slate-400">ค้นหาสินค้า...</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
