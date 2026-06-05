import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, sessionClaims } = await auth();

  // ยังไม่ได้ login → middleware จะจัดการ redirect ไปหน้า sign-in แล้ว
  // แต่เผื่อกรณีที่ middleware ไม่ทำงาน ก็ redirect เองด้วย
  if (!userId) {
    redirect("/sign-in");
  }

  // ตรวจสอบสิทธิ์ Admin (ตั้งค่า privateMetadata.isAdmin = "true" ใน Clerk Dashboard)
  const isAdmin = (sessionClaims?.metadata as { isAdmin?: string })?.isAdmin === "true";

  if (!isAdmin) {
    redirect("/"); // login แล้วแต่ไม่ใช่ Admin → เด้งกลับหน้าแรก
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
