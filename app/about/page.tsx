"use client";

import Link from "next/link";
import { IconChevronRight, IconBolt } from "@/components/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">หน้าหลัก</Link>
          <IconChevronRight size={14} />
          <span className="font-semibold text-blue-700">เกี่ยวกับเรา</span>
        </div>

        {/* ส่วนประวัติบริษัท (Timeline ง่ายๆ) */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-bold px-4 py-1.5 rounded-full mb-6">
            <IconBolt size={16} />
            Our Story
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
            รู้จักกับ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">ElectroMax</span>
          </h1>
          
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              ElectroMax ก่อตั้งขึ้นในปี 2015 ด้วยความมุ่งมั่นที่จะเป็นศูนย์รวมอุปกรณ์ไฟฟ้าครบวงจรที่ตอบโจทย์ทั้งช่างภาพมืออาชีพ ผู้รับเหมา และเจ้าของบ้านทั่วไป เราเริ่มต้นจากร้านขายส่งเล็กๆ ในตัวเมือง ก่อนจะขยายตัวสู่การเป็นตัวแทนจำหน่ายแบรนด์ชั้นนำระดับโลก
            </p>
            <p>
              ปัจจุบันเรามีคลังสินค้าขนาดใหญ่ที่พร้อมจัดส่งสินค้ามากกว่า 10,000 รายการ ไม่ว่าจะเป็นสายไฟ สวิตช์ เบรกเกอร์ ไปจนถึงระบบโซล่าเซลล์รุ่นใหม่ล่าสุด
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8">
              <h3 className="font-bold text-slate-800 text-lg mb-2">💡 วิสัยทัศน์ของเรา (Vision)</h3>
              <p className="text-sm">
                "ส่งมอบพลังงานที่ปลอดภัยและคุ้มค่า ให้ทุกบ้านและทุกธุรกิจในประเทศไทยด้วยเทคโนโลยีไฟฟ้าที่ทันสมัยที่สุด"
              </p>
            </div>
          </div>
        </div>

        {/* ส่วนคำถามที่พบบ่อย (FAQ) ใช้ Shadcn Accordion */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-slate-800 mb-6 text-center">คำถามที่พบบ่อย (FAQ)</h2>
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-bold text-slate-700 hover:text-blue-600">
                  มีบริการจัดส่งสินค้าอย่างไรบ้าง?
                </AccordionTrigger>
                <AccordionContent className="text-slate-500">
                  เราจัดส่งสินค้าทั่วประเทศผ่านบริการขนส่งเอกชนชั้นนำ (Kerry, Flash, J&T) โดยปกติจะใช้เวลาจัดส่ง 1-3 วันทำการ และมีบริการจัดส่งด่วนภายในวันเดียวกันสำหรับพื้นที่กรุงเทพฯ และปริมณฑล
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-bold text-slate-700 hover:text-blue-600">
                  สินค้ามีรับประกันหรือไม่?
                </AccordionTrigger>
                <AccordionContent className="text-slate-500">
                  สินค้าทุกชิ้นในร้านเรารับประกันศูนย์แท้ 100% โดยระยะเวลาการรับประกันจะขึ้นอยู่กับแต่ละแบรนด์ เช่น หลอดไฟ LED รับประกัน 1 ปี, แผงโซล่าเซลล์รับประกันประสิทธิภาพ 25 ปี
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-bold text-slate-700 hover:text-blue-600">
                  รับติดตั้งอุปกรณ์ไฟฟ้าหรือโซล่าเซลล์ด้วยไหม?
                </AccordionTrigger>
                <AccordionContent className="text-slate-500">
                  ปัจจุบันเราเน้นจัดจำหน่ายสินค้าเป็นหลัก แต่เรามีเครือข่ายช่างไฟฟ้าและผู้รับเหมาที่ได้มาตรฐานพร้อมแนะนำให้ลูกค้าที่ต้องการบริการติดตั้งครับ
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

      </div>
    </div>
  );
}