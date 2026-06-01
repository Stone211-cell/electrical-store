import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { IconPlus, IconEdit } from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">จัดการบทความ</h1>
          <p className="text-slate-500">เพิ่ม แก้ไข ลบ บทความในบล็อก</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-sky-600 transition-colors shadow-sm"
        >
          <IconPlus size={18} />
          เขียนบทความใหม่
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 w-24">รูปภาพ</th>
                <th className="px-6 py-4">หัวข้อ</th>
                <th className="px-6 py-4">หมวดหมู่</th>
                <th className="px-6 py-4">วันที่เผยแพร่</th>
                <th className="px-6 py-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.imageUrl || "/blog-1.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 line-clamp-1">{post.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-sky-50 text-sky-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(post.createdAt).toLocaleDateString("th-TH")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                      >
                        <IconEdit size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    ยังไม่มีบทความ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
