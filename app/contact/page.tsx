"use client";

import { useState } from "react";
import Link from "next/link";
import { IconChevronRight, IconPhone, IconMail, IconMapPin } from "@/components/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendLineNotify } from "@/app/actions/contact";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  // ฟังก์ชันจัดการฟอร์มเมื่อถูก Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    
    // เรียกใช้ Server Action เพื่อส่งข้อความเข้า LINE
    const result = await sendLineNotify(formData);
    
    setStatus(result);
    setLoading(false);

    if (result.success) {
      (e.target as HTMLFormElement).reset(); // ล้างข้อมูลในฟอร์มเมื่อส่งสำเร็จ
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">หน้าหลัก</Link>
          <IconChevronRight size={14} />
          <span className="font-semibold text-blue-700">ติดต่อเรา</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* ส่วนข้อมูลการติดต่อ */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
              ส่งข้อความ<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">หาเรา</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10">
              มีข้อสงสัยเกี่ยวกับสินค้า หรือต้องการใบเสนอราคา? ทีมงานของเราพร้อมให้บริการและให้คำปรึกษาตลอดเวลาทำการ
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <IconPhone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">เบอร์โทรศัพท์</p>
                  <p className="font-bold text-slate-800">02-123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <IconMail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">LINE Official</p>
                  <p className="font-bold text-slate-800">@electromax</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <IconMapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">ที่ตั้งสาขาใหญ่</p>
                  <p className="font-bold text-slate-800">123 ถ.สุขุมวิท กรุงเทพฯ 10110</p>
                </div>
              </div>
            </div>
          </div>

          {/* ส่วนฟอร์มติดต่อ (ใช้งานได้จริง ส่งเข้า LINE) */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">ฟอร์มติดต่อ</h2>
            
            {status && (
              <div className={`p-4 rounded-xl mb-6 font-medium ${status.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อ - นามสกุล <span className="text-red-500">*</span></Label>
                <Input id="name" name="name" required placeholder="นายตัวอย่าง สมมติ" className="bg-slate-50" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phone">เบอร์โทรศัพท์ <span className="text-red-500">*</span></Label>
                  <Input id="phone" name="phone" required placeholder="0812345678" className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">อีเมล</Label>
                  <Input id="email" name="email" type="email" placeholder="example@mail.com" className="bg-slate-50" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">ข้อความที่ต้องการติดต่อ <span className="text-red-500">*</span></Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  required 
                  placeholder="พิมพ์ข้อความของคุณที่นี่..." 
                  className="bg-slate-50 min-h-[120px]"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? "กำลังส่งข้อความ..." : "ส่งข้อความ"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}