"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconShoppingCart,
  IconTrash,
  IconPlus,
  IconMinus,
  IconArrowRight,
  IconBrandLine,
  IconChevronRight,
} from "@tabler/icons-react";
import { useCart } from "@/contexts/cart-context";
import { postOrder } from "@/lib/api/orders";

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart, totalCount, totalPrice } =
    useCart();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const cartItems = items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      }));

      const { lineOaUrl } = await postOrder(cartItems, note || undefined);
      setDone(true);
      clearCart();

      // เปิดแชท LINE OA พร้อมข้อความรายการสินค้า
      setTimeout(() => {
        window.open(lineOaUrl, "_blank");
      }, 800);
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              หน้าหลัก
            </Link>
            <IconChevronRight size={14} />
            <span className="font-semibold text-slate-800">ตะกร้าสินค้า</span>
          </nav>

          {/* Page title */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-400/30">
              <IconShoppingCart size={22} className="text-white" />
            </div>
            <div>
              <h1
                className="text-3xl font-black text-slate-800"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                ตะกร้าสินค้า
              </h1>
              <p className="text-slate-500 text-sm">
                {totalCount > 0
                  ? `${totalCount} รายการ`
                  : "ยังไม่มีสินค้าในตะกร้า"}
              </p>
            </div>
          </div>

          {/* ─── SUCCESS STATE ─── */}
          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="text-7xl mb-4">🎉</div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">
                  ส่งออเดอร์สำเร็จ!
                </h2>
                <p className="text-slate-500 mb-6">
                  กำลังเปิดแชท LINE เพื่อให้ทีมงานติดต่อกลับ...
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 gradient-electric text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-sky-400/30 hover:-translate-y-0.5 transition-transform"
                >
                  ช้อปปิ้งต่อ <IconArrowRight size={18} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── EMPTY STATE ─── */}
          {!done && items.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200"
            >
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-xl font-bold text-slate-700 mb-2">
                ตะกร้าว่างเปล่า
              </h2>
              <p className="text-slate-400 mb-6">
                เลือกสินค้าที่คุณสนใจแล้วเพิ่มลงตะกร้าได้เลย
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 gradient-electric text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-sky-400/30 hover:-translate-y-0.5 transition-transform"
              >
                เลือกสินค้า <IconArrowRight size={18} />
              </Link>
            </motion.div>
          )}

          {/* ─── CART ITEMS + SUMMARY ─── */}
          {!done && items.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Items list */}
              <div className="lg:col-span-2 space-y-3">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Product image */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                        <Image
                          src={item.image || "/product-led.png"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-sky-600 font-semibold uppercase tracking-wide">
                          {item.brand}
                        </p>
                        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mt-0.5">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-base font-black text-sky-700">
                            ฿{item.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            ฿{item.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Qty + Remove */}
                      <div className="flex flex-col items-end justify-between shrink-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 flex items-center justify-center transition-colors"
                          aria-label="ลบสินค้า"
                        >
                          <IconTrash size={14} />
                        </button>

                        {/* Qty stepper */}
                        <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-sky-50 hover:text-sky-600 transition-colors"
                          >
                            <IconMinus size={13} />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-sky-50 hover:text-sky-600 transition-colors"
                          >
                            <IconPlus size={13} />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <p className="text-sm font-bold text-slate-800">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Clear cart */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={clearCart}
                    className="text-sm text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
                  >
                    <IconTrash size={14} />
                    ล้างตะกร้า
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm sticky top-28">
                  <h2 className="text-lg font-black text-slate-800 mb-4">
                    สรุปออเดอร์
                  </h2>

                  {/* Price breakdown */}
                  <div className="space-y-2 mb-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm text-slate-600"
                      >
                        <span className="line-clamp-1 flex-1 mr-2">
                          {item.name} ×{item.quantity}
                        </span>
                        <span className="font-semibold shrink-0">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-3 mb-4">
                    <div className="flex justify-between text-lg font-black text-slate-800">
                      <span>ยอดรวม</span>
                      <span className="text-sky-700">
                        ฿{totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      * ราคายังไม่รวมค่าจัดส่ง
                    </p>
                  </div>

                  {/* Note */}
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="หมายเหตุ/ข้อความถึงร้านค้า (ไม่บังคับ)"
                    rows={3}
                    className="w-full text-sm border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent mb-4 bg-slate-50"
                  />

                  {/* Checkout button */}
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white font-bold text-base transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-400/40 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {loading ? (
                      <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <IconBrandLine size={20} />
                        ยืนยันสั่งซื้อผ่าน LINE
                        <IconArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center mt-3">
                    กดปุ่มเพื่อเปิดแชท LINE พร้อมรายการสินค้า
                  </p>

                  {/* Continue shopping */}
                  <Link
                    href="/products"
                    className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
                  >
                    ช้อปปิ้งต่อ
                    <IconArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
