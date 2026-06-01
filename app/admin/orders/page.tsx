import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { IconShoppingCart, IconBrandLine, IconExternalLink } from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2">ออเดอร์ (คำสั่งซื้อ)</h1>
        <p className="text-slate-500">ดูประวัติและรายละเอียดคำสั่งซื้อจากลูกค้าผ่านทาง LINE</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 w-32">รหัสออเดอร์</th>
                <th className="px-6 py-4 w-40">เวลาสั่งซื้อ</th>
                <th className="px-6 py-4">รายการสินค้า</th>
                <th className="px-6 py-4 text-right">ยอดรวม</th>
                <th className="px-6 py-4 text-center">สถานะ</th>
                <th className="px-6 py-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => {
                const items = order.items as any[];
                return (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(order.createdAt).toLocaleString("th-TH")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {items.slice(0, 2).map((item, i) => (
                          <div key={i} className="text-slate-700 font-medium line-clamp-1">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                        {items.length > 2 && (
                          <div className="text-xs text-slate-400">
                            + อีก {items.length - 2} รายการ
                          </div>
                        )}
                        {order.customerNote && (
                          <div className="text-xs text-sky-600 bg-sky-50 px-2 py-1 rounded mt-2 inline-block max-w-full truncate">
                            📝 {order.customerNote}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-sky-700">
                      ฿{order.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-100">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={order.lineOaUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-200 transition-colors"
                      >
                        <IconBrandLine size={14} /> ดูแชท
                        <IconExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <IconShoppingCart size={40} className="mx-auto mb-3 opacity-20" />
                    ยังไม่มีออเดอร์ในระบบ
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
