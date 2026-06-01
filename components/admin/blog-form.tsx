"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconCheck, IconX } from "@tabler/icons-react";
import type { BlogPost } from "@prisma/client";
import axios from "axios";

export function BlogForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [category, setCategory] = useState(post?.category || "");
  const [author, setAuthor] = useState(post?.author || "ElectroMax Admin");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || "");

  // Auto-generate slug from title if empty
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!post) { // only auto-generate on new post
      setSlug(newTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      slug,
      category,
      author,
      excerpt,
      content,
      imageUrl,
    };

    try {
      if (post) {
        await axios.put(`/api/blog/${post.id}`, data);
      } else {
        await axios.post("/api/blog", data);
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">ชื่อบทความ *</label>
          <input type="text" required value={title} onChange={handleTitleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">URL Slug *</label>
          <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 font-mono text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">หมวดหมู่บทความ *</label>
          <input type="text" required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">ผู้เขียน</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">รูปภาพหน้าปก (URL) *</label>
        <div className="flex gap-4">
          <input type="text" required value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500" />
          {imageUrl && (
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">เกริ่นนำ (Excerpt) *</label>
        <textarea required rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 resize-none"></textarea>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">เนื้อหาบทความ (HTML หรือ Text) *</label>
        <textarea required rows={10} value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 resize-y font-mono text-sm"></textarea>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
        <button type="button" onClick={() => router.push("/admin/blog")} className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
          ยกเลิก
        </button>
        <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50">
          {loading ? <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : <IconCheck size={18} />}
          บันทึกบทความ
        </button>
      </div>

    </form>
  );
}
