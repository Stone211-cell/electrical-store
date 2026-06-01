import { prisma } from "@/lib/prisma";
import { BlogForm } from "@/components/admin/blog-form";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function AdminEditBlogPage({ params }: Params) {
  const { id } = await params;
  
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-colors mb-4"
        >
          <IconArrowLeft size={16} /> กลับไปหน้ารายการบทความ
        </Link>
        <h1 className="text-3xl font-black text-slate-800">แก้ไขบทความ</h1>
      </div>

      <BlogForm post={post} />
    </div>
  );
}
