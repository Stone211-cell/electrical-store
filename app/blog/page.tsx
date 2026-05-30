"use client";

import Link from "next/link";
import Image from "next/image";
import { IconChevronRight, IconArrowRight } from "@/components/icon";
import { blogPosts, type BlogPost } from "@/lib/blog";

// Component สำหรับการ์ดบทความ
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col group">
      {/* รูปภาพหน้าปก (ใช้ placeholder ชั่วคราว) */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <Image 
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      
      {/* เนื้อหาบทความ */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-medium">
          <span>{post.date}</span>
          <span>{post.author}</span>
        </div>
        
        <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h2>
        
        <p className="text-sm text-slate-500 mb-6 line-clamp-3">
          {post.excerpt}
        </p>
        
        {/* ปุ่มอ่านต่อ */}
        <div className="mt-auto">
          <button className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors">
            อ่านบทความเต็ม <IconArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">หน้าหลัก</Link>
          <IconChevronRight size={14} />
          <span className="font-semibold text-blue-700">บทความน่ารู้</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            บทความ<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">น่ารู้</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            รวมเกร็ดความรู้ ข่าวสารใหม่ๆ และเทคนิคการใช้งานอุปกรณ์ไฟฟ้าและแผงโซล่าเซลล์ให้ปลอดภัยและคุ้มค่าที่สุด
          </p>
        </div>

        {/* Grid แสดงบทความทั้งหมด */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

      </div>
    </div>
  );
}