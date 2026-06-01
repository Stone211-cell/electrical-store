import { BlogForm } from "@/components/admin/blog-form";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export default function AdminNewBlogPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-colors mb-4"
        >
          <IconArrowLeft size={16} /> กลับไปหน้ารายการบทความ
        </Link>
        <h1 className="text-3xl font-black text-slate-800">เขียนบทความใหม่</h1>
      </div>

      <BlogForm />
    </div>
  );
}
