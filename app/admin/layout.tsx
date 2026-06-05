import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { checkIsAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect("/"); // ถ้าไม่มีสิทธิ์เป็น Admin (หรือไม่ได้ Login) -> เด้งกลับหน้าแรก
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
