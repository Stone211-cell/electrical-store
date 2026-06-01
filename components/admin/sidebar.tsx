"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBox,
  IconCategory,
  IconArticle,
  IconLayoutDashboard,
  IconShoppingCart,
} from "@tabler/icons-react";
import { UserButton } from "@clerk/nextjs";

const menuItems = [
  { name: "แดชบอร์ด", href: "/admin", icon: IconLayoutDashboard },
  { name: "หมวดหมู่สินค้า", href: "/admin/categories", icon: IconCategory },
  { name: "สินค้า", href: "/admin/products", icon: IconBox },
  { name: "ออเดอร์", href: "/admin/orders", icon: IconShoppingCart },
  { name: "บทความ", href: "/admin/blog", icon: IconArticle },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
          <span className="text-white font-bold text-xl leading-none">E</span>
        </div>
        <div>
          <h2 className="font-bold text-slate-800 text-lg leading-tight">
            ElectroMax
          </h2>
          <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
            Admin Panel
          </p>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-sky-50 text-sky-700 font-bold shadow-sm border border-sky-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium border border-transparent"
              }`}
            >
              <item.icon
                size={20}
                className={isActive ? "text-sky-500" : "text-slate-400"}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserButton />
          <span className="text-sm font-semibold text-slate-700">บัญชีแอดมิน</span>
        </div>
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-sky-600 transition-colors underline underline-offset-2"
        >
          กลับหน้าเว็บ
        </Link>
      </div>
    </aside>
  );
}
