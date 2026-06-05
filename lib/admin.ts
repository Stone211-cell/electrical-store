import { auth, currentUser } from "@clerk/nextjs/server";

export async function checkIsAdmin(): Promise<boolean> {
  try {
    const { sessionClaims } = await auth();

    // 1. ตรวจสอบจาก sessionClaims (ถ้าตั้งค่า JWT template ใน Clerk Dashboard จะเร็วมากเพราะไม่ต้องดึงข้อมูลใหม่)
    const isAdminFromSession = (sessionClaims?.metadata as { isAdmin?: string })?.isAdmin === "true";
    if (isAdminFromSession) {
      return true;
    }

    // 2. ถ้า sessionClaims ไม่มี (เช่น ยังไม่ได้แก้ JWT template ใน Clerk) ให้ดึง User ตรงๆ จาก Clerk API
    const user = await currentUser();
    if (!user) {
      return false;
    }

    // เช็คทุกช่องทาง metadata เพื่อความปลอดภัยและยืดหยุ่น
    const isPublicAdmin = user.publicMetadata?.isAdmin === "true";
    const isPrivateAdmin = user.privateMetadata?.isAdmin === "true";
    const isUnsafeAdmin = user.unsafeMetadata?.isAdmin === "true";

    return isPublicAdmin || isPrivateAdmin || isUnsafeAdmin;
  } catch (error: any) {
    // ปล่อยให้ Next.js จัดการ error dynamic server usage เพื่อสลับไปเรนเดอร์แบบ Dynamic on-demand
    if (error && (error.message?.includes("Dynamic server usage") || error.digest === "DYNAMIC_SERVER_USAGE")) {
      throw error;
    }
    console.error("Error checking admin status:", error);
    return false;
  }
}
