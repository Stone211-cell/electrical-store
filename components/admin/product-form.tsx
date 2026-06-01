"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconCheck, IconX, IconPlus, IconTrash, IconGripVertical } from "@tabler/icons-react";
import type { Product, Category } from "@prisma/client";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ── Sortable Image Item ──
function SortableImageItem({ id, url, onRemove, onChange }: { id: string; url: string; onRemove: () => void; onChange: (v: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
      <button type="button" className="cursor-grab text-slate-400 hover:text-slate-600" {...attributes} {...listeners}>
        <IconGripVertical size={20} />
      </button>
      <input
        type="text"
        value={url}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 text-sm"
        required
      />
      {url && (
        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="preview" className="w-full h-full object-cover" />
        </div>
      )}
      <button type="button" onClick={onRemove} className="text-rose-400 hover:text-rose-600 p-2">
        <IconTrash size={18} />
      </button>
    </div>
  );
}

// ── Main Form ──
export function ProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: Category[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState(product?.name || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice?.toString() || "");
  const [description, setDescription] = useState(product?.description || "");
  const [inStock, setInStock] = useState(product ? product.inStock : true);
  
  // Array states
  const [badges, setBadges] = useState<string[]>(product?.badges || []);
  const [images, setImages] = useState<{ id: string; url: string }[]>(
    product?.images.map((url, i) => ({ id: `img-${i}`, url })) || []
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return alert("กรุณาเลือกหมวดหมู่ (หรือชนิดสินค้า)");
    if (images.length === 0) return alert("กรุณาใส่รูปภาพอย่างน้อย 1 รูป");

    setLoading(true);
    const data = {
      name,
      brand,
      categoryId,
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price),
      inStock,
      badges,
      images: images.map((img) => img.url).filter((url) => url.trim() !== ""),
      // mock rating/reviews if new
      rating: product?.rating || 5,
      reviews: product?.reviews || 0,
    };

    try {
      if (product) {
        await axios.put(`/api/products/${product.id}`, data);
      } else {
        await axios.post("/api/products", data);
      }
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setLoading(false);
    }
  };

  const toggleBadge = (badge: string) => {
    setBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">ชื่อสินค้า *</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">ชนิดสินค้า / แบรนด์ (ระบุแผ่นวงจร หรืออื่นๆ) *</label>
          <input type="text" required value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">หมวดหมู่หลัก *</label>
          <select required value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500">
            <option value="">-- เลือกหมวดหมู่ --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">ราคาขาย (บาท) *</label>
          <input type="number" required min="0" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">ราคาเต็ม (ก่อนลด)</label>
          <input type="number" min="0" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">รายละเอียดสินค้า</label>
        <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 resize-none"></textarea>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-slate-700">รูปภาพสินค้า (URL) *</label>
          <button type="button" onClick={() => setImages([...images, { id: `img-${Date.now()}`, url: "" }])} className="text-sky-600 text-sm font-bold flex items-center gap-1 hover:text-sky-700">
            <IconPlus size={16} /> เพิ่มรูปภาพ
          </button>
        </div>
        <div className="space-y-2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={images} strategy={verticalListSortingStrategy}>
              {images.map((img) => (
                <SortableImageItem
                  key={img.id}
                  id={img.id}
                  url={img.url}
                  onChange={(v) => setImages(images.map((i) => (i.id === img.id ? { ...i, url: v } : i)))}
                  onRemove={() => setImages(images.filter((i) => i.id !== img.id))}
                />
              ))}
            </SortableContext>
          </DndContext>
          {images.length === 0 && (
            <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm border border-rose-100">ต้องมีรูปภาพอย่างน้อย 1 รูป</div>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-2">* ลากและวาง (Drag & Drop) ที่ไอคอน 6 จุดเพื่อเรียงลำดับรูปภาพ</p>
      </div>

      <div className="flex items-center gap-8 border-t border-slate-100 pt-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">สถานะสินค้า</label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="w-5 h-5 rounded text-sky-500" />
            <span className="text-sm font-medium text-slate-700">มีสินค้าพร้อมส่ง (In Stock)</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">ป้ายกำกับ (Badges)</label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={badges.includes("new")} onChange={() => toggleBadge("new")} className="w-5 h-5 rounded text-sky-500" />
              <span className="text-sm font-medium text-slate-700">✨ ใหม่</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={badges.includes("hot")} onChange={() => toggleBadge("hot")} className="w-5 h-5 rounded text-sky-500" />
              <span className="text-sm font-medium text-slate-700">🔥 ขายดี</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={badges.includes("sale")} onChange={() => toggleBadge("sale")} className="w-5 h-5 rounded text-sky-500" />
              <span className="text-sm font-medium text-slate-700">🏷️ ลดราคา</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
        <button type="button" onClick={() => router.push("/admin/products")} className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">
          ยกเลิก
        </button>
        <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50">
          {loading ? <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : <IconCheck size={18} />}
          บันทึกสินค้า
        </button>
      </div>

    </form>
  );
}
